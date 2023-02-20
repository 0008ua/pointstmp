// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appVersion: require('../../package.json').version + '-dev',
  host: '',
  // host: 'https://10.0.2.2:8084/',
  production: false,
  games: {
    rummy: {
      name: 'Rummy',
      showToolbarMenu: false,
      maxPlayersQty: 4,
      minPlayersQty: 2,
      playersColors: ['black'],
      namedScores: [
        { name: '1', value: -1, picture: './assets/games/uno/1.svg' },
        { name: '2', value: -2, picture: './assets/games/uno/2.svg' },
        { name: '3', value: -3, picture: './assets/games/uno/3.svg' },
        { name: '4', value: -4, picture: './assets/games/uno/4.svg' },
        { name: '5', value: -5, picture: './assets/games/uno/5.svg' },
        { name: '6', value: -6, picture: './assets/games/uno/6.svg' },
        { name: '7', value: -7, picture: './assets/games/uno/7.svg' },
        { name: '8', value: -8, picture: './assets/games/uno/8.svg' },
        { name: '9', value: -9, picture: './assets/games/uno/9.svg' },
        { name: '10', value: -10, picture: './assets/games/uno/9.svg' },
        { name: '11', value: -11, picture: './assets/games/uno/9.svg' },
        { name: '12', value: -12, picture: './assets/games/uno/9.svg' },
        { name: '13', value: -13, picture: './assets/games/uno/9.svg' },
        { name: 'Joker', value: -30, picture: './assets/games/uno/reverse.svg' },
      ],
      rounds: [
        {
          _id: 'start',
          icon: 'log-out-outline',
          namePostfix: '',
          initialScoresLine: [],
          initialNamedScoresLine: [],
        },
        {
          _id: 'round',
          icon: 'copy-outline',
          namePostfix: '',
          initialScoresLine: [],
          initialNamedScoresLine: [],
        },
      ],

      stats: [
        {
          _id: 'getRating',
          icon: 'trophy-outline',
          name: 'rating',
        },
      ],
    },
    uno: {
      name: 'Uno',
      showToolbarMenu: false,
      maxPlayersQty: 10,
      minPlayersQty: 2,
      playersColors: ['black'],
      namedScores: [
        { name: '0', value: 0, picture: './assets/games/uno/0.svg' },
        { name: '1', value: 1, picture: './assets/games/uno/1.svg' },
        { name: '2', value: 2, picture: './assets/games/uno/2.svg' },
        { name: '3', value: 3, picture: './assets/games/uno/3.svg' },
        { name: '4', value: 4, picture: './assets/games/uno/4.svg' },
        { name: '5', value: 5, picture: './assets/games/uno/5.svg' },
        { name: '6', value: 6, picture: './assets/games/uno/6.svg' },
        { name: '7', value: 7, picture: './assets/games/uno/7.svg' },
        { name: '8', value: 8, picture: './assets/games/uno/8.svg' },
        { name: '9', value: 9, picture: './assets/games/uno/9.svg' },
        { name: 'reverse', value: 20, picture: './assets/games/uno/reverse.svg' },
        { name: 'skip', value: 20, picture: './assets/games/uno/skip.svg' },
        { name: 'plus2', value: 20, picture: './assets/games/uno/plus2.svg' },
        { name: 'plus4', value: 50, picture: './assets/games/uno/plus4.svg' },
        { name: 'color', value: 50, picture: './assets/games/uno/color.svg' },
      ],
      rounds: [
        {
          _id: 'start',
          icon: 'log-out-outline',
          namePostfix: '',
          initialScoresLine: [],
          initialNamedScoresLine: [],
        },
        {
          _id: 'round',
          icon: 'copy-outline',
          namePostfix: '1',
          initialScoresLine: [],
          initialNamedScoresLine: [],
        },
      ],
      stats: [],
    },
    thousand: {
      name: 'Thousand - 1000',
      showToolbarMenu: false,
      maxPlayersQty: 4,
      minPlayersQty: 2,
      playersColors: ['black'],
      rounds: [
        {
          _id: 'start',
          namePostfix: '',
          icon: 'log-out-outline',
          initialScoresLine: [],
          initialNamedScoresLine: [],
        },
        {
          _id: 'round',
          namePostfix: '',
          icon: 'trail-sign-outline',
          initialScoresLine: [],
          initialNamedScoresLine: [],
        },
      ],
      stats: [
        {
          _id: 'getRatingByWins',
          icon: 'trophy-outline',
          name: 'byWins',
        },
        {
          _id: 'getRatingByWinsToGames',
          icon: 'podium-outline',
          name: 'byWinsToGames',
        },
      ],
    },
    train: {
      name: 'Ticket to ride',
      showToolbarMenu: true,
      maxPlayersQty: 5,
      minPlayersQty: 2,
      playersColors: ['red', 'green', 'blue', 'black', 'yellow'],
      routesScores: [
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: '10', value: 10 },
        { name: '11', value: 11 },
        { name: '12', value: 12 },
        { name: '13', value: 13 },
        { name: '20', value: 20 },
        { name: '21', value: 21 },
      ],
      longestRouteScore: 10,
      carsScores: [
        { name: 1, value: 1 },
        { name: 2, value: 2 },
        { name: 3, value: 4 },
        { name: 4, value: 7 },
        { name: 6, value: 15 },
        { name: 8, value: 21 },
      ],
      stats: [
        {
          _id: 'getRatingByWins',
          icon: 'trophy-outline',
          name: 'byWins',
        },
        {
          _id: 'getRatingByWinsToGames',
          icon: 'podium-outline',
          name: 'byWinsToGames',
        },
      ],
      rounds: [
        {
          _id: 'start',
          icon: 'log-out-outline',
          namePostfix: '',
          initialScoresLine: [],
          initialNamedScoresLine: [],
        },
        {
          _id: 'routes',
          icon: 'trail-sign-outline',
          namePostfix: '',
          initialScoresLine: [],
          initialNamedScoresLine: [],
        },
        {
          _id: 'length',
          icon: 'code-working-outline',
          namePostfix: '',
          initialScoresLine: [],
          initialNamedScoresLine: [],
        },
        {
          _id: 'stations',
          namePostfix: '',
          icon: 'prism-outline',
          initialScoresLine: [4, 4, 4],
          initialNamedScoresLine: [],
        },
        {
          _id: 'cars',
          namePostfix: '',
          icon: 'train-outline',
          initialScoresLine: [],
          initialNamedScoresLine: [],
        },
      ],
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
