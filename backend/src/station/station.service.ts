import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Station, StationDocument } from './schemas/station.schema';

@Injectable()
export class StationService {
    constructor(@InjectModel(Station.name) private readonly model: Model<StationDocument>) {}
}
