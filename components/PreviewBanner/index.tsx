'use client';

import { useEffect, useState } from 'react';

export default function PreviewBanner() {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setIsPreview(document.cookie.includes('__next_preview_data'));
  }, []);

  if (!isPreview) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-400 text-black text-center py-2 z-50">
      <strong>Preview Mode:</strong> You are viewing unpublished content.
      <a href="/api/exit-preview" className="ml-4 underline">
        Exit Preview
      </a>
    </div>
  );
}
