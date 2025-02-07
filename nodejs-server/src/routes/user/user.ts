import express, { Router, Request, Response } from 'express';
import { UserRepo } from '../../repositories/user-repo';
import { createHash, checkHash } from '../../utils/hash';


// declare route
export const authRoute = Router();

authRoute.post("/register", async (req: Request, res: Response): Promise<any> => {
    try {
        const reqBody = req.body
        const { password, ...rest } = reqBody
        const hash = await createHash(password)
        const result = await UserRepo.create({ ...rest, password: hash })
        return res.status(201).json({ status: "success", "message": "success", result: result });
    } catch (e: any) {
        console.log("prisma", e)
        if (e.code == 'P2002') {
            return res.status(400).json({ status: "error", message: "Unique Constrain!" })
        }
        return res.status(500).json({ status: "error", message: "Internal server error!" })
    };
});

authRoute.post("/login", async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body
        /* username as email */
        const isUserExistByEmail = await UserRepo.selectByEmail(username);
        if (isUserExistByEmail) {
            const { password: hashPassword, ...rest } = isUserExistByEmail;
            const isPasswordTrue = await checkHash(password, hashPassword);
            if (!isPasswordTrue) {
                return res.status(401).json({ status: "error", "message": "usrename or password incorrect.", result: null });
            }
            return res.status(200).json({ status: "success", "message": "login success", result: rest });
        };
        /* username as username */
        const isUserExistByUsername = await UserRepo.selectUsername(username);
        if (isUserExistByUsername) {
            const { password: hashPassword, ...rest } = isUserExistByUsername;
            const isPasswordTrue = await checkHash(password, hashPassword);
            if (!isPasswordTrue) {
                return res.status(401).json({ status: "error", "message": "usrename or password incorrect.", result: null });
            }
            return res.status(200).json({ status: "success", "message": "login success", result: rest });
        }
        return res.status(401).json({ status: "error", "message": "usrename or password incorrect.", result: null });
    } catch (e: any) {
        console.log("prisma", e)
        if (e.code == 'P2002') {
            return res.status(400).json({ status: "error", message: "Unique Constrain!" })
        }
        return res.status(500).json({ status: "error", message: "Internal server error!" })
    };
});