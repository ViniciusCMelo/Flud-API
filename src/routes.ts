import User from "./model/User";
import {Router} from "express";
import UsersController from "./controllers/UsersController";
import FloodsController from "./controllers/FloodsController";
import HazardsController from "./controllers/HazardsController";
import ReportsController from "./controllers/ReportsController";
import {uploadImage} from "./database/connection";

import multer from "multer";

const routes = Router();
const Multer = multer({
    storage: multer.memoryStorage(),
});

routes.post('/users', UsersController.create);
routes.get('/users', UsersController.index);

routes.post('/floods', FloodsController.create);

routes.post('/hazards', HazardsController.create);

routes.post('/reports', Multer.array("images"), uploadImage, ReportsController.create);
routes.get('/reports/:floodId', ReportsController.show);

export default routes;
