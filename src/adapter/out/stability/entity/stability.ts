export type GenerationResponseData = {
  artifacts: Array<{
    base64: string
    seed: number
    finishReason: string
  }>
}

export type GenerationFinalResponse = {
  artifacts: Array<{
    imageUrl: string
    imageFileName: string
    seed: number
    finishReason: string
  }>
}

export type AiCommonFinalResponse ={
  artifacts: Array<{
    imageUrl: string
    imageFileName: string
  }>
}