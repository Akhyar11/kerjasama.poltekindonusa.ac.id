// Server Component — fetches settings on the server (no CORS issues)
import { fetchAPI } from "@/lib/api";
import { Settings, StudyProgram } from "@/lib/types";
import FooterClient from "./FooterClient";

async function getSettings(): Promise<Settings> {
  try {
    const data = await fetchAPI<Settings>("/settings");
    return data ?? {};
  } catch {
    return {};
  }
}

async function getPrograms(): Promise<StudyProgram[]> {
  try {
    return await fetchAPI<StudyProgram[]>("/study-programs");
  } catch {
    return [];
  }
}

export default async function Footer() {
  const settings = await getSettings();
  const programs = await getPrograms();
  return <FooterClient settings={settings} programs={programs} />;
}
