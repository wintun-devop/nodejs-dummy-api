import express from 'express';
import { defaultRoute } from './default';

// import routes



// declare the routes for router
export const routes = express.Router();


// register routes
routes.use("/test",defaultRoute)
