import User from "./model/User";
import {Router} from "express";
import UsersController from "./controllers/UsersController";
import FloodsController from "./controllers/FloodsController";
import HazardsController from "./controllers/HazardsController";
import ReportsController from "./controllers/ReportsController";

const routes = Router();
routes.post('/users', UsersController.create);
routes.get('/users', UsersController.index);

routes.post('/floods', FloodsController.create);

routes.post('/hazards', HazardsController.create);

routes.post('/reports', ReportsController.create);

export default routes;
