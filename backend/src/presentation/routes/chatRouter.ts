const express = require('express');
import ChatController from '../controllers/chatController';
import CreateMessageUseCase from '../../application/usecases/CreateMessage.usecase';
import MessageRepository from '../../infrastructure/repositories/MessageRepository';

function createChatRouter() {
  const chatRouter = express.Router();

  const chatRepo = new MessageRepository();

  const sendMessageUC = new CreateMessageUseCase(chatRepo);

  const chatController = new ChatController(sendMessageUC);

  chatRouter.post(
    '/chat/send',
    chatController.sendMessage.bind(chatController)
  );

  return chatRouter;
}

export default createChatRouter;
