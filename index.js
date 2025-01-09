const express=require('express');
const app=express();
const path=require("path");
const http=require("http");  //important for socket.io

const socketio= require("socket.io");  //setup of socket.io
const server=http.createServer(app);
const io=socketio(server);

app.set("view engine","ejs");  //setup of ejs
app.use(express.static(path.join(__dirname,"public")));   //for the use of static files

io.on("connection", (socket)=>{
    socket.on("send-location",(data)=>{
     io.emit("receive-location",{id: socket.id,...data});
    });
    
    socket.on("disconnect", ()=>{
        io.emit("user-disconnect",socket.id);
    })
});

app.get("/", (req,res)=>{
    res.render("app");
});

server.listen(3000);
