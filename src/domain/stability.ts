
export type StabilityFinalResponse = {
  artifacts: Array<{
    imageUrl: string
    imageFileName: string
  }>
}

export type ReplaceBackgroundRequest = {
  type: 'replace-background',
  imageUrl: string,
  prompt: string,
  sample?: number
}

export type RemoveBackgroundRequest = {
  type: 'remove-background',
  imageUrl: string
  sample?: number
}

export type CleanUpRequest = {
  type: 'clean-up',
  imageUrl: string
  maskImageUrl: string
  sample?: number
}

export type ScaleUpRequest = {
  type: 'scale-up'
  imageUrl: string
  prompt: string
  sample?: number
}

export type TextToImageCoreRequest = {
  type: 'text-to-image'
  prompt: string
  sample?: number
}

export type StabilityRequest = ReplaceBackgroundRequest | RemoveBackgroundRequest | CleanUpRequest | ScaleUpRequest | TextToImageCoreRequest

export type RemoveBackgroundParams = {
  type: "remove-background";
  initImage: string;
};
