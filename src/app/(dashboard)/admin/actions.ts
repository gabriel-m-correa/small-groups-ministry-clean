"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  addJourneyNoteInDb,
  assignGroupInDb,
  completeTaskInDb,
  updateJourneyStatusInDb
} from "@/lib/data";
import type { JourneyStatus } from "@/lib/types";

export async function updateJourneyStatus(formData: FormData) {
  const journeyId = String(formData.get("journeyId") ?? "");
  const status = String(formData.get("status") ?? "") as JourneyStatus;
  const returnPath = String(formData.get("returnPath") ?? "/admin/people");

  if (!journeyId || !status) {
    return;
  }

  await updateJourneyStatusInDb(journeyId, status);
  revalidatePath("/admin");
  revalidatePath("/admin/people");
  revalidatePath(`/admin/people/${journeyId}`);
  revalidatePath("/admin/leaders");
  revalidatePath(returnPath);
}

export async function addJourneyNote(formData: FormData) {
  const journeyId = String(formData.get("journeyId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  const returnPath = String(formData.get("returnPath") ?? "/admin/people");

  if (!journeyId || !body) {
    return;
  }

  await addJourneyNoteInDb(journeyId, body);
  revalidatePath(`/admin/people/${journeyId}`);
  revalidatePath(returnPath);
}

export async function completeTask(formData: FormData) {
  const taskId = String(formData.get("taskId") ?? "");
  const returnPath = String(formData.get("returnPath") ?? "/admin");

  if (!taskId) {
    return;
  }

  await completeTaskInDb(taskId);
  revalidatePath("/admin");
  revalidatePath("/admin/tasks");
  revalidatePath("/admin/people");
  revalidatePath(returnPath);
}

export async function assignGroup(formData: FormData) {
  const journeyId = String(formData.get("journeyId") ?? "");
  const groupId = String(formData.get("groupId") ?? "");
  const assignmentType = String(formData.get("assignmentType") ?? "") as
    | "member"
    | "shadow_leader";
  const returnPath = String(formData.get("returnPath") ?? "/admin/people");

  if (!journeyId || !groupId || !assignmentType) {
    return;
  }

  await assignGroupInDb(journeyId, groupId, assignmentType);
  revalidatePath("/admin");
  revalidatePath("/admin/groups");
  revalidatePath("/admin/people");
  revalidatePath("/admin/leaders");
  revalidatePath(`/admin/people/${journeyId}`);
  revalidatePath(returnPath);
}

export async function signOutAdmin() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}
