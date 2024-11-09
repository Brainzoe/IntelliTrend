// // src/components/Carousel.tsx
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// const Carousel: React.FC = () => {
//   return (
//     <div className="carousel-container">
//       <Swiper
//         pagination={{ clickable: true }}
//         navigation
//         modules={[Pagination, Navigation]}
//         className="h-64"
//       >
//         {/* Example slides */}
//         <SwiperSlide>
//           <div className="slide-content">Slide 1 Content</div>
//         </SwiperSlide>
//         <SwiperSlide>
//           <div className="slide-content">Slide 2 Content</div>
//         </SwiperSlide>
//         <SwiperSlide>
//           <div className="slide-content">Slide 3 Content</div>
//         </SwiperSlide>
//         {/* Add more SwiperSlides as needed */}
//       </Swiper>
//     </div>
//   );
// };

// export default Carousel;
// src/components/Carousel.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

interface CarouselProps {
  items: { title: string; description: string; imageUrl: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => (
  <Swiper
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
    className="h-64 rounded-lg overflow-hidden"
  >
    {items.map((item, index) => (
      <SwiperSlide key={index} className="flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${item.imageUrl})` }}>
        <div className="bg-black bg-opacity-50 p-4 text-white text-center">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm">{item.description}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default Carousel;
