import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'quizResults';


function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('load error', e);
    return [];
  }
}


function save(quizzes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
}



export function getAllQuizzes() {
  return load();
}

export function createQuiz(questions) {
  const quizzes = load();
  quizzes.push(questions);
  save(quizzes);
  return questions;
}

// export function updateQuiz(id, patch) {
//   const quizzes = load();
//   const idx = quizzes.findIndex(q => q.id === id);
//   if (idx === -1) return null;
//   quizzes[idx] = { ...quizzes[idx], ...patch };
//   save(quizzes);
//   return quizzes[idx];
// }

// export function deleteQuiz(id) {
//   let quizzes = load();
//   quizzes = quizzes.filter(q => q.id !== id);
//   save(quizzes);
// }

// export function seedExample() {
//   const existing = load();
//   if (existing.length) return;
//   const sample = [
//     {
//       id: uuidv4(),
//       title: 'General Knowledge - Sample',
//       questions: [
//         {          
//           question: 'What is the capital of France?',
//           choices: ['Paris', 'Rome', 'Berlin', 'Madrid'],
//           answerIndex: 0,
//         },
//         {          
//           question: 'Which planet is known as the Red Planet?',
//           choices: ['Earth', 'Mars', 'Jupiter', 'Venus'],
//           answerIndex: 1,
//         },
//       ],
//     },
//   ];
//   save(sample);
// }
