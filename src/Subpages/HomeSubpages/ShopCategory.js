import React, { useEffect, useState } from 'react'
import { Categories } from '../../Services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../store/reducers/ProductSlice';

const ShopCategory = () => {
    const dispatch = useDispatch();
    const { category_list } = useSelector((state) => ({ ...state.products }));
    const [isOpen, setIsopen] = useState(false);

    useEffect(() => {
        Categories().then((res) => {
            if (res?.success) {
                dispatch(addCategory(res?.data))
            }
        }).catch((e) => {
            console.log(e);
        })
    }, [])

    const handleLoad = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true)
    }
 
    return (
        <>
            <section className="categories__section">
                <div className="container">
                    <div className="section__heading border-bottom mb-30">
                        <h2 className="section__heading--maintitle">
                            Shop by <span>Categories</span>
                        </h2>
                    </div>
                    <div className="categories__inner--style3 d-flex mb-5">
                        {
                            isOpen ?
                                <>
                                    {
                                        category_list?.map((e, index) => {
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
                                </>
                                :
                                <>
                                    <div className="categories__card--style3 text-center">
                                        <a className="categories__card--link" href={`/shop/${category_list[0]?.id}`}>
                                            <div className="categories__thumbnail">
                                                <img
                                                    className="categories__thumbnail--img"
                                                    src={category_list[0]?.image}
                                                    alt="categories-img"
                                                />
                                            </div>
                                            <div className="categories__content style3">
                                                <h2 className="categories__content--title">{category_list[0]?.name}</h2>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="categories__card--style3 text-center">
                                        <a className="categories__card--link" href={`/shop/${category_list[1]?.id}`}>
                                            <div className="categories__thumbnail">
                                                <img
                                                    className="categories__thumbnail--img"
                                                    src={category_list[1]?.image}
                                                    alt="categories-img"
                                                />
                                            </div>
                                            <div className="categories__content style3">
                                                <h2 className="categories__content--title">{category_list[1]?.name}</h2>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="categories__card--style3 text-center">
                                        <a className="categories__card--link" href={`/shop/${category_list[2]?.id}`}>
                                            <div className="categories__thumbnail">
                                                <img
                                                    className="categories__thumbnail--img"
                                                    src={category_list[2]?.image}
                                                    alt="categories-img"
                                                />
                                            </div>
                                            <div className="categories__content style3">
                                                <h2 className="categories__content--title">{category_list[2]?.name}</h2>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="categories__card--style3 text-center">
                                        <a className="categories__card--link" href={`/shop/${category_list[3]?.id}`}>
                                            <div className="categories__thumbnail">
                                                <img
                                                    className="categories__thumbnail--img"
                                                    src={category_list[3]?.image}
                                                    alt="categories-img"
                                                />
                                            </div>
                                            <div className="categories__content style3">
                                                <h2 className="categories__content--title">{category_list[3]?.name}</h2>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="categories__card--style3 text-center">
                                        <a className="categories__card--link" href={`/shop/${category_list[4]?.id}`}>
                                            <div className="categories__thumbnail">
                                                <img
                                                    className="categories__thumbnail--img"
                                                    src={category_list[4]?.image}
                                                    alt="categories-img"
                                                />
                                            </div>
                                            <div className="categories__content style3">
                                                <h2 className="categories__content--title">{category_list[4]?.name}</h2>
                                            </div>
                                        </a>
                                    </div>
                                </>
                        }
                    </div>
                    <div className='load_btn'>
                        {
                            isOpen === false ? <button onClick={handleLoad}>Load More</button> : <button onClick={handleLoad}>Hide More</button>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopCategory