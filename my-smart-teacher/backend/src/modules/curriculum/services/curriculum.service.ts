import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../../shared/services/prisma.service';

@Injectable()
export class CurriculumService {
  private readonly logger = new Logger(CurriculumService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get full curriculum tree structure
   */
  async getCurriculumTree() {
    const subjects = await this.prisma.subject.findMany({
      include: {
        grades: {
          orderBy: { level: 'asc' },
          include: {
            chapters: {
              orderBy: { orderIndex: 'asc' },
              include: {
                lessons: {
                  orderBy: { orderIndex: 'asc' },
                  select: {
                    id: true,
                    title: true,
                    titleAr: true,
                    orderIndex: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return subjects;
  }

  /**
   * Get all grades for a subject
   */
  async getGrades(subjectId: string) {
    const grades = await this.prisma.grade.findMany({
      where: { subjectId },
      orderBy: { level: 'asc' },
      include: {
        _count: {
          select: { chapters: true },
        },
      },
    });

    return grades;
  }

  /**
   * Get chapters for a specific grade
   */
  async getChaptersByGrade(gradeId: string) {
    const chapters = await this.prisma.chapter.findMany({
      where: { gradeId },
      orderBy: { orderIndex: 'asc' },
      include: {
        _count: {
          select: { lessons: true },
        },
      },
    });

    return chapters;
  }

  /**
   * Get lesson details with problems
   */
  async getLessonById(lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        chapter: {
          include: {
            grade: {
              include: {
                subject: true,
              },
            },
          },
        },
        problems: {
          orderBy: { orderIndex: 'asc' },
          include: {
            solutions: true,
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    return lesson;
  }

  /**
   * Get problems for a lesson
   */
  async getProblemsByLesson(lessonId: string) {
    const problems = await this.prisma.problem.findMany({
      where: { lessonId },
      orderBy: { orderIndex: 'asc' },
      include: {
        solutions: true,
      },
    });

    return problems;
  }

  /**
   * Get a specific problem with solutions
   */
  async getProblemById(problemId: string) {
    const problem = await this.prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        lesson: {
          include: {
            chapter: {
              include: {
                grade: true,
              },
            },
          },
        },
        solutions: true,
      },
    });

    if (!problem) {
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    }

    return problem;
  }

  /**
   * Search lessons by keyword
   */
  async searchLessons(keyword: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { titleAr: { contains: keyword } },
          { content: { contains: keyword, mode: 'insensitive' } },
        ],
      },
      include: {
        chapter: {
          include: {
            grade: true,
          },
        },
      },
      take: 20,
    });

    return lessons;
  }
}
