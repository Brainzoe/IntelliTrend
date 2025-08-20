// src/components/SocialShare.tsx
// src/components/SocialShare.tsx
import React from "react";
import { LinkIcon, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { toast } from "react-hot-toast";

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("🔗 Link copied to clipboard!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  return (
    <div className="flex gap-3 mt-4">
      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        <LinkIcon className="w-4 h-4" />
        <span className="text-sm">Copy Link</span>
      </button>

      {/* Twitter */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
      >
        <Twitter className="w-4 h-4 text-blue-500" />
        <span className="text-sm">Twitter</span>
      </a>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
      >
        <MessageCircle className="w-4 h-4 text-green-600" />
        <span className="text-sm">WhatsApp</span>
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
      >
        <Linkedin className="w-4 h-4 text-blue-700" />
        <span className="text-sm">LinkedIn</span>
      </a>
    </div>
  );
};

export default SocialShare;






























// src/components/SocialShare.tsx
// import React from 'react';
// import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaInstagram } from 'react-icons/fa';
// import twitterIcon from '../assets/FaTwitter.svg'; // Import Twitter icon as an image
// import './SocialShare.css';

// const SocialShare: React.FC = () => {
//   const shareUrl = window.location.href;

//   const handleShare = (platform: string) => {
//     let url = '';
//     switch (platform) {
//       case 'facebook':
//         url = `https://facebook.com/sharer/sharer.php?u=${shareUrl}`;
//         break;
//       case 'twitter':
//         url = `https://twitter.com/intent/tweet?url=${shareUrl}`;
//         break;
//       case 'linkedin':
//         url = `https://www.linkedin.com/shareArticle?url=${shareUrl}`;
//         break;
//       case 'whatsapp':
//         url = `https://api.whatsapp.com/send?text=${shareUrl}`;
//         break;
//       case 'instagram':
//         url = 'https://www.instagram.com';
//         break;
//       default:
//         break;
//     }
//     window.open(url, '_blank');
//   };

//   return (
//     <div className="social-share">
//       <h3>Share this post:</h3>
//       <div className="social-icons">
//         <button onClick={() => handleShare('facebook')}>
//           <FaFacebookF className="social-icon facebook" />
//         </button>
//         <button onClick={() => handleShare('twitter')}>
//           <img src={twitterIcon} alt="Twitter" className="social-icon twitter" /> {/* Twitter icon as an image */}
//         </button>
//         <button onClick={() => handleShare('linkedin')}>
//           <FaLinkedinIn className="social-icon linkedin" />
//         </button>
//         <button onClick={() => handleShare('whatsapp')}>
//           <FaWhatsapp className="social-icon whatsapp" />
//         </button>
//         <button onClick={() => handleShare('instagram')}>
//           <FaInstagram className="social-icon instagram" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SocialShare;
