import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station, StationDocument } from './schemas/station.schema';

@Injectable()
export class StationService {
    constructor(@InjectModel(Station.name) private readonly model: Model<StationDocument>) {}

    async findAll(): Promise<Station[]> {
        return await this.model.find().exec();
    }

    async findOne(id: string): Promise<Station> {
        return await this.model.findById(id).exec();
    }

    async create(createStationDto: CreateStationDto): Promise<Station> {
        return await new this.model({
         ...createStationDto
        }).save();
    }

    async update(id: string, updateStationDto: UpdateStationDto): Promise<Station> {
        return await this.model.findByIdAndUpdate(id, updateStationDto).exec();
    }

    async delete(id: string): Promise<Station> {
     return await this.model.findByIdAndDelete(id).exec();
    }
}
