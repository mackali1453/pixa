import {json, Request,Response} from "express";
import MetaModel from "../ResponseModels/MetaModel";
import BaseMetaModel from "../ResponseModels/BaseMetaModel";
import ApiRequestContext from "../DB/ApiRequestContext";
import { isNull } from "util";
import { resolve } from "url";
import ValidateUserModel from "./ValidateUserModel";
import  UserModel  from "../ResponseModels/UserModel";
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
require('dotenv').config({
    path: 'C:/nodeJS/socket_io_task/src/.env'
  });

class RegisterRequestModel extends ValidateUserModel{
    
    public constructor(req:Request,res:Response)
    {
        super()
        Object.assign(this, req.body);
    }
    public  async register(context:ApiRequestContext)
    {   var validationResult = await ValidateUserModel.validate(context,this);
        if (!(this.email && this.password && this.first_name && this.last_name)) {
            return BaseMetaModel.create(MetaModel.inputError());
        }
        this.password = crypto.createHash('md5').update(this.password).digest('hex');
        if (validationResult.meta != MetaModel.userExist()) {
            var newUser =  await context.ExecuteQuery("INSERT INTO user (first_name,last_name,email,password) VALUES (?,?,?,?)",this); 
            var oldUser =  await context.QueryFirstOrDefault("select first_name,last_name,email,password from user where first_name = ? and last_name=? and email=? and password=?",this);
            return validationResult;
        }
        else
        {
          return validationResult;
        }
    }
}
export default RegisterRequestModel;