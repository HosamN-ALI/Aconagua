import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiTutorService } from './ai-tutor.service';

@ApiTags('AI Tutor')
@Controller('ai-tutor')
export class AiTutorController {
  constructor(private readonly aiTutorService: AiTutorService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Chat with AI tutor' })
  @ApiResponse({ status: 200, description: 'AI response generated' })
  async chat(@Body() chatDto: any) {
    const { message, gradeLevel, chatHistory } = chatDto;
    const result = await this.aiTutorService.chat(message, gradeLevel, chatHistory);

    if (result.isSuccess) {
      return { response: result.getValue() };
    }

    return { error: result.getError() };
  }

  @Post('analyze-image')
  @ApiOperation({ summary: 'Analyze math problem from image using OCR' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Image analyzed successfully' })
  @UseInterceptors(FileInterceptor('image'))
  async analyzeImage(@UploadedFile() file: Express.Multer.File) {
    // TODO: Process the uploaded file
    // Convert to base64 or appropriate format for the AI service

    const result = await this.aiTutorService.analyzeMathImage('base64-placeholder');

    if (result.isSuccess) {
      return result.getValue();
    }

    return { error: result.getError() };
  }

  @Post('hint')
  @ApiOperation({ summary: 'Get a hint for a specific problem' })
  @ApiResponse({ status: 200, description: 'Hint generated' })
  async getHint(@Body() hintDto: any) {
    // TODO: Implement hint generation logic
    return { hint: 'تلميح: حاول تبسيط المعادلة أولاً' };
  }
}
