import { Server, Socket } from "socket.io";
import logger from "../../utilities/logger";
import CreateMessageUseCase from "../../application/usecases/CreateMessageUseCase";
import MessageRepository from "../repositories/MessageRepository";

const users : any = {}
const messageRepo = new MessageRepository()
const createMessage = new CreateMessageUseCase(messageRepo)
export default function chatSocket(io : Server) {
    io.on("connection", (socket) => {
        logger.info(`User connected :: ${socket.id}`)

        socket.emit('welcome', 'Hi there welcome to aspiro')

        socket.on("join", (userId : string) => {
            logger.info(`User ${userId} joined`)
            users[userId] = socket.id
        })

        socket.on("sendMessage", ({sender, receiver, message}) => {
            const result = createMessage.execute({sender, receiver, message})

            const receiverSocket = users[receiver]
            if(receiverSocket){
                io.to(receiverSocket).emit("receiveMessage", result)
            }
        })

        socket.on("disocnnect", () => {
            Object.keys(users).forEach((userId) => {
                if(userId === socket.id){
                    delete users[userId]
                }
            })
        })
    })
}