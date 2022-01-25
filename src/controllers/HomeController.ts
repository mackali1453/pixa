import {Request,Response} from "express";
import RegisterRequestModel from "../RequestModels/RegisterRequestModel";
import BaseMetaModel from "../ResponseModels/BaseMetaModel";
import { executeDbFunctions } from "../DB/ExecuteDbfunctions";
import ApiRequestContext from "../DB/ApiRequestContext";
import randomRequestModel from "../RequestModels/AuthorizationModel";
import LoginRequestModel from "../RequestModels/LoginRequestModel";
import AuthorizationModel from "../RequestModels/AuthorizationModel";

import SocketClient from "../RequestModels/SocketClient";
import SocketServer from "../RequestModels/SocketServer";
const path = require('path');
class postController{
    
    public Register(req:Request,res:Response)
		{	
			return  executeDbFunctions.executeRequest((context:ApiRequestContext)=>new RegisterRequestModel(req,res).register(context),res);
		}
	public Login(req:Request,res:Response)
	{
		return  executeDbFunctions.executeRequest((context:ApiRequestContext)=>new LoginRequestModel(req,res).Login(context),res);
	}

	public async SocketServer(req:Request,res:Response)
	{
		return  executeDbFunctions.executeRequest((context:ApiRequestContext)=>new SocketServer().Server(context),res);
	}
	public async SocketClient(req:Request,res:Response)
	{
		return  executeDbFunctions.executeRequest((context:ApiRequestContext)=>new SocketClient(req,res).Client(context),res);
	}
}
export default postController;