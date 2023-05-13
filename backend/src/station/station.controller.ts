import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateStationDto } from './dto/create-station.dto';
  import { UpdateStationDto } from './dto/update-station.dto';
  import { StationService } from './station.service';

@Controller('station')
export class StationController {
    constructor(private readonly service: StationService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createStationDto: CreateStationDto) {
    return await this.service.create(createStationDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
    return await this.service.update(id, updateStationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
