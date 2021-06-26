import User from "./model/User";
import {Router} from "express";
import UsersController from "./controllers/UsersController";

const routes = Router();
routes.post('/users', UsersController.create);
routes.get('/users', UsersController.index);

export default routes;
