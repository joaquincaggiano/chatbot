"use server";

import { prisma } from "@prisma/db";

export const createChat = async (userId: string) => {
  try {
    const chat = await prisma.chat.create({
      data: {
        userId: userId,
      },
    });
    return { id: chat.id };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create chat");
  }
};

export const getChats = async (id: string) => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId: id,
      },
    });
    return chats;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch chats");
  }
};

export const getChat = async (chatId: string) => {
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        messages: true,
      },
    });

    if (!chat) {
      throw new Error("Chat not found");
    }

    return chat;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch chat");
  }
};
