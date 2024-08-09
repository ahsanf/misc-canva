import { logger } from "../../../../util/logger/logger";
import { IStabiltyAdapter } from "./base_adapter";
import { GenerationResponseData } from "../entity/stability";
import { config } from "../../../../../config/config";
import axios from "axios";
import { ApplicationError } from "../../../../util/error/application_error";
import { HTTPError } from "../../../../util/error/type/common_error";
import { RemoveBackgroundParams } from "../../../../domain/stability";

export class StabilityAdapter implements IStabiltyAdapter {

  async removeBackground(params: RemoveBackgroundParams, traceId?: string): Promise<ArrayBuffer> {
    logger.info(this.removeBackground.name, StabilityAdapter.name, traceId)
    const sasToken = config.azure.sasToken
    const stabilityApiKey = config.app.stabilityApiKey
    const removeBgUrl =  `${config.app.stabilityApiUrl}/v2beta/stable-image/edit/remove-background`
    const imageUrl = this.isFirebaseUrl(params.initImage) ? params.initImage : `${params.initImage}?${sasToken}`
    const imageFile = await this.imageUrlToFile(imageUrl)
    const formData= {
      image: imageFile,
      output_format: 'png',
    }
    const response = await axios.postForm(
      removeBgUrl,
      axios.toFormData(formData, new FormData()),
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: { 
          Authorization: `Bearer ${stabilityApiKey}`, 
          Accept: "image/*" 
        },
      }
    ).catch((error) => {
      logger.error(this.removeBackground.name, StabilityAdapter.name, traceId, error)
      throw new ApplicationError(HTTPError().INTERNAL_SERVER_ERROR)
    }).then((response) => {
      return response.data
    })

    return response
  }

  async imageUrlToFile(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    const newFileName = fileName.split('?')[0]
    const file = new File([blob], newFileName, { type: blob.type  });
    console.log(file)
    return file;
  }

  isFirebaseUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.toLowerCase();
  
      if (hostname === 'firebasestorage.googleapis.com') {
        const pathParts = parsedUrl.pathname.split('/');
  
        if (pathParts[1] === 'v0' && pathParts[2] === 'b') {
          return pathParts.length >= 5;
        }
      }
  
      return false;
    } catch (error) {
      return false;
    }
  }
}