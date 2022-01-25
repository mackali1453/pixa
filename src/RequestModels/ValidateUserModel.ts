import {json, Request,Response} from "express";
import MetaModel from "../ResponseModels/MetaModel";
import BaseMetaModel from "../ResponseModels/BaseMetaModel";
import UserModel from "../ResponseModels/UserModel";
import ApiRequestContext from "../DB/ApiRequestContext";
import { isNull } from "util";
import { resolve } from "url";
import LoginRequestModel from "./LoginRequestModel";
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
require('dotenv').config({
    path: 'C:/nodeJS/socket_io_task/src/.env'
  });

class ValidateUserModel extends UserModel{
    
    public static async validate(context:ApiRequestContext,usermodel:UserModel)
    {           
        Object.assign(this, usermodel);
        var user =  await context.QueryFirstOrDefault("select first_name,last_name,email,password from user where first_name = ? and last_name=? and email=? and password=?",
        this);
        if (user!=undefined)
            return BaseMetaModel.create(MetaModel.userExist(),user )  
        else 
            return BaseMetaModel.create(MetaModel.userNotExist())
    }
    

  
    
}
export default ValidateUserModel;