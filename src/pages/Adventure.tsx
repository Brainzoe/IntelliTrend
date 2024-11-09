// import React from 'react';
// import Card from '../components/Card';
// import Carousel from '../components/Carousel';

// const adventurePlaces = [
//   { title: 'The Himalayas', description: 'An unforgettable trek through the Himalayas...', imageUrl: '/images/himalayas.jpg' },
//   { title: 'Amazon Rainforest', description: 'Explore the depths of the Amazon...', imageUrl: '/images/amazon.jpg' },
//   // more places...
// ];

// const adventureHighlights = [
//   { title: 'Top Adventures', description: 'Experience the thrill of nature’s wonders...', imageUrl: '/images/adventures.jpg' },
//   // more highlights...
// ];

// const Adventure: React.FC = () => (
//   <div className="p-8 bg-blue-900 text-white">
//     <h1 className="text-3xl font-bold text-center mb-8">Adventures Await</h1>

//     <Carousel items={adventureHighlights} />

//     <h2 className="text-2xl font-semibold mt-8 mb-4">Popular Destinations</h2>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {adventurePlaces.map((place, index) => (
//         <Card key={index} title={place.title} description={place.description} imageUrl={place.imageUrl} />
//       ))}
//     </div>
//   </div>
// );

// export default Adventure;


// src/pages/Adventure.tsx
import React from 'react';
import CardList from '../components/CardList'; // Assuming CardList is a reusable card component
import Carousel from '../components/Carousel'; // Assuming you have a Carousel component that handles image slides

const adventurePlaces = [
  { 
    title: 'The Himalayas', 
    description: 'An unforgettable trek through the rugged terrain of the Himalayas, with breathtaking views at every turn.', 
    imageUrl: '/images/himalayas.jpg' 
  },
  { 
    title: 'Amazon Rainforest', 
    description: 'Explore the depths of the Amazon, home to an incredible diversity of plants and wildlife.', 
    imageUrl: '/images/amazon.jpg' 
  },
  { 
    title: 'Grand Canyon', 
    description: 'Witness the sheer magnitude and beauty of the Grand Canyon, one of the world’s natural wonders.', 
    imageUrl: '/images/grand-canyon.jpg' 
  },
  { 
    title: 'Great Barrier Reef', 
    description: 'Dive into the vibrant marine ecosystem of the Great Barrier Reef in Australia.', 
    imageUrl: '/images/great-barrier-reef.jpg' 
  },
  { 
    title: 'Serengeti National Park', 
    description: 'Experience the iconic African safari in Tanzania’s Serengeti National Park, home to diverse wildlife.', 
    imageUrl: '/images/serengeti.jpg' 
  },
  { 
    title: 'Iceland’s Volcanoes', 
    description: 'Explore the volcanic landscapes of Iceland, with its geysers, hot springs, and active volcanoes.', 
    imageUrl: '/images/iceland-volcanoes.jpg' 
  },
  { 
    title: 'Antarctica', 
    description: 'Embark on an icy adventure in Antarctica, exploring glaciers, penguin colonies, and icebergs.', 
    imageUrl: '/images/antarctica.jpg' 
  },
  { 
    title: 'Patagonia', 
    description: 'Hike through Patagonia’s dramatic landscapes, including towering mountains and pristine lakes.', 
    imageUrl: '/images/patagonia.jpg' 
  },
  { 
    title: 'Swiss Alps', 
    description: 'Ski, hike, or simply admire the beauty of the Swiss Alps, with their snow-capped peaks and scenic valleys.', 
    imageUrl: '/images/swiss-alps.jpg' 
  },
  { 
    title: 'Galápagos Islands', 
    description: 'Encounter unique species and stunning beaches on the Galápagos Islands, a natural paradise.', 
    imageUrl: '/images/galapagos.jpg' 
  }
];


const adventureHighlights = [
  { 
    title: 'Top Adventures', 
    description: 'Experience the thrill of nature’s wonders across exotic landscapes.', 
    imageUrl: '/images/adventures.jpg' 
  },
  { 
    title: 'Exploring the Sahara Desert', 
    description: 'Journey across the vast sands of the Sahara, where endless dunes meet the horizon.', 
    imageUrl: '/images/sahara.jpg' 
  },
  { 
    title: 'Diving in the Great Barrier Reef', 
    description: 'Discover vibrant marine life and stunning coral reefs in Australia’s natural wonder.', 
    imageUrl: '/images/great-barrier-reef.jpg' 
  },
  { 
    title: 'Trekking the Amazon Rainforest', 
    description: 'Immerse yourself in the dense jungles of the Amazon and uncover its rich biodiversity.', 
    imageUrl: '/images/amazon-rainforest.jpg' 
  },
  { 
    title: 'Scaling Mount Kilimanjaro', 
    description: 'Embark on an unforgettable climb up Africa’s tallest peak.', 
    imageUrl: '/images/kilimanjaro.jpg' 
  },
  { 
    title: 'Safari in the Serengeti', 
    description: 'Experience Africa’s wildlife up close on a thrilling safari adventure.', 
    imageUrl: '/images/serengeti.jpg' 
  },
  { 
    title: 'Kayaking in the Norwegian Fjords', 
    description: 'Paddle through breathtaking fjords and witness Norway’s stunning natural beauty.', 
    imageUrl: '/images/norwegian-fjords.jpg' 
  },
  { 
    title: 'Hiking the Inca Trail to Machu Picchu', 
    description: 'Follow the ancient Inca Trail and arrive at the awe-inspiring ruins of Machu Picchu.', 
    imageUrl: '/images/inca-trail.jpg' 
  },
  { 
    title: 'Camping under the Northern Lights in Iceland', 
    description: 'Spend a night under the magical auroras in the Icelandic wilderness.', 
    imageUrl: '/images/northern-lights.jpg' 
  },
  { 
    title: 'Exploring the Caves of Cappadocia', 
    description: 'Wander through the unique cave landscapes and rock formations of Cappadocia, Turkey.', 
    imageUrl: '/images/cappadocia-caves.jpg' 
  }

  //Add more Highlights
];


const Adventure: React.FC = () => (
  <div className="px-4 md:px-16 lg:px-24 py-8 bg-gray-100">
    {/* Highlights Carousel */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Adventure Highlights</h2>
      <Carousel items={adventureHighlights} />
    </section>

    {/* Adventure Places Grid */}
    <section>
      <h2 className="text-2xl font-semibold text-center mb-4">Adventure Places</h2>
      <CardList items={adventurePlaces} />
    </section>
  </div>
);

export default Adventure;
