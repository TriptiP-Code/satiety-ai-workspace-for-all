import { supabaseAdmin } from "../config/supabase";

async function assertConversationOwnership(
  conversationId: string,
  userId: string
) {
  const { data: conversation, error: conversationError } =
    await supabaseAdmin
      .from("conversations")
      .select("id, workspace_id")
      .eq("id", conversationId)
      .maybeSingle();

  if (conversationError) throw conversationError;

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const { data: workspace, error: workspaceError } =
    await supabaseAdmin
      .from("workspaces")
      .select("id")
      .eq("id", conversation.workspace_id)
      .eq("user_id", userId)
      .maybeSingle();

  if (workspaceError) throw workspaceError;

  if (!workspace) {
    throw new Error("Conversation not found");
  }
}

async function getOwnedMessage(id: string, userId: string) {
  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("id, conversation_id")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error("Message not found");
  }

  await assertConversationOwnership(data.conversation_id, userId);

  return data;
}

export async function getConversationMessages(
  conversationId: string,
  userId: string
) {
  await assertConversationOwnership(conversationId, userId);

  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}

export async function createMessage(
  conversationId: string,
  userId: string,
  role: "user" | "assistant",
  content: string
) {
  await assertConversationOwnership(conversationId, userId);

  const { data, error } = await supabaseAdmin
    .from("messages")
    .insert({
      conversation_id: conversationId,
      role,
      content,
    })
    .select()
    .single();

  if (error) throw error;

  const { error: touchError } = await supabaseAdmin
    .from("conversations")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  if (touchError) throw touchError;

  return data;
}

export async function deleteMessage(id: string, userId: string) {
  await getOwnedMessage(id, userId);

  const { error } = await supabaseAdmin
    .from("messages")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function deleteConversationMessages(
  conversationId: string,
  userId: string
) {
  await assertConversationOwnership(conversationId, userId);

  const { error } = await supabaseAdmin
    .from("messages")
    .delete()
    .eq("conversation_id", conversationId);

  if (error) throw error;
}
