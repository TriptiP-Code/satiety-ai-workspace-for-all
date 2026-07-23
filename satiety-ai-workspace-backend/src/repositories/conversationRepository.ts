import { supabaseAdmin } from "../config/supabase";

async function assertWorkspaceOwnership(
  workspaceId: string,
  userId: string
) {
  const { data, error } = await supabaseAdmin
    .from("workspaces")
    .select("id")
    .eq("id", workspaceId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error("Workspace not found");
  }
}

async function getOwnedConversation(
  id: string,
  userId: string
) {
  const { data, error } = await supabaseAdmin
    .from("conversations")
    .select("id, workspace_id")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error("Conversation not found");
  }

  await assertWorkspaceOwnership(data.workspace_id, userId);

  return data;
}

export async function getWorkspaceConversations(
  workspaceId: string,
  userId: string
) {
  await assertWorkspaceOwnership(workspaceId, userId);

  const { data, error } = await supabaseAdmin
    .from("conversations")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("updated_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function createConversation(
  workspaceId: string,
  title: string,
  userId: string
) {
  await assertWorkspaceOwnership(workspaceId, userId);

  const { data, error } = await supabaseAdmin
    .from("conversations")
    .insert({
      workspace_id: workspaceId,
      title,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function renameConversation(
  id: string,
  userId: string,
  updates: {
    title?: string;
    workspaceId?: string;
  }
) {
  await getOwnedConversation(id, userId);

  if (updates.workspaceId) {
    await assertWorkspaceOwnership(updates.workspaceId, userId);
  }

  const updateData: {
    title?: string;
    workspace_id?: string;
  } = {};

  if (updates.title) updateData.title = updates.title;
  if (updates.workspaceId) updateData.workspace_id = updates.workspaceId;

  const { data, error } = await supabaseAdmin
    .from("conversations")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteConversation(id: string, userId: string) {
  await getOwnedConversation(id, userId);

  const { error } = await supabaseAdmin
    .from("conversations")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}
