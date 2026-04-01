export default interface IAiInterviewUsecase {
  execute(persona: { role: 'system' | 'user' | 'assistant'; content: string }[]): Promise<string>;
}
