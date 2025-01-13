import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from "next/link";
import Image from "next/image";

const MySlider = ({ items }) => {
    // Configure your slider settings
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 1,
      },
      mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 2,
        slidesToSlide: 1,
      },
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      // Check if we're on the client side
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 767); // Adjust this breakpoint as needed
      }
    }, []);

    return (
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
       // showDots={isMobile} // Show dots on mobile screen only
        infinite={true}
        partialVisible={false}
        autoPlaySpeed={2000}
        dotListClass="custom-dot-list-style"
      >
        {items.map((item, index) => (
          <div key={index}>
            {/* Display your item content here */}
            <figure>
              {item.bestEcommerceImages != null && item.bestEcommerceLink != null && item.bestEcommerceLink !== "#" ? (
                <Link href={item.bestEcommerceLink.url} target="_blank">
                  <Image
                    src={
                      item.bestEcommerceImages &&
                      item.bestEcommerceImages.mediaItemUrl
                    }
                    alt={
                      item.bestEcommerceImages &&
                      item.bestEcommerceImages.altText !== ""
                        ? item.bestEcommerceImages.altText
                        : "award-logo"
                    }
                    height={
                      item.bestEcommerceImages.mediaDetails &&
                      item.bestEcommerceImages.mediaDetails.height
                        ? item.bestEcommerceImages.mediaDetails.height
                        : 150
                    }
                    width={
                      item.bestEcommerceImages.mediaDetails &&
                      item.bestEcommerceImages.mediaDetails.width
                        ? item.bestEcommerceImages.mediaDetails.width
                        : 150
                    }
                  />
                </Link>
              ) : (
                <Image
                  src={
                    item.bestEcommerceImages &&
                    item.bestEcommerceImages.mediaItemUrl
                  }
                  alt={
                    item.bestEcommerceImages &&
                    item.bestEcommerceImages.altText !== ""
                      ? item.bestEcommerceImages.altText
                      : "award-logo"
                  }
                  height={
                    item.bestEcommerceImages.mediaDetails &&
                    item.bestEcommerceImages.mediaDetails.height
                      ? item.bestEcommerceImages.mediaDetails.height
                      : 150
                  }
                  width={
                    item.bestEcommerceImages.mediaDetails &&
                    item.bestEcommerceImages.mediaDetails.width
                      ? item.bestEcommerceImages.mediaDetails.width
                      : 150
                  }
                />
              )}
            </figure>
          </div>
        ))}
      </Carousel>
    );
};

export default MySlider;
