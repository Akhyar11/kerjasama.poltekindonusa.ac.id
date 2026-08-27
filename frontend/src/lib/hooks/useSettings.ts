"use client";

import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/api";
import { Settings } from "@/lib/types";

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchAPI<Settings>(`/settings?t=${Date.now()}`);
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Failed to load settings", error);
      }
    };
    loadSettings();
  }, []);

  return settings;
}
