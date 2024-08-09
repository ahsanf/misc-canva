import bodyparser from 'body-parser';
import express, { Express, Request, Response } from "express"
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import { loggingMiddleware } from './src/util/logger/logging';
import { config } from './config/config';
import { AiRestController } from './src/adapter/in/rest/ai/controller/controller';

const app: Express = express()
const port = config.app.appPort
const apiVersion = config.app.apiVersion
const appName = config.app.appName

dotenv.config()
app.use(bodyparser.json())
app.use(cors())
app.use(fileUpload())
app.use(cookieParser())

app.use(loggingMiddleware)

const aiRestController = new AiRestController(app)

aiRestController.init()

app.get('/', (_: Request, res: Response) => {
    res.send(`
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
        <pre>
    
        ██╗  ██╗███████╗██╗  ██╗ █████╗  ██████╗  ██████╗ ███╗   ██╗ █████╗ ██╗         ██████╗  ██████╗ ██╗██╗     ███████╗██████╗ ██████╗ ██╗      █████╗ ████████╗███████╗
        ██║  ██║██╔════╝╚██╗██╔╝██╔══██╗██╔════╝ ██╔═══██╗████╗  ██║██╔══██╗██║         ██╔══██╗██╔═══██╗██║██║     ██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝
        ███████║█████╗   ╚███╔╝ ███████║██║  ███╗██║   ██║██╔██╗ ██║███████║██║         ██████╔╝██║   ██║██║██║     █████╗  ██████╔╝██████╔╝██║     ███████║   ██║   █████╗  
        ██╔══██║██╔══╝   ██╔██╗ ██╔══██║██║   ██║██║   ██║██║╚██╗██║██╔══██║██║         ██╔══██╗██║   ██║██║██║     ██╔══╝  ██╔══██╗██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  
        ██║  ██║███████╗██╔╝ ██╗██║  ██║╚██████╔╝╚██████╔╝██║ ╚████║██║  ██║███████╗    ██████╔╝╚██████╔╝██║███████╗███████╗██║  ██║██║     ███████╗██║  ██║   ██║   ███████╗
        ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝    ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
                                                                         
        </pre>
    </div>
    `)
})

app.listen(port, () => {
    console.log(`${appName} is listening on port ${port}`)
})
