import { Injectable } from '@nestjs/common';
import { CurriculumService } from '../curriculum/curriculum.service';
import { Result } from '@shared/utils/result';
import { SOCRATIC_TEACHER_PROMPT, OCR_ANALYSIS_PROMPT } from './prompts/socratic-teacher.prompt';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable()
export class AiTutorService {
  constructor(private readonly curriculumService: CurriculumService) {}

  /**
   * Process student message using RAG and LLM
   */
  async chat(
    studentMessage: string,
    gradeLevel: number,
    chatHistory: ChatMessage[] = [],
  ): Promise<Result<string>> {
    try {
      // Step 1: Retrieve relevant curriculum content (RAG)
      const relevantContent = await this.retrieveRelevantContent(
        studentMessage,
        gradeLevel,
      );

      // Step 2: Construct the prompt with context
      const prompt = this.constructPrompt(
        studentMessage,
        chatHistory,
        relevantContent,
      );

      // Step 3: Call LLM (TODO: Integrate with OpenAI/Claude)
      const response = await this.callLLM(prompt);

      return Result.ok(response);
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  /**
   * Extract math problem from image using OCR and Vision LLM
   */
  async analyzeMathImage(imageData: string): Promise<Result<any>> {
    try {
      // TODO: Implement with GPT-4o Vision or Claude 3.5 Sonnet
      // 1. Send image to Vision LLM with OCR_ANALYSIS_PROMPT
      // 2. Parse the JSON response
      // 3. Return structured problem data

      return Result.ok({
        problem_text: 'Placeholder - OCR not yet implemented',
        equations: [],
        problem_type: 'unknown',
        given: [],
        required: '',
      });
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  /**
   * Retrieve relevant curriculum content using vector search
   */
  private async retrieveRelevantContent(
    query: string,
    gradeLevel: number,
  ): Promise<string> {
    const result = await this.curriculumService.searchContent(query, gradeLevel);

    if (result.isSuccess) {
      const content = result.getValue();
      // Format the retrieved content
      return content.length > 0
        ? content.map((item) => item.content).join('\n\n')
        : 'لا يوجد محتوى متاح في الوقت الحالي';
    }

    return 'لا يوجد محتوى متاح في الوقت الحالي';
  }

  /**
   * Construct the full prompt with context
   */
  private constructPrompt(
    studentMessage: string,
    chatHistory: ChatMessage[],
    curriculumContext: string,
  ): string {
    const historyText = chatHistory
      .map((msg) => `${msg.role === 'user' ? 'الطالب' : 'المعلم'}: ${msg.content}`)
      .join('\n');

    return SOCRATIC_TEACHER_PROMPT.replace('{curriculum_context}', curriculumContext)
      .replace('{chat_history}', historyText)
      .replace('{student_message}', studentMessage);
  }

  /**
   * Call LLM API (placeholder for actual implementation)
   */
  private async callLLM(prompt: string): Promise<string> {
    // TODO: Implement with LangChain + OpenAI/Claude
    // For now, return a placeholder response
    return 'هذه إجابة تجريبية. سيتم تفعيل الذكاء الاصطناعي قريبًا.';
  }
}
