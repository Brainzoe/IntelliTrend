// src/components/ShareButtons.tsx
// src/components/ShareButtons.tsx
import React from "react";

interface Props {
  postId: string;
  title: string;
}

const ShareButtons: React.FC<Props> = ({ postId, title }) => {
  const url = `${window.location.origin}/posts/${postId}`;

  const handleShare = (platform: "twitter" | "facebook") => {
    const shareUrl =
      platform === "twitter"
        ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="flex gap-2 mt-2">
      <button onClick={() => handleShare("twitter")} className="text-blue-400">
        Share on Twitter
      </button>
      <button onClick={() => handleShare("facebook")} className="text-blue-700">
        Share on Facebook
      </button>
    </div>
  );
};

export default ShareButtons;

