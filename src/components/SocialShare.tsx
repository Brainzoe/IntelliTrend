// src/components/SocialShare.tsx
import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import twitterIcon from '../assets/FaTwitter.svg'; // Import Twitter icon as an image
import './SocialShare.css';

const SocialShare: React.FC = () => {
  const shareUrl = window.location.href;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${shareUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?url=${shareUrl}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${shareUrl}`;
        break;
      case 'instagram':
        url = 'https://www.instagram.com';
        break;
      default:
        break;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="social-share">
      <h3>Share this post:</h3>
      <div className="social-icons">
        <button onClick={() => handleShare('facebook')}>
          <FaFacebookF className="social-icon facebook" />
        </button>
        <button onClick={() => handleShare('twitter')}>
          <img src={twitterIcon} alt="Twitter" className="social-icon twitter" /> {/* Twitter icon as an image */}
        </button>
        <button onClick={() => handleShare('linkedin')}>
          <FaLinkedinIn className="social-icon linkedin" />
        </button>
        <button onClick={() => handleShare('whatsapp')}>
          <FaWhatsapp className="social-icon whatsapp" />
        </button>
        <button onClick={() => handleShare('instagram')}>
          <FaInstagram className="social-icon instagram" />
        </button>
      </div>
    </div>
  );
};

export default SocialShare;
