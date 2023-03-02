import React, { useEffect } from "react";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { ItemsProduct, NoProduct } from "../../components";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Thumbs,
  Pagination,
  Scrollbar,
  A11y,
  FreeMode,
  Grid,
  Keyboard,
} from "swiper";
//Swiper
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/bundle";
import "swiper/css/grid";
import { useParams } from "react-router-dom";

const ProductCategory = ({ categoryId, productSlug }) => {
  // console.log(productSlug);
  let slug = productSlug ? productSlug : "";
  let itemId = categoryId ? categoryId : "";
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getProduct());
  };

  useEffect(() => {
    feachDataDetail();
  }, []);

  const feachDataDetail = (slug) => {
    let payload = slug;
    dispatch(actions.getProductDetail(payload));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        grid={{
          rows: 1,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
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
        scrollbar={true}
        navigation={true}
        modules={[Keyboard, Scrollbar, Navigation, Pagination, Grid]}
        className="mySwiper"
      >
        {products.filter(
          (item) =>
            item.categoryId === itemId &&
            item.status === 1 &&
            item.slug !== slug
        ) < 1 ? (
          <NoProduct />
        ) : (
          <>
            {products?.length > 0 &&
              products
                .filter(
                  (item) =>
                    item.categoryId === itemId &&
                    item.status === 1 &&
                    item.slug !== slug
                )
                .map((items, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <ItemsProduct
                        onClick={() => feachDataDetail(items?.slug)}
                        sale
                        slug={items?.slug}
                        name={items?.name}
                        images={items?.images}
                        pricesale={items?.pricesale}
                        price={items?.price}
                      />
                    </SwiperSlide>
                  );
                })}
          </>
        )}
      </Swiper>
    </div>
  );
};

export default ProductCategory;
