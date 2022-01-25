import {Request,Response} from "express";
import MetaModel from "./MetaModel";
class BaseMetaModel
    {
        meta:MetaModel = MetaModel.userExist();
        response:Object = {};
        
        public static create(meta:MetaModel,response?:any)
        {
            return new BaseMetaModel(meta,response);
        }
        public constructor (meta:MetaModel,response:Object)
        {
            this.meta = meta;
            this.response = response;
        }
    }
export default BaseMetaModel;