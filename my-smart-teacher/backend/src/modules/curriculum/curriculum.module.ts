import { Module } from '@nestjs/common';
import { CurriculumController } from './controllers/curriculum.controller';
import { CurriculumService } from './services/curriculum.service';

@Module({
  controllers: [CurriculumController],
  providers: [CurriculumService],
  exports: [CurriculumService],
})
export class CurriculumModule {}
