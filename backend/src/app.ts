import 'dotenv/config'
import { MongodbConnect } from './config/mongodbConfig'
import express,{ Express } from 'express'
import { AuthRouter } from './infrastructure/routes/auth/authRoute';


class ExpressApp{
    private app:Express;
    constructor(){
        this.app = express();
        MongodbConnect.connect();
        this.setMiddlewares()
        this.setAuthRouter()
    }

    listen(){
        const PORT = process.env.PORT ?? 3000;
        this.app.listen(PORT, (err)=>{
            if(err){
                console.log("Error while starting server");
                throw err;
            }

            console.log(`Server running successfully on ${PORT}`);
        })
    }

    private setMiddlewares(){
        this.app.use(express.json())
    }

    private setAuthRouter(){
        this.app.use("/auth", new AuthRouter().getRouter())
    }
}

const app = new ExpressApp();
app.listen()

