import React from 'react';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

const technologyArticles = [
  { 
    title: 'AI in 2024', 
    description: 'The future of AI is here with groundbreaking advancements in natural language processing and machine learning.', 
    imageUrl: '/images/ai-2024.jpg' 
  },
  { 
    title: 'Quantum Computing', 
    description: 'Exploring the potential of quantum technologies to solve problems beyond the reach of classical computers.', 
    imageUrl: '/images/quantum.jpg' 
  },
  { 
    title: 'The Rise of Edge Computing', 
    description: 'Edge computing is transforming how data is processed, analyzed, and acted upon in real-time.', 
    imageUrl: '/images/edge-computing.jpg' 
  },
  { 
    title: 'Cybersecurity in a Digital World', 
    description: 'As cyber threats evolve, organizations must implement advanced security measures to protect their data.', 
    imageUrl: '/images/cybersecurity.jpg' 
  },
  { 
    title: 'The Impact of 5G on IoT', 
    description: '5G technology is revolutionizing the Internet of Things (IoT) by enabling faster and more reliable connectivity.', 
    imageUrl: '/images/5g-iot.jpg' 
  },
  { 
    title: 'Blockchain Beyond Cryptocurrency', 
    description: 'Discover how blockchain technology is being utilized in supply chain management, healthcare, and more.', 
    imageUrl: '/images/blockchain-applications.jpg' 
  },
  { 
    title: 'Sustainable Tech Innovations', 
    description: 'Exploring the role of technology in promoting sustainability and combating climate change.', 
    imageUrl: '/images/sustainable-tech.jpg' 
  },
  { 
    title: 'Augmented Reality in Retail', 
    description: 'How augmented reality is enhancing the shopping experience and reshaping the retail landscape.', 
    imageUrl: '/images/ar-retail.jpg' 
  },
  { 
    title: 'The Future of Work: Remote and Hybrid Models', 
    description: 'Analyzing the shift towards remote and hybrid work models and their implications for businesses and employees.', 
    imageUrl: '/images/future-of-work.jpg' 
  },
  { 
    title: 'Smart Cities: Technology for Urban Living', 
    description: 'How smart technology is improving urban living through enhanced infrastructure and services.', 
    imageUrl: '/images/smart-cities.jpg' 
  }

  // Add more articules
];


const technologyHighlights = [
  {
    title: 'Top Tech Trends',
    description: 'Discover the latest trends that are shaping the future...',
    imageUrl: '/images/trends.jpg',
  },
  {
    title: 'Artificial Intelligence & Machine Learning',
    description: 'AI and ML continue to revolutionize industries from healthcare to finance by automating complex processes.',
    imageUrl: '/images/ai.jpg',
  },
  {
    title: 'Quantum Computing',
    description: 'Quantum computing is pushing the boundaries of data processing, allowing for faster computations than ever.',
    imageUrl: '/images/quantum.jpg',
  },
  {
    title: '5G Connectivity',
    description: '5G networks are paving the way for faster internet speeds and more reliable connectivity for IoT devices.',
    imageUrl: '/images/5g.jpg',
  },
  {
    title: 'Blockchain for Decentralized Finance',
    description: 'Blockchain technology is enabling new financial solutions through decentralized finance (DeFi) platforms.',
    imageUrl: '/images/blockchain.jpg',
  },
  {
    title: 'Augmented Reality (AR) and Virtual Reality (VR)',
    description: 'AR and VR technologies are transforming fields from gaming to remote work and education by creating immersive experiences.',
    imageUrl: '/images/arvr.jpg',
  },
];


const Technology: React.FC = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-center mb-8 text-white">Latest in Technology</h1>

    <Carousel items={technologyHighlights} />

    <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-100">Featured Articles</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {technologyArticles.map((article, index) => (
        <Card key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} />
      ))}
    </div>
  </div>
);

export default Technology;
