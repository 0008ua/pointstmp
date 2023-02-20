import { GamerDocument } from '../entities/gamer.entity';

export type GamerDataType = Pick<
  GamerDocument,
  'name' | 'color' | 'owner' | 'telegramCheckCode' | 'telegramSubscriptionName'
> & {
  _id: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GamerDataDto extends GamerDataType {}
