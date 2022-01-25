# socket io rest api

socket io rest api is a node.js app which clients can chat each other. 

## Installation

Go to app folder and use npm for installing requirements.

```bash

  npm install

```


## Usage with node.js
Go to app folder and type set PORT=whatever port you want and then type "npm run start"

## After running app
Open and api client(postman,insomnia) send post request to "http://localhost:PORT/Register". Request body is like this;
{
	"first_name":"xx",
  "last_name":"xx",
	"email":"xx",
	"password":"xx"
}
.
After registering app run socket io server it does not require authorization. Route is "localhost:PORT/Server" and there is no body.
After running server login app as a client. Route is "http://localhost:PORT/login". Request body is same as Registering app.
Login request returns a token. 
And then open cmd and run app as a client in DIFFERENT PORTS by type "set PORT=xx". You can run as much clients as you want. And then type npm run start.
Last process is sending message. Send request to "localhost:PORT/Client". Request body is;
{
	    
		"username":"xx",
    "room1":"xx",
    "message":"xx",
    "message_to":"xx"
}
Before that use token in request body header. 
