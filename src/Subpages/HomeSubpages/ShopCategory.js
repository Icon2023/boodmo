import React, { useEffect, useState } from "react";
import { Categories } from "../../Services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../store/reducers/ProductSlice";
import { motion } from "framer-motion";

const ShopCategory = () => {
  const dispatch = useDispatch();
  const { category_list } = useSelector((state) => ({ ...state.products }));

  const [displayedCategory, setDisplayedCategory] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(5);

  const remainingItemCount = category_list.length - visibleItemCount;

  useEffect(() => {
    Categories().then((res) => {
      if (res?.success) {
        dispatch(addCategory(res?.data))
        setDisplayedCategory(res?.data.slice(0, visibleItemCount));
      }
    }).catch((e) => {
      console.log(e);
    })
  }, [])

  const handleLoadMore = () => {
    setVisibleItemCount(category_list.length);
    setDisplayedCategory(category_list);
  };

  return (
    <>
      <section className="categories__section" style={{ marginTop: "5%" }}>
        <div className="container">
          <div className="section__heading border-bottom mb-30">
            <h2 className="section__heading--maintitle">
              Shop by <span>Categories</span>
            </h2>
          </div>
          <div className="categories__inner--style3 d-flex mb-4">
            {displayedCategory?.map((e, index) => {
              return (
                // <div className="categories__card--style3 text-center" key={index}>
                <motion.div
                  className="categories__card--style3 text-center"
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
                >
                  <a className="categories__card--link" href={`/shop/${e?.id}`}>
                    <div className="categories__thumbnail">
                      <img
                        className="categories__thumbnail--img"
                        src={e?.image}
                        alt="categories-img"
                        style={{ width: "75px" }}
                      />
                    </div>
                    <div className="categories__content style3">
                      <h2 className="categories__content--title">{e?.name}</h2>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
          <div className="load_btn">
            {remainingItemCount > 0 && (
              // <button onClick={handleLoadMore} className="load_more">
                //   Load More
              // </button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                onClick={handleLoadMore}
                className="load_more"
              >
                Load More
              </motion.button>
                       )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopCategory;