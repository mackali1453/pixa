import postController from "../controllers/HomeController";
import {Router} from "express";
import AuthorizationModel from "../RequestModels/AuthorizationModel";
import MetaModel from "../ResponseModels/MetaModel";
import BaseMetaModel from "../ResponseModels/BaseMetaModel";
const controller = new postController(); //postController class includes functions.
const router = Router(); //Router class allow us to associate our functions which have http methods to different routes.

router.all("/login",controller.Login); //routes to leaflet map page
router.all("/Register",controller.Register);
router.all("/Server",controller.SocketServer);

router.all("/Client",async function(req,res)
{
     var validationResult = await AuthorizationModel.verify(req,res);
     if (validationResult.status_message==MetaModel.Success().status_message)
     {
        
        controller.SocketClient(req,res)
        
     }
        
     else
         {
             res.send(BaseMetaModel.create(validationResult))
         }
}
);


export default router;
