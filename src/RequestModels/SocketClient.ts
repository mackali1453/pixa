import internal from "assert";
import {Request,Response} from "express";
import ApiRequestContext from "../DB/ApiRequestContext";
import BaseMetaModel from "../ResponseModels/BaseMetaModel";
import MetaModel from "../ResponseModels/MetaModel";
const io = require('socket.io-client');

class SocketClient{
    username:string="";
    room1:string="0";
    message:string="";
    message_to:string="";
    public constructor(req:Request,res:Response)
    {
        Object.assign(this, req.body);
    }
    public async Client(context:ApiRequestContext )
    {

        var socket = io.connect('http://localhost:8001');
        var newUser =  await context.QueryFirstOrDefault("select socket_id,username,room from socket where username=? order by id desc",{username:this.message_to}); 
        socket.emit('joinRoom', JSON.stringify({username:this.username,room:this.room1}));
        if(newUser==null)
        {
            console.log("user not found")
        }
        // Message from server
        // socket.on("message",(msg:any)=>console.log(msg))
        socket.emit("message_private", {user:newUser,message:this.message});
        socket.on("message_by_client",(msg:any)=>console.log(msg))
        // console.log(JSON.parse(newUser).socket_id)
        // io.to(JSON.parse(newUser).socket_id).emit('message_to_specific_user',this.message)

    }
    
}
export default SocketClient;