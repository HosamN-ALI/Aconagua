import { BaseEntity } from '@shared/entities/base.entity';

/**
 * Exercise Entity
 * Represents a practice exercise within a lesson
 */
export class Exercise extends BaseEntity {
  question: string;
  questionAr: string;
  questionLatex?: string; // LaTeX representation of the question
  answer: string;
  answerLatex?: string;
  explanation?: string;
  explanationAr?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lessonId: string;

  constructor(
    id: string,
    question: string,
    questionAr: string,
    answer: string,
    difficulty: 'easy' | 'medium' | 'hard',
    lessonId: string,
  ) {
    super(id);
    this.question = question;
    this.questionAr = questionAr;
    this.answer = answer;
    this.difficulty = difficulty;
    this.lessonId = lessonId;
  }
}
