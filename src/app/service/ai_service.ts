import { randomUUID } from "crypto";
import { AzureStorageAdapter } from "../../adapter/out/azure/adapter/adapter";
import { IAzureStorageAdapter } from "../../adapter/out/azure/adapter/base_adapter";
import { StabilityAdapter } from "../../adapter/out/stability/adapter/adapter";
import { IStabiltyAdapter } from "../../adapter/out/stability/adapter/base_adapter";
import { logger } from "../../util/logger/logger";
import { IAiUseCase } from "../port/out/ai_use_case";
import { v4 as uuidv4 } from 'uuid'

export class AiService implements IAiUseCase {

  private stabilityAdapter: IStabiltyAdapter;
  private azureAdapter: IAzureStorageAdapter;

  constructor() {
    this.stabilityAdapter = new StabilityAdapter();
    this.azureAdapter = new AzureStorageAdapter();
  }
  
  async removeBackground(imageUrl: string, traceId?: string): Promise<{ artifacts: { imageUrl: string; imageFileName: string; }[]; }> {
    logger.info(this.removeBackground.name, AiService.name, traceId)
    return await this.stabilityAdapter.removeBackground({ type:'remove-background', initImage: imageUrl }, traceId)
    .catch((error) => {
      logger.error(this.removeBackground.name, AiService.name, traceId, error)
      throw error
    })
    .then(async (response) => {
        let artifacts = []
        const upload = await this.azureAdapter.uploadToAzureFunction(`${uuidv4()}.png`, response)
        artifacts.push({ imageUrl: upload.url, imageFileName: upload.filename })

        return { artifacts: artifacts }
      
    })
  }
}