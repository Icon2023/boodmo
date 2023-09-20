import React, { useEffect, useState } from 'react'
import { Categories } from '../Services/apiServices';

const ShopCategory = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        Categories().then((res) => {
            if (res.success) {
                setCategory(res?.data)
                console.log(res?.data);
            }
        }).catch((e) => {
            console.log(e);
        })
    }, [])

    return (
        <>
            <section className="categories__section section--padding">
                <div className="container">
                    <div className="section__heading border-bottom mb-30">
                        <h2 className="section__heading--maintitle">
                            Shop by <span>Categories</span>
                        </h2>
                    </div>
                    <div className="categories__inner--style3 d-flex">
                        {
                            category.map((e, index) => {
                                return (
                                    <div className="categories__card--style3 text-center">
                                        <a className="categories__card--link" href="shop.html">
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
                </div>
            </section>
        </>
    )
}

export default ShopCategory