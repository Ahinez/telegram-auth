import { retrieveRawInitData } from "@tma.js/sdk";
import type { AuthResponse } from "../types";

const API_URL = "https://6s1qnw1p-3000.inc1.devtunnels.ms";

export async function authenticateWithTelegram(): Promise<AuthResponse> {
  const initDataRaw = retrieveRawInitData();

  if (!initDataRaw) {
    return {
      success: false,
      error: "Unable to retrieve Telegram init data",
    };
  }

  try {
    const response = await fetch(`${API_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `tma ${initDataRaw}`,
      },
    });

    if (!response.ok) {
      console.log("Response body:", await response.text());
      return {
        success: false,
        error: `Authentication failed: ${response.statusText}`,
      };
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: `Authentication error: ${errorMessage}`,
    };
  }
}
