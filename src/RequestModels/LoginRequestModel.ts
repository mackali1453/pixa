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
class LoginRequestModel extends ValidateUserModel{
    
    public constructor(req:Request,res:Response)
    {
        super()
        Object.assign(this, req.body);
    }
    public  async Login(context:ApiRequestContext)
    { 
        
        this.password = crypto.createHash('md5').update(this.password).digest('hex');
        console.log(this.password);
        var validationResult = await ValidateUserModel.validate(context,this);
        if (!(this.email && this.password && this.first_name && this.last_name)) {
            validationResult.meta = MetaModel.inputError();
            return validationResult;
        }

        if ( validationResult.meta.status_message == MetaModel.userExist().status_message) {
            var token = jwt.sign(
                { user_id: this.password},
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: "2h",
                }
              );
            var result = await context.ExecuteQuery(" UPDATE user SET token=? WHERE password=?",{"token":token,"password":this.password});
            return validationResult;
        }
        else
        {
          return validationResult;
        }
    }
}
export default LoginRequestModel;