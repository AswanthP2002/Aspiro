import express, { NextFunction, Request, Response } from 'express';
import ChatController from '../controllers/chatController';
import { container } from 'tsyringe';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { ChatApiRoutes } from '../../constants/Apis/chat.routes';

function createChatRouter() {
  const chatRouter = express.Router();

  const chatController = container.resolve(ChatController);

  chatRouter.get(
    ChatApiRoutes.GET_CONVERSATIONS,
    centralizedAuthentication,
    authorization(['user']),
    chatController.getConversations.bind(chatController)
  );
  chatRouter.post(
    ChatApiRoutes.INITIALIZE_CONVERSATION,
    centralizedAuthentication,
    authorization(['user']),
    chatController.initializeConversation.bind(chatController)
  );
  chatRouter.get(
    ChatApiRoutes.GET_CHATS_BY_CONVERSATION_ID,
    centralizedAuthentication,
    authorization(['user']),
    chatController.getchats.bind(chatController)
  );
  chatRouter.delete(
    ChatApiRoutes.DELETE_CHAT_BY_ID,
    centralizedAuthentication,
    authorization(['user']),
    chatController.deleteChat.bind(chatController)
  );
  chatRouter.patch(
    ChatApiRoutes.DELETE_CHAT_FOR_ME,
    centralizedAuthentication,
    authorization(['user']),
    chatController.deleteChatForMe.bind(chatController)
  );
  chatRouter.get(
    ChatApiRoutes.GET_NEW_UNREAD_CONVERSATIONS_COUNT,
    centralizedAuthentication,
    authorization(['user']),
    chatController.getNewUnreadConversationsCount.bind(chatController)
  );

  return chatRouter;
}

export default createChatRouter;
