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

io.of("/room").on("connection", socket => {
    console.log(`socket io run`, socket.id)
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
      });
    socket.on("client_send_message", message_client_sent => {
        console.log("message_client_send", message_client_sent);
        const message_server_sent = [{"text":"Adfasdf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T10:05:31.336Z","_id":"bd6e8bef-562c-4980-bb45-32948c3a312b"},{"text":"Adfasdfas","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T10:02:31.937Z","_id":"35b635cb-8fcf-4f85-8c17-7029457bd99d"},{"text":"Fasf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T10:02:24.004Z","_id":"b7f2c808-7448-492f-841a-ba40af352483"},{"text":"Ffff","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T10:01:42.527Z","_id":"7ea64147-0191-43a1-ace6-ca6adbee9ac9"},{"text":"Adfasdf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T10:01:39.877Z","_id":"aad369b2-2266-4c96-9809-fb37261b19f7"},{"text":"Adfasdf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T10:01:30.314Z","_id":"29badeda-f888-4ebe-8440-80d55dde7b0b"},{"text":"Dfasdf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T10:01:28.533Z","_id":"003ce1c6-0fb5-46b0-bab7-a8ca058f91b2"},{"text":"Adfasdf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T09:58:21.763Z","_id":"b893803c-aeaa-4bd0-b3a1-b82053e94ef9"},{"text":"Adfadfs","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T09:58:20.202Z","_id":"a4b43fd8-6f46-417e-b0e8-aa0f05873b6b"},{"text":"Adfadsf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T09:58:18.996Z","_id":"3d97a3d3-b77b-4794-b637-6cdcb8ac7afd"},{"text":"Adfas","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T09:58:17.724Z","_id":"2f367bc9-ea3c-410f-9164-1db064f61e77"},{"text":"Adfasdf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T09:56:54.150Z","_id":"2c93797d-3453-4ae6-b9f9-d9d389d8c432"},{"text":"Adfas","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T09:56:52.385Z","_id":"9aafa679-abba-4587-b577-cd92bc3dabf7"},{"text":"Fasdf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T09:55:51.818Z","_id":"fb489bda-d432-4c20-aad8-a96c33db6931"},{"text":"Fasdf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T09:53:59.032Z","_id":"b43a6793-b642-468f-935b-552b8e8d80ff"},{"text":"Dfa","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T09:53:52.369Z","_id":"0f5ba05f-1855-4004-a27b-839232373b71"},{"text":"Dfa","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T09:53:37.596Z","_id":"36da38d2-01c8-4d7c-9d70-6bb49f4d9688"},{"text":"Fasdfsafdasf","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T07:35:49.188Z","_id":"a670527d-2143-4680-96cf-0e5870bf7cb3"},{"text":"Do","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T07:35:43.333Z","_id":"c891c3c0-4827-470a-b2f6-5fabb36bd7c8"},{"text":"Cc nha","user":{"_id":"6178b7c91e2ed1c87db9fffa"},"createdAt":"2021-11-09T07:28:53.956Z","_id":"666e9ce9-1497-4692-9c40-1aa7bb1c547f"},{"text":"Hello to ngu","user":{"_id":"6178b7cf1e2ed1c87db9fffd"},"createdAt":"2021-11-09T06:50:04.862Z","_id":"da102556-dbc9-4fd2-baf3-5f572321e450"}]
        socket.emit("server_send_message", message_server_sent);
    })
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





const PORT = process.env.PORT || 5000;

console.log("process.env.PORT: ", process.env.PORT);

console.log("PORT: ", PORT);

server.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))