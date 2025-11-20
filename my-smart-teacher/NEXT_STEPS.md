# 🚀 Next Steps - Phase 4: AI Tutor Module

## 📋 Overview

This document provides a detailed guide for implementing Phase 4 of the Saudi Smart Math Tutor project: the AI Tutor Module.

**Current Status**: Phase 1-3 Complete ✅
**Next Phase**: Phase 4 - AI Tutor Module 🚧
**Estimated Time**: 2-3 weeks
**Complexity**: High

---

## 🎯 Phase 4 Goals

Build an intelligent tutoring system that:
- Uses OpenAI GPT-4o for conversational AI
- Implements RAG (Retrieval-Augmented Generation) for context-aware responses
- Provides OCR for handwritten/printed math problems
- Uses Socratic teaching methods
- Supports real-time chat via WebSocket

---

## 📦 Step 1: Install Dependencies

### Required Packages

```bash
cd backend
npm install openai langchain @langchain/openai @nestjs/websockets @nestjs/platform-socket.io socket.io
```

### Package Purposes

| Package | Purpose |
|---------|---------|
| `openai` | Official OpenAI API client |
| `langchain` | LLM orchestration framework |
| `@langchain/openai` | LangChain OpenAI integration |
| `@nestjs/websockets` | WebSocket support for NestJS |
| `@nestjs/platform-socket.io` | Socket.io adapter for NestJS |
| `socket.io` | Real-time bidirectional communication |

---

## 🏗️ Step 2: Create Module Structure

### Create Directories

```bash
cd backend/src/modules/ai-tutor
mkdir -p prompts gateways
```

### Expected Structure

```
backend/src/modules/ai-tutor/
├── ai-tutor.module.ts
├── controllers/
│   └── ai-tutor.controller.ts
├── services/
│   ├── ai-tutor.service.ts
│   ├── openai.service.ts
│   ├── rag.service.ts
│   └── ocr.service.ts
├── dto/
│   ├── chat-message.dto.ts
│   └── ocr-upload.dto.ts
├── gateways/
│   └── chat.gateway.ts
└── prompts/
    ├── socratic-tutor.prompt.ts
    ├── problem-solver.prompt.ts
    └── hint-generator.prompt.ts
```

---

## 📝 Step 3: Implement Core Services

### 3.1 OpenAI Service

Create `services/openai.service.ts`:

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  private readonly openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async chat(messages: any[], stream: boolean = false) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        stream,
        temperature: 0.7,
      });

      return response;
    } catch (error) {
      this.logger.error('OpenAI chat error:', error);
      throw error;
    }
  }

  async createEmbedding(text: string) {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });

      return response.data[0].embedding;
    } catch (error) {
      this.logger.error('OpenAI embedding error:', error);
      throw error;
    }
  }

  async extractMathFromImage(imageUrl: string) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Extract all mathematical expressions from this image and convert them to LaTeX format. Return as JSON: { "expressions": ["latex1", "latex2"], "description": "text" }',
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl },
              },
            ],
          },
        ],
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      this.logger.error('OCR error:', error);
      throw error;
    }
  }
}
```

### 3.2 RAG Service

Create `services/rag.service.ts`:

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import { OpenAIService } from './openai.service';

@Injectable()
export class RAGService {
  private readonly logger = new Logger(RAGService.name);

  constructor(
    private prisma: PrismaService,
    private openaiService: OpenAIService,
  ) {}

  async embedLessonContent(lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    // Split content into chunks (simple implementation)
    const chunks = this.splitIntoChunks(lesson.content, 500);

    for (const chunk of chunks) {
      const embedding = await this.openaiService.createEmbedding(chunk);

      await this.prisma.lessonEmbedding.create({
        data: {
          lessonId,
          content: chunk,
          embedding: `[${embedding.join(',')}]`, // Store as string
          metadata: {
            title: lesson.title,
            chunkIndex: chunks.indexOf(chunk),
          },
        },
      });
    }

    this.logger.log(`Embedded ${chunks.length} chunks for lesson ${lessonId}`);
  }

  async searchSimilarContent(query: string, limit: number = 5) {
    const queryEmbedding = await this.openaiService.createEmbedding(query);

    // Use pgvector similarity search
    const results = await this.prisma.$queryRaw`
      SELECT 
        id, 
        lesson_id, 
        content, 
        metadata,
        1 - (embedding <=> ${`[${queryEmbedding.join(',')}]`}::vector) as similarity
      FROM lesson_embeddings
      ORDER BY embedding <=> ${`[${queryEmbedding.join(',')}]`}::vector
      LIMIT ${limit}
    `;

    return results;
  }

  private splitIntoChunks(text: string, chunkSize: number): string[] {
    const words = text.split(' ');
    const chunks: string[] = [];

    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(' '));
    }

    return chunks;
  }
}
```

### 3.3 AI Tutor Service

Create `services/ai-tutor.service.ts`:

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';
import { OpenAIService } from './openai.service';
import { RAGService } from './rag.service';
import { SOCRATIC_TUTOR_PROMPT } from '../prompts/socratic-tutor.prompt';

@Injectable()
export class AITutorService {
  private readonly logger = new Logger(AITutorService.name);

  constructor(
    private prisma: PrismaService,
    private openaiService: OpenAIService,
    private ragService: RAGService,
  ) {}

  async chat(userId: string, sessionId: string, message: string) {
    // 1. Save user message
    await this.prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'user',
        content: message,
      },
    });

    // 2. Get conversation history
    const history = await this.prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 10, // Last 10 messages
    });

    // 3. Search for relevant context using RAG
    const relevantContext = await this.ragService.searchSimilarContent(
      message,
      3,
    );

    // 4. Construct prompt with context
    const systemPrompt = SOCRATIC_TUTOR_PROMPT(
      relevantContext.map((r) => r.content).join('\n\n'),
    );

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map((h) => ({
        role: h.role,
        content: h.content,
      })),
    ];

    // 5. Get AI response
    const response = await this.openaiService.chat(messages);
    const aiMessage = response.choices[0].message.content;

    // 6. Save AI response
    await this.prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'assistant',
        content: aiMessage,
        metadata: {
          model: 'gpt-4o',
          contextUsed: relevantContext.length,
        },
      },
    });

    return {
      message: aiMessage,
      context: relevantContext,
    };
  }

  async createSession(userId: string, title?: string) {
    return this.prisma.chatSession.create({
      data: {
        userId,
        title: title || 'New Chat',
      },
    });
  }

  async getSessionHistory(sessionId: string) {
    return this.prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
```

---

## 📝 Step 4: Create Prompt Templates

### Socratic Tutor Prompt

Create `prompts/socratic-tutor.prompt.ts`:

```typescript
export const SOCRATIC_TUTOR_PROMPT = (context: string) => `
You are a Socratic math tutor for Saudi students. Your goal is to guide students to discover answers themselves through thoughtful questions.

## Teaching Principles:
1. Never give direct answers - ask guiding questions
2. Break complex problems into smaller steps
3. Encourage critical thinking
4. Be patient and supportive
5. Use examples from Saudi culture when relevant
6. Support both English and Arabic

## Relevant Curriculum Context:
${context}

## Your Approach:
- When a student asks a question, respond with a guiding question
- If they're stuck, provide a hint, not the answer
- Celebrate their progress and correct thinking
- If they make a mistake, ask them to reconsider specific parts

## Example Interaction:
Student: "What is 5 + 3?"
You: "Great question! Let's think about this together. If you have 5 apples and someone gives you 3 more apples, how many apples do you have in total? Can you count them?"

Remember: Your role is to guide, not to solve. Help them think!
`;
```

---

## 🌐 Step 5: Implement WebSocket Gateway

Create `gateways/chat.gateway.ts`:

```typescript
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { AITutorService } from '../services/ai-tutor.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(private aiTutorService: AITutorService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { sessionId: string; message: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`Message from ${data.userId}: ${data.message}`);

    try {
      const response = await this.aiTutorService.chat(
        data.userId,
        data.sessionId,
        data.message,
      );

      // Send response back to client
      client.emit('receiveMessage', {
        message: response.message,
        timestamp: new Date(),
      });
    } catch (error) {
      this.logger.error('Chat error:', error);
      client.emit('error', { message: 'Failed to process message' });
    }
  }

  @SubscribeMessage('createSession')
  async handleCreateSession(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const session = await this.aiTutorService.createSession(data.userId);
    client.emit('sessionCreated', session);
  }
}
```

---

## 🎛️ Step 6: Create Controllers and DTOs

### Chat Message DTO

Create `dto/chat-message.dto.ts`:

```typescript
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageDto {
  @ApiProperty({ example: 'uuid-session-id' })
  @IsUUID()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({ example: 'How do I solve 2 + 2?' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
```

### AI Tutor Controller

Create `controllers/ai-tutor.controller.ts`:

```typescript
import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AITutorService } from '../services/ai-tutor.service';
import { RAGService } from '../services/rag.service';
import { ChatMessageDto } from '../dto/chat-message.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@shared/decorators/current-user.decorator';

@ApiTags('AI Tutor')
@Controller('ai-tutor')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AITutorController {
  constructor(
    private aiTutorService: AITutorService,
    private ragService: RAGService,
  ) {}

  @Post('chat')
  @ApiOperation({ summary: 'Send message to AI tutor' })
  async chat(
    @CurrentUser() user: any,
    @Body() chatDto: ChatMessageDto,
  ) {
    return this.aiTutorService.chat(
      user.id,
      chatDto.sessionId,
      chatDto.message,
    );
  }

  @Post('session')
  @ApiOperation({ summary: 'Create new chat session' })
  async createSession(@CurrentUser() user: any) {
    return this.aiTutorService.createSession(user.id);
  }

  @Get('session/:id/history')
  @ApiOperation({ summary: 'Get chat session history' })
  async getHistory(@Param('id') sessionId: string) {
    return this.aiTutorService.getSessionHistory(sessionId);
  }

  @Post('embed-lesson/:id')
  @ApiOperation({ summary: 'Embed lesson content for RAG' })
  async embedLesson(@Param('id') lessonId: string) {
    await this.ragService.embedLessonContent(lessonId);
    return { message: 'Lesson embedded successfully' };
  }
}
```

---

## 📦 Step 7: Create Module File

Create `ai-tutor.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { AITutorController } from './controllers/ai-tutor.controller';
import { AITutorService } from './services/ai-tutor.service';
import { OpenAIService } from './services/openai.service';
import { RAGService } from './services/rag.service';
import { ChatGateway } from './gateways/chat.gateway';

@Module({
  controllers: [AITutorController],
  providers: [
    AITutorService,
    OpenAIService,
    RAGService,
    ChatGateway,
  ],
  exports: [AITutorService],
})
export class AITutorModule {}
```

---

## 🔧 Step 8: Update App Module

Edit `backend/src/app.module.ts`:

```typescript
import { AITutorModule } from './modules/ai-tutor/ai-tutor.module';

@Module({
  imports: [
    // ... existing imports
    AITutorModule,
  ],
  // ...
})
export class AppModule {}
```

---

## 🧪 Step 9: Testing

### Test Embedding

```bash
# Embed a lesson
curl -X POST http://localhost:3000/api/ai-tutor/embed-lesson/LESSON_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Chat (REST)

```bash
# Create session
curl -X POST http://localhost:3000/api/ai-tutor/session \
  -H "Authorization: Bearer YOUR_TOKEN"

# Send message
curl -X POST http://localhost:3000/api/ai-tutor/chat \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "SESSION_ID",
    "message": "How do I add 2 + 3?"
  }'
```

### Test Chat (WebSocket)

Use a WebSocket client or create a simple HTML page:

```html
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
<script>
  const socket = io('http://localhost:3000');
  
  socket.emit('createSession', { userId: 'USER_ID' });
  
  socket.on('sessionCreated', (session) => {
    console.log('Session created:', session);
    
    socket.emit('sendMessage', {
      sessionId: session.id,
      userId: 'USER_ID',
      message: 'How do I solve 2 + 2?'
    });
  });
  
  socket.on('receiveMessage', (data) => {
    console.log('AI Response:', data.message);
  });
</script>
```

---

## ✅ Verification Checklist

- [ ] Dependencies installed
- [ ] Module structure created
- [ ] OpenAI service implemented
- [ ] RAG service implemented
- [ ] AI Tutor service implemented
- [ ] Prompt templates created
- [ ] WebSocket gateway implemented
- [ ] Controllers and DTOs created
- [ ] Module registered in AppModule
- [ ] Lesson embedding works
- [ ] Chat via REST works
- [ ] Chat via WebSocket works
- [ ] Swagger documentation updated

---

## 📚 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [LangChain Documentation](https://js.langchain.com/docs)
- [NestJS WebSockets](https://docs.nestjs.com/websockets/gateways)
- [pgvector Documentation](https://github.com/pgvector/pgvector)

---

## 🎯 Success Criteria

Phase 4 is complete when:
- ✅ AI can respond to student questions
- ✅ RAG provides relevant context from curriculum
- ✅ Socratic teaching method is evident in responses
- ✅ WebSocket chat works in real-time
- ✅ OCR can extract math from images
- ✅ All endpoints documented in Swagger
- ✅ Tests pass

---

**Ready to start?** Follow the steps above and refer to existing modules for patterns!

**Need help?** Check [.blackbox/HOW_TO_USE_WITH_AI.md](./.blackbox/HOW_TO_USE_WITH_AI.md) for AI assistance.
