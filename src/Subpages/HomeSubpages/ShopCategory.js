import React, { useEffect, useState } from 'react'
import { Categories } from '../../Services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../store/reducers/ProductSlice';

const ShopCategory = () => {
    const dispatch = useDispatch();
    const { category_list } = useSelector((state) => ({ ...state.products }));

    const [displayedCategory, setDisplayedCategory] = useState([]);
    const [visibleItemCount, setVisibleItemCount] = useState(5);

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

    const remainingItemCount = category_list.length - visibleItemCount;

    const handleLoadMore = () => {
        setVisibleItemCount(category_list.length);
        setDisplayedCategory(category_list);
    };

    // const handleHideMore = () => {
    //     window.location.reload();
    // }


    return (
        <>
            <section className="categories__section">
                <div className="container">
                    <div className="section__heading border-bottom mb-30">
                        <h2 className="section__heading--maintitle">
                            Shop by <span>Categories</span>
                        </h2>
                    </div>
                    <div className="categories__inner--style3 d-flex mb-4">
                        {
                            displayedCategory?.map((e, index) => {
                                return (
                                    <div className="categories__card--style3 text-center" key={index}>
                                        <a className="categories__card--link" href={`/shop/${e?.id}`}>
                                            <div className="categories__thumbnail">
                                                <img
                                                    className="categories__thumbnail--img"
                                                    src={e?.image}
                                                    alt="categories-img"
                                                />
                                            </div>
                                            <div className="categories__content style3">
                                                <h2 className="categories__content--title">{e?.name}</h2>
                                            </div>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='load_btn'>
                        {
                            remainingItemCount > 0 && <button onClick={handleLoadMore}>Load More</button>
                        }
                        {/* {
                            !remainingItemCount && <button onClick={handleHideMore}>Hide More</button>
                        } */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopCategory