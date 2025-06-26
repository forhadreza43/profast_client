import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slide1 from "../../../assets/banner/banner1.png";
import slide2 from "../../../assets/banner/banner2.png";
import slide3 from "../../../assets/banner/banner3.png";
const Banner = () => {
  return (
    <div className="">
      <Swiper
        pagination={{ clickable: true }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        // navigation={true}
        className="mySwiper rounded-3xl overflow-hidden"
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          {
            <div className="rounded-3xl overflow-hidden h-full">
              <img src={slide1} alt="" className="w-full h-full object-cover" />
            </div>
          }
        </SwiperSlide>
        <SwiperSlide>
          {
            <div className="rounded-3xl overflow-hidden h-full">
              <img src={slide2} alt="" className="w-full h-full object-cover" />
            </div>
          }
        </SwiperSlide>
        <SwiperSlide>
          {
            <div className="rounded-3xl overflow-hidden h-full">
              <img src={slide3} alt="" className="w-full h-full object-cover" />
            </div>
          }
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
