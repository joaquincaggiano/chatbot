"use server";

import { prisma } from "@prisma/db";
import { revalidatePath } from "next/cache";

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

export const createChat = async (userId: string) => {
  try {
    const chat = await prisma.chat.create({
      data: {
        title: "New chat",
        userId: userId,
      },
    });

    revalidatePath(`/chat/${chat.id}`);
    return { id: chat.id };
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to create chat");
    }
  }
};

export const updateChatTitle = async (chatId: string, title: string) => {
  try {
    await prisma.chat.update({
      where: { id: chatId },
      data: { title },
    });

    revalidatePath(`/chat/${chatId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update chat title");
  }
};

export const deleteChat = async (chatId: string) => {
  try {
    await prisma.chat.delete({ where: { id: chatId } });

    return { status: "success" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete chat");
  }
};
