// src/components/ShareButtons.tsx
import React from "react";

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
      {/* Twitter (X) */}
      <button
        onClick={() => handleShare("twitter")}
        className="hover:scale-110 transition"
        title="Share on X"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2H21.5l-7.57 8.63L23 22h-6.84l-5.37-6.77L5.64 22H2.39l8.08-9.2L1 2h7.08l4.78 6.18L18.24 2zM17 20h1.82L7.05 4H5.1L17 20z" />
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={() => handleShare("facebook")}
        className="hover:scale-110 transition text-blue-600"
        title="Share on Facebook"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.12 8.44 9.88v-6.99H8.1V12h2.34V9.79c0-2.31 1.37-3.59 3.47-3.59.99 0 2.03.18 2.03.18v2.24h-1.14c-1.13 0-1.48.7-1.48 1.42V12h2.52l-.4 2.89h-2.12v6.99C18.34 21.12 22 17 22 12z" />
        </svg>
      </button>

      {/* WhatsApp (inline SVG) */}
      <button
        onClick={() => handleShare("whatsapp")}
        className="hover:scale-110 transition text-green-500"
        title="Share on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16.002 3C9.374 3 4 8.375 4 15c0 2.65.85 5.063 2.282 7.04L4 29l7.125-2.24C12.07 27.59 13.977 28 16.002 28 22.628 28 28 22.625 28 16S22.628 3 16.002 3zm0 22c-1.707 0-3.318-.44-4.72-1.212l-.338-.19-4.252 1.338 1.391-4.093-.222-.353C6.822 19.012 6 17.084 6 15c0-5.514 4.486-10 10.002-10 5.514 0 10 4.486 10 10s-4.486 10-10 10zm5.307-7.73c-.293-.147-1.732-.854-2.002-.95-.27-.098-.465-.146-.662.146-.195.293-.76.95-.932 1.146-.172.195-.344.22-.637.073-.293-.147-1.236-.455-2.356-1.448-.87-.777-1.46-1.732-1.633-2.026-.172-.293-.018-.451.13-.598.133-.132.293-.343.44-.514.147-.172.195-.293.293-.489.098-.195.049-.366-.024-.513-.073-.147-.662-1.6-.906-2.191-.238-.57-.48-.493-.662-.503-.172-.009-.367-.011-.562-.011s-.513.073-.781.366c-.27.293-1.025 1-1.025 2.438s1.049 2.83 1.193 3.027c.146.195 2.066 3.165 5.006 4.438.7.302 1.248.482 1.673.617.703.224 1.344.192 1.85.116.565-.084 1.732-.707 1.977-1.388.244-.682.244-1.268.17-1.388-.073-.122-.268-.195-.562-.342z" />
        </svg>
      </button>

      {/* LinkedIn */}
      <button
        onClick={() => handleShare("linkedin")}
        className="hover:scale-110 transition text-blue-700"
        title="Share on LinkedIn"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14C2.238 0 0 2.238 0 5v14c0 2.762 2.238 5 5 5h14c2.761 0 5-2.238 5-5V5c0-2.762-2.239-5-5-5zM7.5 20H4.5V9h3v11zM6 7.432c-.966 0-1.75-.786-1.75-1.752S5.034 3.93 6 3.93c.966 0 1.75.787 1.75 1.75S6.966 7.432 6 7.432zM20 20h-3v-5.604c0-1.336-.027-3.059-1.863-3.059-1.865 0-2.151 1.457-2.151 2.961V20h-3V9h2.881v1.507h.041c.401-.76 1.379-1.561 2.84-1.561 3.04 0 3.6 2.002 3.6 4.604V20z" />
        </svg>
      </button>
    </div>
  );
};

export default ShareButtons;
