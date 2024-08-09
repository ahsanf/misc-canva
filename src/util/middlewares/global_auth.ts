import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../error/application_error';
import { HTTPError } from '../error/type/common_error';
import { formatError } from '../error/format_error';
import { config } from '../../../config/config';
import { logger } from '../logger/logger';

export const secretKey: Secret = config.app.appSalt;
const configStaticToken: string | undefined = config.app.staticToken;
let applicationError: ApplicationError

export const globalAuthMiddleware =  (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      logger.info(`globalAuthMiddleware`, `globalAuthMiddleware`)
      const authType: string | string[] | undefined = req.headers['x-auth-type'] !== undefined ? req.headers['x-auth-type'] : undefined;
      if(authType !== undefined && authType === 'static'){
        const headerAuth: string | undefined = req.headers.authorization !== undefined ? req.headers.authorization.toString() : undefined;
        const staticToken: string | undefined = headerAuth !== undefined ? headerAuth.split(' ')[1] : undefined;
        if(staticToken !== undefined && configStaticToken !== undefined && staticToken === configStaticToken){
          res.locals.skipPermission = true
          next(); 
          return;
        }
      }

    } catch (err: any) {
      applicationError = new ApplicationError(HTTPError().UNAUTHORIZED);
      applicationError.message = err.message;
      res.status(401).json(formatError(applicationError));
    }
  })()
};

