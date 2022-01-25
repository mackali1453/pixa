import {Request,Response} from "express";
class MetaModel{
    
    
    status_code:number;
    status_message:string;
    
    public constructor(status_code:number,status_message:string)
        {
            this.status_code = status_code;
            this.status_message = status_message;
        }
    public static inputError():MetaModel
    {
        return new MetaModel(400,"All input is required");
    }
    public static userExist():MetaModel
    {
        return new MetaModel(100,"user exist");
    }
    public static userNotExist():MetaModel
    {
        return new MetaModel(101, "user not exist");
    }
    public static Success():MetaModel
    {
        return new MetaModel(200, "success");
    }
    public static DatabaseError():MetaModel
    {
        return new MetaModel(201, "database error");
    }
    public static NotAuthorized():MetaModel
    {
        return new MetaModel(201, "not authorized");
    }
    public static GenericError():MetaModel
    {
        return new MetaModel(201, "generic error");
    }
     
  
    
}
export default MetaModel;