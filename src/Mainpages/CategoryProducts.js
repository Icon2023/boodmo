import React, { useEffect, useState } from 'react'
import { CategoryProduct } from '../Services/apiServices'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addSingleCategory } from '../store/reducers/ProductSlice'

//matrial ui 
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShippingAddress from '../Subpages/ShippingAddress'

const CategoryProducts = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [expanded, setExpanded] = useState(false);
    const { single_category, category_list } = useSelector((state) => ({ ...state.products }));

    useEffect(() => {
        CategoryProduct(id).then((res) => {
            if (res.success) {
                dispatch(addSingleCategory(res?.data));
            }
        }).catch((e) => {
            console.log(e);
        })
    }, [])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <main className="main__content_wrapper">
                {/* Start breadcrumb section */}
                <section className="breadcrumb__section breadcrumb__bg">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="breadcrumb__content text-center">
                                    <h1 className="breadcrumb__content--title">Product</h1>
                                    <ul className="breadcrumb__content--menu d-flex justify-content-center">
                                        <li className="breadcrumb__content--menu__items">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb__content--menu__items">
                                            <span>Product</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Start shop section */}
                <div className="shop__section section--padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4 shop-col-width-lg-4">
                                <div className="shop__sidebar--widget widget__area d-none d-lg-block">
                                    <div className="single__widget widget__bg">
                                        <h2 className="widget__title h3">Categories</h2>
                                        <ul className="widget__categories--menu" style={{ height: "80vh", overflowY: "scroll" }}>
                                            {
                                                category_list.map((e, index) => {
                                                    return (
                                                        <>
                                                            <Accordion expanded={expanded === e?.id} onChange={handleChange(e?.id)} key={index}>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon style={{ fontSize: "28px" }} />}
                                                                    aria-controls="panel1bh-content"
                                                                    id="panel1bh-header"
                                                                >
                                                                    <a href={`/shop/${e?.id}`}>
                                                                        <label className="widget__categories--menu__label d-flex align-items-center">
                                                                            <img
                                                                                className="widget__categories--menu__img"
                                                                                src={e?.image}
                                                                                alt="categories-img"
                                                                            />
                                                                            <span className="widget__categories--menu__text">
                                                                                {e?.name}
                                                                            </span>
                                                                        </label>
                                                                    </a>  
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    {
                                                                        e?.sub_category?.map((i, index) => {
                                                                            return (
                                                                                <li className="widget__categories--menu__list" key={index}>
                                                                                    <a href={`/shop/${e?.id}/${i?.id}`}>
                                                                                        <label label className="widget__categories--menu__label d-flex align-items-center" >
                                                                                            <img
                                                                                                className="widget__categories--menu__img"
                                                                                                src={i?.image}
                                                                                                alt="categories-img"
                                                                                            />
                                                                                            <span className="widget__categories--menu__text">
                                                                                                {i?.name}
                                                                                            </span>
                                                                                        </label>
                                                                                    </a>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </AccordionDetails>
                                                            </Accordion >
                                                        </>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    {/* <div className="single__widget price__filter widget__bg">
                                        <h2 className="widget__title h3">Filter By Price</h2>
                                        <form className="price__filter--form" action="#">
                                            <div className="price__filter--form__inner mb-15 d-flex align-items-center">
                                                <div className="price__filter--group">
                                                    <label
                                                        className="price__filter--label"
                                                        htmlFor="Filter-Price-GTE2"
                                                    >
                                                        From
                                                    </label>
                                                    <div className="price__filter--input border-radius-5 d-flex align-items-center">
                                                        <span className="price__filter--currency">$</span>
                                                        <input
                                                            className="price__filter--input__field border-0"
                                                            name="filter.v.price.gte"
                                                            id="Filter-Price-GTE2"
                                                            type="number"
                                                            placeholder={0}
                                                            min={0}
                                                            max={250.0}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="price__divider">
                                                    <span>-</span>
                                                </div>
                                                <div className="price__filter--group">
                                                    <label
                                                        className="price__filter--label"
                                                        htmlFor="Filter-Price-LTE2"
                                                    >
                                                        To
                                                    </label>
                                                    <div className="price__filter--input border-radius-5 d-flex align-items-center">
                                                        <span className="price__filter--currency">$</span>
                                                        <input
                                                            className="price__filter--input__field border-0"
                                                            name="filter.v.price.lte"
                                                            id="Filter-Price-LTE2"
                                                            type="number"
                                                            min={0}
                                                            placeholder={250.0}
                                                            max={250.0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="primary__btn price__filter--btn"
                                                type="submit"
                                            >
                                                Filter
                                            </button>
                                        </form>
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8 shop-col-width-lg-8">
                                <div className="shop__right--sidebar">
                                    {/* Start categories section */}
                                    <div className="categories__shop mb-50">
                                        <div className="section__heading border-bottom mb-30">
                                            <h2 className="section__heading--maintitle">
                                                Shop By <span>Categories</span>
                                            </h2>
                                        </div>
                                        <ul className="categories__shop--inner">
                                            {
                                                single_category.map((e, index) => {
                                                    return (
                                                        <li className="categories__shop--card" key={index}>
                                                            <a
                                                                className="categories__shop--card__link"
                                                                href={`/shop/${id}/${e?.id}`}
                                                            >
                                                                <div className="categories__thumbnail mb-15">
                                                                    <img
                                                                        className="categories__thumbnail--img"
                                                                        src={e?.image}
                                                                        alt="categories-img"
                                                                    />
                                                                </div>
                                                                <div className="categories__content">
                                                                    <h2 className="categories__content--title">{e?.name}</h2>
                                                                    {/* <span className="categories__content--subtitle">(20 Items)</span> */}
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ShippingAddress/>
            </main >
        </>
    )
}

export default CategoryProducts