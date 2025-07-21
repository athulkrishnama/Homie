import { Request, Response, Router } from "express";
import { injectedAuthController } from "../../DI/auth";

export class AuthRouter {
    private router: Router
    constructor() {
        this.router = Router();
        this.setRoute();
    }

    private setRoute() {
        this.router.post('/signup', (req: Request, res: Response) => {

            injectedAuthController.handleSendOtp(req, res);
        })

        this.router.post('/resendOtp', (req:Request, res:Response)=>{
            injectedAuthController.handleResendOtp(req,res)
        })

        this.router.post('/verify', (req: Request, res: Response) => {
            injectedAuthController.handleRegisterUser(req, res)
        })

        this.router.post("/login", (req: Request, res: Response) => {
            injectedAuthController.handleUserLogin(req, res);
        })

        this.router.post("/adminLogin", (req: Request, res: Response) => {
            injectedAuthController.handleAdminLogin(req, res);
        })

        this.router.post("/forget", (req:Request, res:Response)=>{
            injectedAuthController.handleForgetPasswordSendOtp(req, res)

        })
    }

    public getRouter() {
        return this.router;
    }
}