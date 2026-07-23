import { useEffect, useState } from "react";

import type { Message } from "../../types/chat";
import type { Conversation } from "../../types/conversation";

import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import WelcomeSection from "./WelcomeSection";

import { sendMessage } from "../../services/chatApi";
import { updateConversationApi } from "../../services/conversationApi";
import {
  createMessageApi,
  getMessagesApi,
} from "../../services/messageApi";

interface ChatWindowProps {
  activeConversation?: Conversation;
  conversations: Conversation[];
  setConversations: React.Dispatch<
    React.SetStateAction<Conversation[]>
  >;
  isLoading: boolean;
  setIsLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function toMessage(message: any): Message {
  return {
    id: message.id,
    role: message.role === "assistant" ? "assistant" : "user",
    content: message.content,
  };
}

function ChatWindow({
  activeConversation,
  setConversations,
  isLoading,
  setIsLoading,
}: ChatWindowProps) {
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const activeConversationId = activeConversation?.id;

  useEffect(() => {
    const conversationId = activeConversationId;

    if (!conversationId) return;

    let cancelled = false;

    async function loadMessages() {
      setIsHistoryLoading(true);

      try {
        const data = await getMessagesApi(conversationId!);

        if (cancelled) return;

        setConversations((previous) =>
          previous.map((conversation) =>
            conversation.id === conversationId
              ? {
                  ...conversation,
                  messages: data.map(toMessage),
                }
              : conversation
          )
        );
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setIsHistoryLoading(false);
        }
      }
    }

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [activeConversationId, setConversations]);

  async function handleSendMessage(content: string) {
    if (!activeConversation || isHistoryLoading) return;

    const shouldGenerateTitle =
      activeConversation.messages.length === 0 &&
      activeConversation.title === "New Chat";
    const generatedTitle =
      content.length > 40
        ? `${content.slice(0, 40)}...`
        : content;

    setIsLoading(true);

    try {
      const savedUserMessage = toMessage(
        await createMessageApi(
          activeConversation.id,
          "user",
          content
        )
      );

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === activeConversation.id
            ? {
                ...conversation,
                messages: [...conversation.messages, savedUserMessage],
              }
            : conversation
        )
      );

      if (shouldGenerateTitle) {
        try {
          const updatedConversation = await updateConversationApi(
            activeConversation.id,
            { title: generatedTitle }
          );

          setConversations((previous) =>
            previous.map((conversation) =>
              conversation.id === activeConversation.id
                ? {
                    ...conversation,
                    title: updatedConversation.title,
                  }
                : conversation
            )
          );
        } catch (error) {
          // A title failure should not prevent the saved message from
          // receiving an AI response.
          console.error("Unable to update conversation title", error);
        }
      }

      const data = await sendMessage([
        ...activeConversation.messages,
        savedUserMessage,
      ]);

      const savedAssistantMessage = toMessage(
        await createMessageApi(
          activeConversation.id,
          "assistant",
          data.reply
        )
      );

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === activeConversation.id
            ? {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  savedAssistantMessage,
                ],
              }
            : conversation
        )
      );
    } catch (error) {
      console.error(error);

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting Satiety.";

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `⚠️ ${message}`,
      };

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === activeConversation.id
            ? {
                ...conversation,
                messages: [...conversation.messages, errorMessage],
              }
            : conversation
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (!activeConversation) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {isHistoryLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Loading conversation...
          </div>
        ) : activeConversation.messages.length === 0 ? (
          <WelcomeSection />
        ) : (
          <MessageList
            messages={activeConversation.messages}
            isLoading={isLoading}
          />
        )}
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading || isHistoryLoading}
      />
    </div>
  );
}

export default ChatWindow;
