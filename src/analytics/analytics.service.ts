import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GameType, UID } from '../app.interfaces';
import { Game, GameModel } from '../game/entities/game.entity';

import { RatingRequest } from './dto/raitingRequest.dto';

@Injectable()
export class AnalyticsService {
  constructor(@InjectModel(Game.name) readonly gameModel: GameModel) {}
  async getWins({ userId, gameType }) {
    return this.gameModel
      .aggregate([
        {
          $match: {
            owner: userId,
            type: gameType,
          },
        },
        {
          $unwind: {
            path: '$rounds',
          },
        },
        {
          $match: {
            'rounds._id': 'result',
          },
        },
        {
          $project: {
            players: '$rounds.players',
            _id: 0,
          },
        },
        {
          $project: {
            max: {
              $filter: {
                input: '$players',
                as: 'm',
                cond: {
                  $eq: [
                    '$$m.score',
                    {
                      $max: '$players.score',
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $unwind: {
            path: '$max',
          },
        },
        {
          $group: {
            _id: {
              $toObjectId: '$max._id',
            },
            count: {
              $count: {},
            },
          },
        },
        {
          $lookup: {
            from: 'gamers',
            localField: '_id',
            foreignField: '_id',
            as: 'gamer',
          },
        },
        {
          $unwind: {
            path: '$gamer',
          },
        },
        {
          $project: {
            'rating.wins': '$count',
            name: '$gamer.name',
            color: '$gamer.color',
          },
        },
        {
          $sort: {
            'rating.wins': -1,
          },
        },
      ])
      .then((game: any) => game)
      .catch((error: any) => new HttpException(error.message, HttpStatus.BAD_REQUEST));
  }

  async getWinsToGames({ userId, gameType }) {
    return this.gameModel
      .aggregate([
        {
          $match: {
            owner: userId,
            type: gameType,
          },
        },
        {
          $unwind: {
            path: '$rounds',
          },
        },
        {
          $match: {
            'rounds._id': 'result',
          },
        },
        {
          $project: {
            players: '$rounds.players',
            _id: 0,
          },
        },
        {
          $facet: {
            gamesCount: [
              {
                $unwind: {
                  path: '$players',
                },
              },
              {
                $group: {
                  _id: {
                    $toObjectId: '$players._id',
                  },
                  count: {
                    $sum: 1,
                  },
                },
              },
              {
                $lookup: {
                  from: 'gamers',
                  localField: '_id',
                  foreignField: '_id',
                  as: 'gamer',
                },
              },
              {
                $unwind: {
                  path: '$gamer',
                },
              },
              {
                $project: {
                  count: 1,
                  name: '$gamer.name',
                  color: '$gamer.color',
                },
              },
            ],
            wins: [
              {
                $project: {
                  max: {
                    $filter: {
                      input: '$players',
                      as: 'm',
                      cond: {
                        $eq: [
                          '$$m.score',
                          {
                            $max: '$players.score',
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                $unwind: {
                  path: '$max',
                },
              },
              {
                $group: {
                  _id: {
                    $toObjectId: '$max._id',
                  },
                  count: {
                    $count: {},
                  },
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$gamesCount',
          },
        },
        {
          $project: {
            gamesCount: 1,
            wins: {
              $filter: {
                input: '$wins',
                as: 'm',
                cond: {
                  $eq: ['$$m._id', '$gamesCount._id'],
                },
              },
            },
          },
        },
        {
          $project: {
            wins: {
              $ifNull: [
                {
                  $arrayElemAt: ['$wins', 0],
                },
                {
                  count: 0,
                },
              ],
            },
            gamesCount: 1,
          },
        },
        {
          $project: {
            _id: '$gamesCount._id',
            name: '$gamesCount.name',
            color: '$gamesCount.color',
            'rating.wins': '$wins.count',
            'rating.gamesCount': '$gamesCount.count',
            'rating.winsToGames': {
              $round: [
                {
                  $divide: ['$wins.count', '$gamesCount.count'],
                },
                2,
              ],
            },
          },
        },
        {
          $sort: {
            'rating.winsToGames': -1,
          },
        },
      ])
      .then((game: any) => game)
      .catch((error: any) => new HttpException(error.message, HttpStatus.BAD_REQUEST));
  }

  async getRating({ userId, gameType }: RatingRequest) {
    return this.gameModel
      .aggregate([
        {
          $match: {
            owner: userId,
            type: gameType,
          },
        },
        {
          $unwind: {
            path: '$rounds',
          },
        },
        {
          $match: {
            'rounds._id': 'result',
          },
        },
        {
          $project: {
            players: '$rounds.players',
            _id: 0,
          },
        },
        {
          $unwind: {
            path: '$players',
          },
        },
        {
          $group: {
            _id: {
              $toObjectId: '$players._id',
            },
            totalGames: {
              $count: {},
            },
            wins: {
              $sum: {
                $cond: [
                  {
                    $gt: ['$players.score', 0],
                  },
                  1,
                  0,
                ],
              },
            },
            sum: {
              $sum: '$players.score',
            },
          },
        },
        {
          $lookup: {
            from: 'gamers',
            localField: '_id',
            foreignField: '_id',
            as: 'gamer',
          },
        },
        {
          $unwind: {
            path: '$gamer',
          },
        },
        {
          $project: {
            'rating.wins': '$wins',
            'rating.totalGames': '$totalGames',
            'rating.scores': '$sum',
            name: '$gamer.name',
            color: '$gamer.color',
          },
        },
        {
          $sort: {
            'rating.scores': -1,
          },
        },
      ])
      .then((game: any) => game)
      .catch((error: any) => new HttpException(error.message, HttpStatus.BAD_REQUEST));
  }
}
