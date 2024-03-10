import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';  //.js is mandatort as we are importing packages as modules --> see package.json
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToDb from './db/connectToDb.js';
import cookieParser from 'cookie-parser';
import isAuthorized from './middleware/isAuthorized.js';  //Only authorized/logged in users can send the messages
import { app, server } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());  //Allow us to use, extract req.body i.e. to parse the request body
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', isAuthorized,  messageRoutes);
app.use('/api/users', isAuthorized, userRoutes);
app.get('/', (req, res) => {
    res.send("Working let's gooo...");
})

server.listen(PORT, ()=>{
    connectToDb();
    console.log(`Server is running on ${PORT}`);
})