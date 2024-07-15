import _ from "lodash";
import React from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// @ts-ignore
import Slider from "react-slick/lib/slider";
import TestimonialItem from "./testimonial-item";

const Testimonials = ({ data }: { data: any }) => {
  const customSlider = React.useRef() as any;
  const gotoNext = () => {
    customSlider.current.slickNext();
  };

  const gotoPrev = () => {
    customSlider.current.slickPrev();
  };
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="testimonial-section py-16 md:py-20 lg:py-24 bg-light">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-themePrimary font-bold text-xs leading-none mb-1">
            Our Reviews
          </p>
          <h2 className="text-xl font-bold text-black">
            What Our Customer Saying
          </h2>
        </div>

        <div className="relative">
          {data?.length > 3 ? (
            <>
              <div className="absolute top-1/3 -translate-y-1/2 w-full z-10">
                <button
                  onClick={() => gotoPrev()}
                  className="2xl:-left-10 -left-3 top-7 absolute rounded-full flex justify-center items-center hover:bg-themePrimary h-10 w-10 bg-gray hover:text-white p-1"
                >
                  <BiLeftArrowAlt className="w-6 h-6" />
                </button>
                <button
                  onClick={() => gotoNext()}
                  className="2xl:-right-10 -right-3 top-7 absolute rounded-full flex justify-center items-center hover:bg-themePrimary h-10 w-10 bg-gray hover:text-white p-1"
                >
                  <BiRightArrowAlt className="w-6 h-6" />
                </button>
              </div>
              <Slider {...settings} ref={customSlider}>
                {_.map(data, (item: any, index: any) => (
                  <div key={index}>
                    <TestimonialItem data={item} />
                  </div>
                ))}
              </Slider>
            </>
          ) : (
            <div className="flex flex-wrap justify-center">
              {_.map(data, (item, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/3">
                  <TestimonialItem data={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
