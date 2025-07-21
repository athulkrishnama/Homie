import { Request, Response, Router } from "express";
import { injectedCreateUserController, injectedRegisterSendOtpController } from "../../DI/auth";

export class AuthRouter {
    private router: Router
    constructor() {
        this.router = Router();
        this.setRoute();
    }

    private setRoute() {
        this.router.post('/signup', (req: Request, res: Response) => {
            injectedRegisterSendOtpController.handleSendOtp(req, res)
        })

        this.router.post('/verify', (req: Request, res: Response) => {
            injectedCreateUserController.handleRegisterUser(req, res)
        })
    }

    public getRouter() {
        return this.router;
    }
}