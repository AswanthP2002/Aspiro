export default interface IAiInterviewUsecase {
  execute(
    persona: { role: 'system' | 'user' | 'assistant'; content: string }[],
    isStoped: boolean
  ): Promise<string>;
}
