import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { LearningService } from './learning.service';

@ApiTags('Learning & Progress')
@Controller('learning')
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get('progress/:studentId/:gradeLevel')
  @ApiOperation({ summary: 'Get student progress' })
  @ApiParam({ name: 'studentId', type: 'string' })
  @ApiParam({ name: 'gradeLevel', type: 'number' })
  @ApiResponse({ status: 200, description: 'Progress data retrieved' })
  async getProgress(
    @Param('studentId') studentId: string,
    @Param('gradeLevel') gradeLevel: string,
  ) {
    const result = await this.learningService.getStudentProgress(
      studentId,
      parseInt(gradeLevel),
    );
    return result.getValue();
  }

  @Post('quiz/attempt')
  @ApiOperation({ summary: 'Record a quiz attempt' })
  @ApiResponse({ status: 201, description: 'Quiz attempt recorded' })
  async recordAttempt(@Body() attemptDto: any) {
    const { studentId, lessonId, score, totalQuestions } = attemptDto;
    const result = await this.learningService.recordQuizAttempt(
      studentId,
      lessonId,
      score,
      totalQuestions,
    );
    return result.getValue();
  }

  @Get('leaderboard/:gradeLevel')
  @ApiOperation({ summary: 'Get leaderboard for a grade' })
  @ApiParam({ name: 'gradeLevel', type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiResponse({ status: 200, description: 'Leaderboard retrieved' })
  async getLeaderboard(
    @Param('gradeLevel') gradeLevel: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.learningService.getLeaderboard(
      parseInt(gradeLevel),
      limit ? parseInt(limit) : 10,
    );
    return result.getValue();
  }

  @Get('stats/:studentId')
  @ApiOperation({ summary: 'Get student statistics' })
  @ApiParam({ name: 'studentId', type: 'string' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved' })
  async getStats(@Param('studentId') studentId: string) {
    const result = await this.learningService.getStudentStats(studentId);
    return result.getValue();
  }

  @Post('badge/award')
  @ApiOperation({ summary: 'Award badge to student' })
  @ApiResponse({ status: 201, description: 'Badge awarded' })
  async awardBadge(@Body() badgeDto: any) {
    const { studentId, badgeType } = badgeDto;
    const result = await this.learningService.awardBadge(studentId, badgeType);
    return result.getValue();
  }
}
