import { BaseStationDto } from './base-station.dto';

export class UpdateStationDto extends BaseStationDto {
  stationId: string;
  title: string;
  body: string;
  userId: string;
}