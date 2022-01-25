import internal from "assert";
import {Request,Response} from "express";
import ApiRequestContext from "../DB/ApiRequestContext";
import BaseMetaModel from "../ResponseModels/BaseMetaModel";
import MetaModel from "../ResponseModels/MetaModel";
import Users from "../DB/Users";
import Messages from "../DB/Messages";
class SocketServer{

    public constructor()
    {
    }
    public async Server(context:ApiRequestContext )
    {
      var players:Array<object> = [];
      console.log("socket.io is running on port8001")
      const io = require('socket.io')(8001);
      const botName = 'ChatCord Bot';
      io.on('connection',  (socket:any) => {
        socket.on('joinRoom', async ( newUser:any ) => {

        const x = {...JSON.parse(newUser),socket_id:socket.id};
        var user =  await context.ExecuteQuery("INSERT INTO socket (username,room,socket_id) VALUES (?,?,?)",x); 
        players.push(x)

           // Broadcast when a user connects
           
           io.sockets
           .emit(
          'message',
          x.username+" has joined the chat"
        );

        });
        
        socket.on('message_private', (data:any) => {
          var name = JSON.parse(data.user).username;
          var element:any = players.find((x:any)=>{return x.username==name})
          console.log(element)
          // console.log(players.find((x:any)=>{x.username="meliksah"}))
          
          // console.log(players)
          // var element =players.find((x:any)=>{x.username==JSON.parse(data.username)})
          // console.log(element)
          // console.log(players)
          // console.log(data.username)
           if(element!=undefined)
           {
            console.log(element.socket_id)
            // io.to(element.socket_id).emit('private message', "mesaj")
            // io.eio.clients[element.socket_id].emit( "mesaj");
            io.to(element.socket_id).emit('message_by_client', data.message);           }
         
        })
        
        
        // Runs when client disconnects
        io.on('disconnect', async() => {
            
            var user =  await context.QueryFirstOrDefault("select room,username from socket where socket_id=?",{socket_id:socket.id}); 
            JSON.parse(user).username+"has joined the chat"
            await context.ExecuteQuery("DELETE FROM socket WHERE socket_id=?",{socket_id:socket.id})
        if (user) {
            socket.broadcast(JSON.parse(user).room).emit(
               'message',
               JSON.parse(user).username+"has left the chat"
             );
           }
         });
         
      }
      );
    }
 
}

export default SocketServer;