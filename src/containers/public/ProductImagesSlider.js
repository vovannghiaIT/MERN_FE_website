import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Thumbs,
  Pagination,
  Scrollbar,
  A11y,
  FreeMode,
} from "swiper";
//Swiper
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/bundle";

import icons from "../../ultils/icons";

const ProductImagesSlider = ({ images }) => {
  const { AiOutlineHome, GrNext, GrPrevious } = icons;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={5}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images?.length > 0 &&
          images?.map((i, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={i} alt="img" className="object-cover" />
              </SwiperSlide>
            );
          })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={3}
        slidesPerView={images?.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          767: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          330: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          318: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        }}
        className="mySwiper"
      >
        {images?.length > 1 &&
          images?.map((i, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={i} alt="img" className="object-cover" />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default ProductImagesSlider;
