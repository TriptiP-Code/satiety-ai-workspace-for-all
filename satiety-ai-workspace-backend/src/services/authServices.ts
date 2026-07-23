import {
  supabaseAdmin,
  supabaseAuth,
} from "../config/supabase";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  // Create the Auth user with the admin client.
  const { data, error } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
      },
    });

  if (error) {
    throw error;
  }

  const user = data.user;

  // Create the matching application profile.
  const { error: profileError } =
    await supabaseAdmin
      .from("user_profiles")
      .insert({
        id: user.id,
        name,
        email,
      });

  if (profileError) {
    throw profileError;
  }

  // Create the default workspace for the new user.
  const { error: workspaceError } =
    await supabaseAdmin
      .from("workspaces")
      .insert({
        user_id: user.id,
        name: "General",
        is_system: true,
      });

  if (workspaceError) {
    throw workspaceError;
  }

  // Return a real session so the new user is signed in immediately.
  // This uses the separate auth client and never changes supabaseAdmin.
  return loginUser(email, password);
}

export async function loginUser(
  email: string,
  password: string
) {
  // Never sign in with supabaseAdmin.
  const { data, error } =
    await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return {
    session: data.session,
    user: data.user,
  };
}
