import dotenv from  'dotenv'
dotenv.config({path:`.env.${process.env.NODE_ENV}`})
import { MongodbConnect } from './config/mongodbConfig'
import express, { Express } from 'express'
import { AuthRouter } from './infrastructure/routes/auth/authRoute';
import { createStream } from 'rotating-file-stream'
import morgan from 'morgan';
import path from 'path'
import { DateTimeUtil } from './infrastructure/utils/DateTimeUtil';
import cookieParser from 'cookie-parser'

class ExpressApp {
    private app: Express;
    constructor() {
        this.app = express();
        MongodbConnect.connect();
        this.setLoggingMiddleware()
        this.setMiddlewares()
        this.setAuthRouter()
    }

    listen() {
        const PORT = process.env.PORT ?? 3000;
        this.app.listen(PORT, (err) => {
            if (err) {
                console.log("Error while starting server");
                throw err;
            }

            console.log(`Server running successfully on ${PORT}`);
        })
    }

    private setMiddlewares() {
        this.app.use(express.json())
        this.app.use(cookieParser())
    }

    private setLoggingMiddleware() {
        if (process.env.NODE_ENV === 'development') {
            this.app.use(morgan('combined'))
        } else if (process.env.NODE_ENV === 'production') {

            const accessLogs = createStream((time, index) => {
                if (!time) return path.join(__dirname, "logs", "accessLogs", "buffer.txt");
                return path.join(__dirname, "logs", "accessLogs", DateTimeUtil.getFormatedDateTime(new Date()) + index + ".txt" )
            }, {
                interval: '1d',
                size: "100M",
            })

            const errorLogs = createStream((time, index) => {
                if (!time) return path.join(__dirname, "logs", "errorLogs", "buffer.txt");
                return path.join(__dirname, "logs", "errorLogs", DateTimeUtil.getFormatedDateTime(new Date()) + index +".txt")
            }, {
                interval: '1d',
                size: "100M"
            })

            // accesslogs middleware
            this.app.use(morgan('combined', { stream: accessLogs }))

            // error logs (skips if statuscode is less than 400)
            this.app.use(morgan('combined', { stream: errorLogs, skip: (req, res) => res.statusCode < 400 }))
        }
    }

    private setAuthRouter() {
        this.app.use("/auth", new AuthRouter().getRouter())
    }
}

const app = new ExpressApp();
app.listen()

