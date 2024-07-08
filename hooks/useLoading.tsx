import { useEffect, useState } from "react";

import Loading from "@/components/primitives/Loading";

export type SetContentStateAction = React.Dispatch<React.SetStateAction<React.ReactNode>>;
type LoadContentCallback = (setContent: SetContentStateAction) => void;

export default function useLoading(callback: LoadContentCallback) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<React.ReactNode>(<Loading />);

  // load asynchronously
  useEffect(() => {
    // prevents calling the callback multiple times
    if (loading) {
      setLoading(false);
      callback(setContent);
    }
  }, [loading, callback, content]);

  return content;
}
