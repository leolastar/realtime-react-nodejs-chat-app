import { Router } from "express";
const {
  createConversation,
  deleteConversation,
  getUserConversations,
} = require("../controllers/conversationController");

const conversationRouter = Router();

conversationRouter.post("/conversation", createConversation);
conversationRouter.delete("/conversation/:id", deleteConversation);
conversationRouter.get("/conversations/:id", getUserConversations);

module.exports = conversationRouter;
