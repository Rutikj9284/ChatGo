import { Server } from "socket.io";

import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin : ["http://localhost:3000"],
        methods: ["GET", "POST"]
    },
});

export const getRecieverSocketId = (recieverId)=>{
    return userSocketId[recieverId];
}

const userSocketId = {};

//on connection connected user id is being sent from the frotend server

io.on("connection", (socket)=>{
    console.log("User Coonenected", socket.id);
    const userId = socket.handshake.query.userId;

    if(userId !== "undefined"){
        userSocketId[userId] = socket.id;
    }

    // io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketId));

	// socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", ()=>{
        console.log("User Disconnected", socket.id);
        delete userSocketId[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketId));
    });

})

export {app, io, server};