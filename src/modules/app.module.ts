import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from '../controllers/app.controller'
import { AppService } from '../services/app.service'
import { HistoryModule } from './history.module'
import { MaterialModule } from './material.module'
import { UserModule } from './user.module'

@Module({
  imports: [ConfigModule.forRoot(), UserModule, MaterialModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
