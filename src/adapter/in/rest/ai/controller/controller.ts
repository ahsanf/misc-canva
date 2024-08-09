import { Express, Request, Response } from "express"
import { IAiUseCase } from "../../../../../app/port/out/ai_use_case";
import { AiService } from "../../../../../app/service/ai_service";
import { BaseController } from "../../../../../common/base_controller";
import { RestResponse } from "../entity/response";
import { dataToRestResponse, errorToRestResponse } from "../util/converter";
import { getLogTraceId } from "../../../../../util/logger/logger";
import { globalAuthMiddleware } from "../../../../../util/middlewares/global_auth";

export class AiRestController implements BaseController{
  private app: Express
  private aiService: IAiUseCase
  
  constructor(app: Express) {
    this.app = app
    this.aiService = new AiService()
  }
  init(): void {
    this.app.post(`/ai/remove-background`, globalAuthMiddleware, (req: Request, res: Response) => {
      (async () => {
        try {
          const data = await this.aiService.removeBackground(req.body.imageUrl, getLogTraceId())
          const response: RestResponse = dataToRestResponse(data)
          res.json(response)
        } catch (error) {
          res.status(500).json(errorToRestResponse(error))
        }
      })()
    })
  }
  
}