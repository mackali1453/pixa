import {json, Request,Response} from "express";
import MetaModel from "../ResponseModels/MetaModel";
import BaseMetaModel from "../ResponseModels/BaseMetaModel";
import { isNull } from "util";
import { resolve } from "url";
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
require('dotenv').config({
    path: 'C:/nodeJS/socket_io_task/src/.env'
  });

class AuthorizationModel{
    
    
    
    
    
    public static async verify(req:Request,res:Response)
    {   
         const authHeader = req.headers['authorization']
         const token = authHeader && authHeader.split(' ')[1]
         if (token == null) return res.sendStatus(401)
         var jwt_verify = function(){return new Promise((resolve,reject)=> { jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err:Error)=>
         {
            if(err)
            {
                var validationResult = MetaModel.NotAuthorized();
                reject(validationResult)
         }
            else {

                var validationResult = MetaModel.Success();
                resolve(validationResult)
            }
         })
        })
    }
        var validationResult = await jwt_verify().then((results:any)=>{return results},(results:any)=>{return results})
        return validationResult
    }
}
export default AuthorizationModel;