import LoginRequestModel from "../RequestModels/LoginRequestModel";

const mysql = require("mysql");;
class Connection {
con:any;
public constructor()
{
  this.con = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "Mackali1453+",
    database: "nodejs"
});
}

public QueryFirstOrDefault (sql:string,obj:Object)
{
  
    return new Promise((resolve,reject)=> 
    
    {
      this.con.query(sql,Object.values(obj)
      
      , function (err:any, results:any) 
      {
        
        if(results === undefined){
          reject(new Error("Error rows is undefined"));
      }else{
          resolve(JSON.stringify(results[0]) );
          
      }
      })
    })
      
    
  
}

}
  

export default Connection;

