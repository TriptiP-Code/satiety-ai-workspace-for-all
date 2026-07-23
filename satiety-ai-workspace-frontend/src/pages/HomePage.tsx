import { useOutletContext } from "react-router-dom";
import ChatWindow from "../components/chat/ChatWindow";
import type { Conversation } from "../types/conversation";

interface OutletContext {
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

function HomePage() {
  const context = useOutletContext<OutletContext>();

  return (
    <div className="flex h-full w-full overflow-hidden">
  <ChatWindow
    activeConversation={context.activeConversation}
    conversations={context.conversations}
    setConversations={context.setConversations}
    isLoading={context.isLoading}
    setIsLoading={context.setIsLoading}
  />
  </div>
);
}

export default HomePage;