const express=require('express');
const path=require('path');
const http=require('http');
const socketio=require('socket.io');
const app = express();
const formatMessage=require('./utils/messages')
const {userJoin,getCurrentUser,userDisconnect,getRoomUser}=require('./utils/users');


const server=http.createServer(app);
const io=socketio(server);
const PORT=5000 || process.env.PORT;
const Botname='ChatBot';
app.use(express.static(path.join(__dirname,'public')));

io.on('connection', socket=>{
    socket.on('joinRoom',({username,room})=>{
        const user= userJoin(socket.id,username,room);
        socket.join(user.room);
        console.log(user);
        console.log('new connection');
        socket.emit('message',formatMessage(Botname,'Hello'));
        socket.broadcast.to(user.room).emit('message',formatMessage(Botname,`${user.username} entered the chat`));
    })

    socket.on('chat-message',msg=>{
        const user=getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg));
    })

    socket.on('disconnect', ()=>{
        const user= userDisconnect(socket.id)

        io.to(user.room).emit('message',formatMessage(Botname,`${user.username} left the chat`));
    })

})


server.listen(PORT,()=>{
    console.log("server running");
})