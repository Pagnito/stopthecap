import React, { createRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { connect } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination, Mousewheel } from "swiper";

function ProductCarousel({ options, selected, selectVariant, primaryOptionIndex }) {
  let nextBtn = createRef();
  let [swiperHolder, setSwiper] = useState(null);
  let primaryOptionValues = options.map((variant) => variant.node.selectedOptions[primaryOptionIndex].value);

  let selectedVariant = {
    name: selected.selectedOptions[primaryOptionIndex].name,
    value: selected.selectedOptions[primaryOptionIndex].value 
  };


  useEffect(()=>{
    let valueIndex = primaryOptionValues.indexOf(selected.selectedOptions[primaryOptionIndex].value);
    swiperHolder && swiperHolder.slideTo(valueIndex+1);
  }, [swiperHolder, selected.selectedOptions[primaryOptionIndex].value, primaryOptionIndex, primaryOptionValues, selected.selectedOptions]);

  function selectCarouselOption(swiper) {
    let index = swiper.activeIndex > primaryOptionValues.length ? 1 : swiper.activeIndex < 1 ? primaryOptionValues.length : swiper.activeIndex;
    let primaryOptionValue = primaryOptionValues[index - 1];
    selectedVariant.value = primaryOptionValue.toLowerCase();
    selectVariant.carouselIndex = index - 1;
    selectVariant(selectedVariant);
  }
  let images = options.map((variant, i) => {
    return (
      <SwiperSlide key={`slide-${i}`}>
        <Image src={variant.node.image.originalSrc} alt={variant.node.image.altText} layout="fill" objectFit="contain" />
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
    selected: state.products.productPage.selectedVariant
  };
}
export default connect(stateToProps, null)(ProductCarousel);
