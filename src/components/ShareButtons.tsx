// src/components/ShareButtons.tsx
// src/components/ShareButtons.tsx
import React from "react";
import { Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";

interface Props {
  postId: string;
  title: string;
}

const ShareButtons: React.FC<Props> = ({ postId, title }) => {
  const url = `${window.location.origin}/posts/${postId}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleShare = (platform: "twitter" | "facebook" | "whatsapp" | "linkedin") => {
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="flex gap-3 mt-3">
      <button onClick={() => handleShare("twitter")} className="text-sky-500 hover:opacity-75">
        <Twitter size={22} />
      </button>
      <button onClick={() => handleShare("facebook")} className="text-blue-600 hover:opacity-75">
        <Facebook size={22} />
      </button>
      <button onClick={() => handleShare("whatsapp")} className="text-green-500 hover:opacity-75">
        <MessageCircle size={22} />
      </button>
      <button onClick={() => handleShare("linkedin")} className="text-blue-500 hover:opacity-75">
        <Linkedin size={22} />
      </button>
    </div>
  );
};

export default ShareButtons;
