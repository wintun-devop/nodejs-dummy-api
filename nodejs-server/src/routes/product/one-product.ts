import { Router,Request, Response } from 'express';
import { ProductRepo } from '../../repositories/product-repo';

// declare route
export const oneProductRoute = Router();

// Create(C)
oneProductRoute.post("/",async (req:Request,res:Response) => {
    try {
        const reqBody = req.body
        const result = await ProductRepo.create(reqBody)
        return res.status(201).json({"message":"success",result:result});
    } catch (e) {
        return res.status(500).json({"message":"Internal server error!"})
    }
})

// Read One Prodct by Id(R)
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
});

// update one product By id(U)
oneProductRoute.put('/:id',async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const reqBody = req.body
        const search = await ProductRepo.selectById(id)
        if (search) {
            const updateData = {...search,...reqBody,updatedAt:new Date().toISOString()}
            const result = await ProductRepo.update(id,updateData)
            res.status(200).json({"message":"success",result:result});
        }else{
            res.status(400).json({"message":"Not Found or Already deleted!"})
        } 
    } catch (e) {
        console.log("error",e);
        res.status(500).json({"message":"Internal server error!"})
    }
})

// delete one product by id(D)
oneProductRoute.delete("/:id",async (req:Request, res:Response) => {
    try{
        const {id} = req.params;
        const search = await ProductRepo.selectById(id)
        if (search) {
            const result = await ProductRepo.remove(id)
            res.status(200).json({"message":"success",result:result});
        }else{
            res.status(400).json({"message":"Not Found or Already deleted!"})
        } 
    }catch(e){
        console.log("error",e);
        res.status(500).json({"message":"Internal server error!"})
    }
})