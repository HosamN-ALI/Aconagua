import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CurriculumService } from './curriculum.service';

@ApiTags('Curriculum')
@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get('grade/:level')
  @ApiOperation({ summary: 'Get curriculum structure for a specific grade' })
  @ApiParam({ name: 'level', type: 'number', description: 'Grade level (1-12)' })
  @ApiResponse({ status: 200, description: 'Curriculum structure retrieved' })
  async getCurriculumByGrade(@Param('level') level: string) {
    const result = await this.curriculumService.getCurriculumByGrade(parseInt(level));
    return result.getValue();
  }

  @Get('grade/:level/chapter/:chapterId')
  @ApiOperation({ summary: 'Get chapter with lessons' })
  @ApiParam({ name: 'level', type: 'number' })
  @ApiParam({ name: 'chapterId', type: 'string' })
  @ApiResponse({ status: 200, description: 'Chapter details retrieved' })
  async getChapter(
    @Param('level') level: string,
    @Param('chapterId') chapterId: string,
  ) {
    const result = await this.curriculumService.getChapterWithLessons(
      parseInt(level),
      chapterId,
    );
    return result.getValue();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search curriculum content' })
  @ApiQuery({ name: 'q', type: 'string', description: 'Search query' })
  @ApiQuery({ name: 'grade', type: 'number', required: false })
  @ApiResponse({ status: 200, description: 'Search results' })
  async searchContent(
    @Query('q') query: string,
    @Query('grade') grade?: string,
  ) {
    const gradeLevel = grade ? parseInt(grade) : undefined;
    const result = await this.curriculumService.searchContent(query, gradeLevel);
    return result.getValue();
  }
}
