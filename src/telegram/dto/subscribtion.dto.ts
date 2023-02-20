import { GamerDocument } from 'src/gamer/entities/gamer.entity';

export type SubscribtionType = Pick<GamerDocument, 'name'> & {
  _id: string;
  ownerName: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubscribtionDto extends SubscribtionType {}
