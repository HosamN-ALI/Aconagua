import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CurriculumService } from '../services/curriculum.service';

@ApiTags('Curriculum')
@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get('tree')
  @ApiOperation({ summary: 'Get full curriculum tree structure' })
  @ApiResponse({ status: 200, description: 'Curriculum tree retrieved successfully' })
  async getCurriculumTree() {
    return this.curriculumService.getCurriculumTree();
  }

  @Get('subjects/:subjectId/grades')
  @ApiOperation({ summary: 'Get all grades for a subject' })
  @ApiParam({ name: 'subjectId', description: 'Subject ID' })
  @ApiResponse({ status: 200, description: 'Grades retrieved successfully' })
  async getGrades(@Param('subjectId') subjectId: string) {
    return this.curriculumService.getGrades(subjectId);
  }

  @Get('grades/:gradeId/chapters')
  @ApiOperation({ summary: 'Get chapters for a specific grade' })
  @ApiParam({ name: 'gradeId', description: 'Grade ID' })
  @ApiResponse({ status: 200, description: 'Chapters retrieved successfully' })
  async getChaptersByGrade(@Param('gradeId') gradeId: string) {
    return this.curriculumService.getChaptersByGrade(gradeId);
  }

  @Get('lessons/:lessonId')
  @ApiOperation({ summary: 'Get lesson details with problems' })
  @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
  @ApiResponse({ status: 200, description: 'Lesson retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async getLessonById(@Param('lessonId') lessonId: string) {
    return this.curriculumService.getLessonById(lessonId);
  }

  @Get('lessons/:lessonId/problems')
  @ApiOperation({ summary: 'Get problems for a lesson' })
  @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
  @ApiResponse({ status: 200, description: 'Problems retrieved successfully' })
  async getProblemsByLesson(@Param('lessonId') lessonId: string) {
    return this.curriculumService.getProblemsByLesson(lessonId);
  }

  @Get('problems/:problemId')
  @ApiOperation({ summary: 'Get a specific problem with solutions' })
  @ApiParam({ name: 'problemId', description: 'Problem ID' })
  @ApiResponse({ status: 200, description: 'Problem retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Problem not found' })
  async getProblemById(@Param('problemId') problemId: string) {
    return this.curriculumService.getProblemById(problemId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search lessons by keyword' })
  @ApiQuery({ name: 'q', description: 'Search keyword' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  async searchLessons(@Query('q') keyword: string) {
    return this.curriculumService.searchLessons(keyword);
  }
}
