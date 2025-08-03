import { Request, Response, Router } from "express";
import { injectedAuthController } from "../../DI/auth";
export class Auth_router {
    private _router: Router
    constructor() {
        this._router = Router();
        this._setRoute();
    }

    private _setRoute() {
        this._router.post('/signup', (req: Request, res: Response) => {
            injectedAuthController.handleSendOtp(req, res);
        })

        this._router.post('/resendOtp', (req:Request, res:Response)=>{
            injectedAuthController.handleResendOtp(req,res)
        })

        this._router.post('/verify', (req: Request, res: Response) => {
            injectedAuthController.handleRegisterUser(req, res)
        })

        this._router.post("/login", (req: Request, res: Response) => {
            injectedAuthController.handleUserLogin(req, res);
        })

        this._router.post("/adminLogin", (req: Request, res: Response) => {
            injectedAuthController.handleAdminLogin(req, res);
        })

        this._router.post("/forget", (req:Request, res:Response)=>{
            injectedAuthController.handleForgetPasswordSendOtp(req, res)
        })
    }

    public get_router() {
        return this._router;
    }
}