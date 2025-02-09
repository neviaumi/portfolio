export function calculateIdFromQuestion(question: string) {
  return encodeURIComponent(question.replaceAll(' ', '-').toLowerCase());
}
