import { Module } from '@nestjs/common';
import { CloudsController } from './clouds.controller';
import { CloudsService } from './clouds.service';

@Module({
  controllers: [CloudsController],
  providers: [CloudsService]
})
export class CloudsModule {}
