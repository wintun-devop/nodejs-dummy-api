import { Router,Request, Response } from 'express';


//declare router
export const defaultRoute = Router();

// crate request and response
defaultRoute.get('/', async (req:Request, res:Response) => {
  res.send({"message":"API is working ok"})
})