import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { AiTutorModule } from './modules/ai-tutor/ai-tutor.module';
import { LearningModule } from './modules/learning/learning.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    CurriculumModule,
    AiTutorModule,
    LearningModule,
  ],
})
export class AppModule {}
