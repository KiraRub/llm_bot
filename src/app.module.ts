import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SentimentService } from './sentiment/sentiment.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AppService, SentimentService],
})
export class AppModule {}
