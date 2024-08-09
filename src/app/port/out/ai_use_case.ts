

export interface IAiUseCase {
  removeBackground(imageUrl: string, traceId?: string): Promise<{
    artifacts: Array<{
      imageUrl: string
      imageFileName: string
    }>
  }>
}