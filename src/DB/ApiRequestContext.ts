import {json, Request,Response} from "express";
import MetaModel from "../ResponseModels/MetaModel";
import BaseMetaModel from "../ResponseModels/BaseMetaModel";
class ApiRequestContext{

    connection:any;
    public constructor(db:any)
    {
        this.connection = db;
    }
    public async ExecuteQuery(sql:string,obj:Object)
    {  
        try
        {
            this.connection.QueryFirstOrDefault(sql,obj).then( (results:any)=> 
        {
        });
        return MetaModel.Success()
        }
        catch
        {
            return MetaModel.DatabaseError()
        }
        
    }
    public QueryFirstOrDefault(sql:string,obj:Object)
    {  
        return this.connection.QueryFirstOrDefault(sql,obj).then( (results:any)=> 
        {
            return results;    
        });
    }  
}
export default ApiRequestContext;