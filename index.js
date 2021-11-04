const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

// const Server = require('socket.io');
// const io = new Server(3000);
const server = require("http").createServer(app);
// const io = require("socket.io").listen(server);
const io = require('socket.io')(server)

const authRouter = require('./routes/auth')
const messRouter = require('./routes/messages')
const userRouter = require('./routes/user')
const roomRouter = require('./routes/room')
// const notificationRouter = require('./routes/notification')

io.on("connection", socket => {
    console.log(`socket io run`)
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
      });
  });

const connectDB = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://vuongnt:1234@project3.ssedk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        console.log("connect mongoDB")
    } catch (error) {
        console.log("Disconnect mongoDB")
        process.exit(1)
    }
}

connectDB()


app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/message', messRouter)
app.use('/api/user', userRouter)
app.use('/api/room', roomRouter)
// app.use('/api/notification', notificationRouter)


const PORT = process.env.PORT || 8080

console.log("process.env.PORT: ", process.env.PORT);

console.log("PORT: ", PORT);

server.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))