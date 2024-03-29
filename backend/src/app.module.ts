import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationModule } from './station/station.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://busdy:busdy123@busdy.kchewci.mongodb.net/?retryWrites=true&w=majority'), StationModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
