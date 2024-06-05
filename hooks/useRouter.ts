import { router } from "expo-router";

export function useRouter(): void {
  if (router.canGoBack()) {
    router.back()
  } else {
    // go back to the home page
    router.navigate("../")
  }
}

