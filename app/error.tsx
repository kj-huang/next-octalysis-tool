"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to Sentry
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  );
}
