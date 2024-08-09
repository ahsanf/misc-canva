export type AiRestRequest = {
  engineId: string
  prompts: AiTextPrompt[]
  steps?: number
  samples?:  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 
  clipGuidancePreset?:  0 | 1 | 2 | 3 | 4 | 5 | 6
  seed?: number,
  type: "text-to-image" | "image-to-image" | "image-to-image-masking" | "upscaling"
  initImage?: Buffer
  maskImage?: Buffer
  stepScheduleStart?: number
  stepScheduleEnd?: number
  upscaler?: 0 | 1 | 2
}

export type AiTextPrompt = {
  text: string
  weight?: number
}

export type EncryptedRequest = {
  data: string
}

export type ProjectParams = {
  userId: string
  projectId: string
  serviceId: string
  isSaveToHistory?: boolean
}