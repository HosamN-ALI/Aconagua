import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create Math Subject
  const mathSubject = await prisma.subject.upsert({
    where: { name: 'Mathematics' },
    update: {},
    create: {
      name: 'Mathematics',
      nameAr: 'الرياضيات',
      description: 'Saudi National Math Curriculum',
    },
  });

  console.log('✅ Created subject: Mathematics');

  // Create Grade 1
  const grade1 = await prisma.grade.upsert({
    where: { level: 1 },
    update: {},
    create: {
      subjectId: mathSubject.id,
      level: 1,
      name: 'Grade 1',
      nameAr: 'الصف الأول',
    },
  });

  console.log('✅ Created Grade 1');

  // Create Chapter 1 for Grade 1
  const chapter1 = await prisma.chapter.upsert({
    where: { gradeId_orderIndex: { gradeId: grade1.id, orderIndex: 1 } },
    update: {},
    create: {
      gradeId: grade1.id,
      orderIndex: 1,
      title: 'Numbers and Counting',
      titleAr: 'الأعداد والعد',
      description: 'Introduction to numbers 1-10',
    },
  });

  console.log('✅ Created Chapter: Numbers and Counting');

  // Create Lesson 1
  const lesson1 = await prisma.lesson.upsert({
    where: { chapterId_orderIndex: { chapterId: chapter1.id, orderIndex: 1 } },
    update: {},
    create: {
      chapterId: chapter1.id,
      orderIndex: 1,
      title: 'Counting from 1 to 5',
      titleAr: 'العد من ١ إلى ٥',
      content: `# Counting from 1 to 5

In this lesson, we will learn to count from 1 to 5.

## Numbers:
- 1 (One)
- 2 (Two)
- 3 (Three)
- 4 (Four)
- 5 (Five)

Let's practice counting objects!`,
      contentAr: `# العد من ١ إلى ٥

في هذا الدرس، سنتعلم العد من ١ إلى ٥.

## الأعداد:
- ١ (واحد)
- ٢ (اثنان)
- ٣ (ثلاثة)
- ٤ (أربعة)
- ٥ (خمسة)

لنتدرب على عد الأشياء!`,
      objectives: [
        'Recognize numbers 1-5',
        'Count objects up to 5',
        'Write numbers 1-5',
      ],
    },
  });

  console.log('✅ Created Lesson: Counting from 1 to 5');

  // Create Problem 1
  const problem1 = await prisma.problem.create({
    data: {
      lessonId: lesson1.id,
      orderIndex: 1,
      question: 'How many apples are there? 🍎🍎🍎',
      questionAr: 'كم عدد التفاحات؟ 🍎🍎🍎',
      difficulty: 1,
      problemType: 'open_ended',
    },
  });

  await prisma.solution.create({
    data: {
      problemId: problem1.id,
      content: 'There are 3 apples.',
      contentAr: 'هناك ٣ تفاحات.',
      steps: ['Count each apple', 'The answer is 3'],
      isCorrect: true,
      explanation: 'We count each apple one by one: 1, 2, 3',
    },
  });

  console.log('✅ Created Problem 1 with solution');

  // Create Problem 2
  const problem2 = await prisma.problem.create({
    data: {
      lessonId: lesson1.id,
      orderIndex: 2,
      question: 'What comes after 3?',
      questionAr: 'ما العدد الذي يأتي بعد ٣؟',
      difficulty: 1,
      problemType: 'multiple_choice',
    },
  });

  await prisma.solution.createMany({
    data: [
      {
        problemId: problem2.id,
        content: '2',
        contentAr: '٢',
        steps: [],
        isCorrect: false,
      },
      {
        problemId: problem2.id,
        content: '4',
        contentAr: '٤',
        steps: [],
        isCorrect: true,
        explanation: 'The number sequence is 1, 2, 3, 4, 5',
      },
      {
        problemId: problem2.id,
        content: '5',
        contentAr: '٥',
        steps: [],
        isCorrect: false,
      },
    ],
  });

  console.log('✅ Created Problem 2 with multiple choice solutions');

  // Create Grade 2
  const grade2 = await prisma.grade.upsert({
    where: { level: 2 },
    update: {},
    create: {
      subjectId: mathSubject.id,
      level: 2,
      name: 'Grade 2',
      nameAr: 'الصف الثاني',
    },
  });

  console.log('✅ Created Grade 2');

  // Create Chapter for Grade 2
  const chapter2 = await prisma.chapter.upsert({
    where: { gradeId_orderIndex: { gradeId: grade2.id, orderIndex: 1 } },
    update: {},
    create: {
      gradeId: grade2.id,
      orderIndex: 1,
      title: 'Addition and Subtraction',
      titleAr: 'الجمع والطرح',
      description: 'Basic addition and subtraction operations',
    },
  });

  console.log('✅ Created Chapter: Addition and Subtraction');

  // Create Lesson for Grade 2
  const lesson2 = await prisma.lesson.upsert({
    where: { chapterId_orderIndex: { chapterId: chapter2.id, orderIndex: 1 } },
    update: {},
    create: {
      chapterId: chapter2.id,
      orderIndex: 1,
      title: 'Simple Addition',
      titleAr: 'الجمع البسيط',
      content: `# Simple Addition

Addition means putting things together.

## Example:
2 + 3 = 5

This means: 2 apples plus 3 apples equals 5 apples total.`,
      contentAr: `# الجمع البسيط

الجمع يعني وضع الأشياء معاً.

## مثال:
٢ + ٣ = ٥

هذا يعني: تفاحتان زائد ٣ تفاحات يساوي ٥ تفاحات في المجموع.`,
      objectives: [
        'Understand the concept of addition',
        'Solve simple addition problems',
        'Use the + symbol correctly',
      ],
    },
  });

  console.log('✅ Created Lesson: Simple Addition');

  // Create Achievements
  const achievements = [
    {
      name: 'First Steps',
      nameAr: 'الخطوات الأولى',
      description: 'Complete your first lesson',
      points: 10,
      criteria: { type: 'lessons_completed', count: 1 },
    },
    {
      name: 'Problem Solver',
      nameAr: 'حلال المسائل',
      description: 'Solve 10 problems correctly',
      points: 50,
      criteria: { type: 'problems_solved', count: 10 },
    },
    {
      name: 'Math Enthusiast',
      nameAr: 'محب الرياضيات',
      description: 'Complete 5 lessons',
      points: 100,
      criteria: { type: 'lessons_completed', count: 5 },
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { name: achievement.name },
      update: {},
      create: achievement,
    });
  }

  console.log('✅ Created achievements');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
