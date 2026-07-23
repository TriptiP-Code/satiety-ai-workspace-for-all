import { supabaseAdmin } from "../config/supabase";

export async function getUserWorkspaces(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("workspaces")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}

export async function createWorkspace(
  userId: string,
  name: string
) {
  const { data, error } = await supabaseAdmin
    .from("workspaces")
    .insert({
      user_id: userId,
      name,
      is_system: false,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function renameWorkspace(
  id: string,
  name: string
) {
  const { data, error } = await supabaseAdmin
    .from("workspaces")
    .update({
      name,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteWorkspace(id: string) {
  const { error } = await supabaseAdmin
    .from("workspaces")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}