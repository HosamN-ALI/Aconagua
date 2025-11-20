import { Module } from '@nestjs/common';
import { AiTutorController } from './ai-tutor.controller';
import { AiTutorService } from './ai-tutor.service';
import { CurriculumModule } from '../curriculum/curriculum.module';

@Module({
  imports: [CurriculumModule],
  controllers: [AiTutorController],
  providers: [AiTutorService],
  exports: [AiTutorService],
})
export class AiTutorModule {}
