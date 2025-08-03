import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
import { MongodbConnect } from './config/mongodbConfig'
import express, { Express } from 'express'
import { Auth_router } from './infrastructure/routes/auth/authRoute';
import { createStream } from 'rotating-file-stream'
import morgan from 'morgan';
import path from 'path'
import { DateTimeUtil } from './infrastructure/utils/DateTimeUtil';
import cookieParser from 'cookie-parser'
import cors from 'cors';

class Express_app {
    private _app: Express;
    constructor() {
        this._app = express();
        MongodbConnect.connect();
        this._setLoggingMiddleware()
        this._setMiddlewares()
        this._setAuthRouter()
    }

    listen() {
        const PORT = process.env.PORT ?? 3000;
        this._app.listen(PORT, (err) => {
            if (err) {
                console.log("Error while starting server");
                throw err;
            }

            console.log(`Server running successfully on ${PORT}`);
        })
    }

    private _setMiddlewares() {
        this._app.use(cors({
            origin: process.env.FRONTEND_URL,
            credentials: true
        }))
        this._app.use(express.json())
        this._app.use(cookieParser())
    }

    private _setLoggingMiddleware() {
        if (process.env.NODE_ENV === 'development') {
            this._app.use(morgan('combined'))
        } else if (process.env.NODE_ENV === 'production') {

            const accessLogs = createStream((time, index) => {
                if (!time) return path.join(__dirname, "logs", "accessLogs", "buffer.txt");
                return path.join(__dirname, "logs", "accessLogs", DateTimeUtil.getFormatedDateTime(new Date()) + index + ".txt")
            }, {
                interval: '1d',
                size: "100M",
            })

            const errorLogs = createStream((time, index) => {
                if (!time) return path.join(__dirname, "logs", "errorLogs", "buffer.txt");
                return path.join(__dirname, "logs", "errorLogs", DateTimeUtil.getFormatedDateTime(new Date()) + index + ".txt")
            }, {
                interval: '1d',
                size: "100M"
            })

            // accesslogs middleware
            this._app.use(morgan('combined', { stream: accessLogs }))

            // error logs (skips if statuscode is less than 400)
            this._app.use(morgan('combined', { stream: errorLogs, skip: (req, res) => res.statusCode < 400 }))
        }
    }

    private _setAuthRouter() {
        this._app.use("/auth", new Auth_router().get_router())
    }
}

const _app = new Express_app();
_app.listen()

