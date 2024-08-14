import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const sendMessage = async (req: Request, res: Response) => {
  console.log("Hello from send message")
  console.log(req.body)
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });
    // the very first  message is send ,thats why we create conversation
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in sendMessage", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  console.log("Hello from getMessages")
  console.log(req.user)
  try {
    const { id: userToChatId } = req.params;
    console.log(userToChatId)
    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (!conversation) {
      return res.status(200).json([]);
    }
    console.log("getmessages end here")
    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.log("Error in getMessage", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserForSidebar = async (req: Request, res: Response) => {
  console.log("start")
  try {
    const authUserId = req.user.id;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });
    console.log("hello")
    console.log(users);
    res.status(200).json(users);
  } catch (error: any) {
    console.log("Error in getUserForSidebar", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
