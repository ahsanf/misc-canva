import { RemoveBackgroundParams } from "../../../../domain/stability"
import { GenerationResponseData } from "../entity/stability"

export interface IStabiltyAdapter {
  removeBackground(params: RemoveBackgroundParams, traceId?: string): Promise<ArrayBuffer>
} 