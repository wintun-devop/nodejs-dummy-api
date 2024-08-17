import { Router,Request, Response } from 'express';
import { ProductRepo } from '../../repositories/product-repo';

// declare route
export const oneProductRoute = Router();

oneProductRoute.post("/",async (req:Request,res:Response) => {
    try {
        const reqBody = req.body
        const result = await ProductRepo.create(reqBody)
        return res.status(201).json({"message":"success",result:result});
    } catch (e) {
        return res.status(500).json({"message":"Internal server error!"})
    }
})


oneProductRoute.get('/:id',async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const result = await ProductRepo.selectById(id)
        if (result) {
            res.status(200).json({"message":"success",result:result});
        }else{
            res.status(400).json({"message":"Not Found!"})
        }
    } catch (e) {
        console.log("error",e);
        res.status(500).json({"message":"Internal server error!"})
    }
})