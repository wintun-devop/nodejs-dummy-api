import express from 'express';


// import routes
import { defaultRoute } from './default';
import { oneProductRoute } from './product/product';
import { authRoute } from './user/user';


// declare the routes for router
export const routes = express.Router();


// register routes
routes.use("/health",defaultRoute)
routes.use("/product",oneProductRoute)
routes.use("/auth",authRoute)

