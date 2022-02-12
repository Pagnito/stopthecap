import React, {createRef, useState} from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { connect } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination, Mousewheel } from "swiper";

function ProductCarousel({ primaryOptionIndex, primaryOption, variants, selected, selectVariant }) {
  let nextBtn = createRef();
  let [swiperHolder, setSwiper] = useState(null);
  let primaryOptions = Object.keys(variants);
  let selectedVariant = {
    name: primaryOption,
    value: selected.selectedOptions[primaryOptionIndex].value,
  };
  
  function selectCarouselOption(swiper) {
    let index = swiper.activeIndex > primaryOptions.length ? 1 : swiper.activeIndex < 1 ? primaryOptions.length : swiper.activeIndex;
    let primaryOption = primaryOptions[index - 1];
    selectedVariant.value = primaryOption.toLowerCase();
    selectVariant(selectedVariant);
  }
  let images = primaryOptions.map((variant, i) => {
    return (
      <SwiperSlide key={`slide-${i}`}>
        <Image
          src={variants[variant].image.originalSrc}
          alt={variants[variant].image.altText}
          layout="fill"
          objectFit="contain"
        />
      </SwiperSlide>
    );
  });
  SwiperCore.use([Navigation, Pagination, Mousewheel]);

  return (
    <div className="h-full w-full">
      <Swiper
        mousewheel
        onScroll={(swiper) => selectCarouselOption(swiper)}
        onInit={(swiper) => {
          swiper.params.navigation.nextEl = nextBtn.current;
          swiper.navigation.init();
          swiper.navigation.update();
          setSwiper(swiper);
        }}
        style={{
          "--swiper-navigation-color": "#EF4444",
          "--swiper-pagination-color": "#EF4444",
          height: "100%",
          width: "100%",
        }}
        pagination={{ clickable: true }}
        loop="true"
      >
        {images}
      </Swiper>
    </div>
  );
}
function stateToProps(state) {
  return {
    selected: state.products.pdp.selectedVariant,
  };
}
export default connect(stateToProps, null)(ProductCarousel);
