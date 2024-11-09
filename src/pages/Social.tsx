// import React from 'react';

// const Social: React.FC = () => {
//   const socialTopics = [
//     { title: 'Social Media Trends', description: 'The latest in social media...', imageUrl: '/images/social-media.jpeg' },
//     { title: 'Influencers', description: 'Top influencers to follow this year...', imageUrl: '/images/influencers.jpeg' },
//     // Add more social topics...
//   ];

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Social</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {socialTopics.map((topic, index) => (
//           <div key={index} className="border rounded-lg p-4 shadow-lg">
//             <img src={topic.imageUrl} alt={topic.title} className="h-40 w-full object-cover rounded-lg" />
//             <h2 className="text-lg font-semibold mt-2">{topic.title}</h2>
//             <p>{topic.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Social;
//src/pages/Social.tsx
import React from 'react';
import Card from '../components/Card';
import Carousel from '../components/Carousel';


const socialTrendies = [
    {
        title: 'Rise of Short-form Videos',
        description: 'Short-form videos are taking over, with platforms like TikTok, Instagram Reels, and YouTube Shorts dominating content consumption.',
        imageUrl: '/images/short-form-videos.jpeg'
    },
    {
        title: 'AI-driven Content Creation',
        description: 'Creators are increasingly using AI tools to generate content, from captions and graphics to even fully automated videos.',
        imageUrl: '/images/ai-content.jpg'
    },
    {
        title: 'Social Commerce Growth',
        description: 'Shopping on social media is expanding, with Instagram and TikTok launching integrated shopping experiences for users.',
        imageUrl: '/images/social-commerce.jpg'
    },
    {
        title: 'Authenticity in Influencer Marketing',
        description: 'Audiences crave authentic connections, pushing influencers to share more raw and unfiltered moments.',
        imageUrl: '/images/authentic-influencers.jpg'
    },
    {
        title: 'Augmented Reality (AR) Engagement',
        description: 'AR filters and virtual try-ons are becoming increasingly popular for interactive, engaging social media experiences.',
        imageUrl: '/images/ar-engagement.jpg'
    },
    {
        title: 'Sustainable Influencer Campaigns',
        description: 'Brands and influencers alike are focusing on sustainable and eco-friendly campaigns as audiences become more environmentally conscious.',
        imageUrl: '/images/sustainability-campaign.jpg'
    }
];

const topInfluencer = [
    {
        title: 'Emma Chamberlain',
        description: 'Known for her authenticity and relatable content, Emma remains a top influencer in 2024 with a loyal Gen Z audience.',
        imageUrl: '/images/emma-chamberlain.jpg'
    },
    {
        title: 'Khaby Lame',
        description: 'With his unique brand of silent comedy, Khaby Lame has risen as a top influencer on TikTok and beyond.',
        imageUrl: '/images/khaby-lame.jpg'
    },
    {
        title: 'MrBeast',
        description: 'MrBeast continues to be a leader in the world of YouTube, known for his grand-scale challenges and philanthropy.',
        imageUrl: '/images/mrbeast.jpg'
    },
    {
        title: 'Charli D’Amelio',
        description: 'A powerhouse on TikTok, Charli’s dance videos and collaborations make her one of the most-followed influencers.',
        imageUrl: '/images/charli-damelio.jpg'
    },
    {
        title: 'Addison Rae',
        description: 'Another TikTok star, Addison Rae has expanded her influence into music and acting, keeping her presence strong.',
        imageUrl: '/images/addison-rae.jpg'
    },
    {
        title: 'Mark Rober',
        description: 'A former NASA engineer turned YouTuber, Mark inspires millions with his educational yet entertaining science videos.',
        imageUrl: '/images/mark-rober.jpg'
    }
];

const Social: React.FC = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-green">Top Influencers</h1>
        <p>Top influencers to follow this year...</p>
      <Carousel items={topInfluencer} />
  
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-10">Social Media Trends</h2>
      <p>The latest in social media...</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialTrendies.map((article, index) => (
          <Card key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} />
        ))}
      </div>
    </div>
  );
  export default Social;