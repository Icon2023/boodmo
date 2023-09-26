import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../Services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../store/reducers/ProductSlice';
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { AiOutlineFilter, AiOutlineStar } from "react-icons/ai";

//matrial ui 
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Pagination, PaginationItem } from '@mui/material';

const ProductsView = () => {
    const { cate_id, subcategory } = useParams();
    const [gridOpen, setGridOpen] = useState(true);
    const [trifOpen, setTrifOpen] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Set the number of items to show per page here.
    const [Stprice, setStPrice] = useState('')
    const [endPrice, setEndPrice] = useState('')

    const dispatch = useDispatch();
    const { add_product, category_list } = useSelector((state) => ({ ...state.products }));

    // Calculate the indexes of the items to show on the current page.
    const totalPages = Math.ceil(add_product.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = add_product.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handlePageChange = (event, pageNumber) => {
        window.scrollTo(0, 0);
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const data = {
            category: cate_id,
            sub_category: subcategory
        }
        Product(data).then((res) => {
            if (res.success) {
                dispatch(addProducts(res?.data))
            }
        })


    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const price = {
            category: cate_id,
            sub_category: subcategory,
            price_start: Stprice,
            price_end: endPrice
        }
        Product(price).then((res) => {
            if (res.success) {
                dispatch(addProducts(res?.data))
            }
        })
    }

    const sortClick = (val1) => {
        let data = {
            category: cate_id,
            sub_category: subcategory,
            sort_by: val1.split(",")[0],
            sort_action: val1.split(",")[1]
        }
        Product(data).then((res) => {
            if (res.success) {
                dispatch(addProducts(res?.data))
            }
        })
    }

    const handleGridClick = () => {
        gridOpen ? setTrifOpen(false) : setGridOpen(true)
    }

    const handleTfiClick = () => {
        gridOpen ? setGridOpen(false) : setTrifOpen(true)
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
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
                                        <ul className="widget__categories--menu" style={{ height: "70vh", overflowY: "scroll" }}>
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
                                    <div className="single__widget price__filter widget__bg">
                                        <h2 className="widget__title h3">Filter By Price</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className='form_filter'>
                                                <label>
                                                    From
                                                    <input type="number" placeholder='0' value={Stprice} onChange={(e) => setStPrice(e.target.value)} />
                                                </label>
                                                <label>To

                                                    <input type="number" placeholder='250' value={endPrice} onChange={(e) => setEndPrice(e.target.value)} />
                                                </label>
                                            </div>
                                            <div className='form_filter_btn'>
                                                <button>Filter</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-9 col-lg-8 shop-col-width-lg-8">
                                <div className="shop__right--sidebar">
                                    <div className="shop__product--wrapper">
                                        <div className="shop__header d-flex align-items-center justify-content-between mb-30">
                                            <div className="product__view--mode d-flex align-items-center">
                                                <button
                                                    className="widget__filter--btn d-flex d-lg-none align-items-center"
                                                    data-offcanvas=""
                                                >
                                                    <AiOutlineFilter />
                                                    <span className="widget__filter--btn__text">Filter</span>
                                                </button>
                                                <div className="product__view--mode__list product__short--by align-items-center d-flex ">
                                                    <label className="product__view--label">Prev Page :</label>
                                                    <div className="select shop__header--select">
                                                        <select className="product__view--select">
                                                            <option selected="" value={1}>
                                                                65
                                                            </option>
                                                            <option value={2}>40</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="product__view--mode__list product__short--by align-items-center d-flex">
                                                    <label className="product__view--label">Sort By :</label>
                                                    <div className="select shop__header--select">
                                                        <select className="product__view--select" onChange={(e) => sortClick(e.target.value)}>
                                                            <option selected="" value={("price, ASC")}>
                                                                Sort by Populity
                                                            </option>
                                                            <option value={("price, ASC")}>
                                                                LOW  TO HIGH
                                                            </option>
                                                            <option value={("price, DESC")}>HIGH TO LOW</option>
                                                            <option value={("latest, ASC")}>OLD TO NEW</option>
                                                            <option value={("latest, DESC")}>NEW TO OLD</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="product__view--mode__list">
                                                    <div className="product__tab--one product__grid--column__buttons d-flex justify-content-center">
                                                        <button
                                                            className={`product__grid--column__buttons--icons ${gridOpen == true ? "active" : ""} `}
                                                            aria-label="grid btn"
                                                            data-toggle="tab"
                                                            data-target="#product_grid"
                                                            onClick={handleGridClick}
                                                        >
                                                            <CgMenuGridR />
                                                        </button>
                                                        <button
                                                            className={`product__grid--column__buttons--icons ${gridOpen == true ? "" : "active"}`}
                                                            aria-label="list btn"
                                                            data-toggle="tab"
                                                            data-target="#product_list"
                                                            onClick={handleTfiClick}
                                                        >
                                                            <TfiMenuAlt />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="product__showing--count">
                                                Showing 1 of {add_product.length} results
                                            </p>
                                        </div>
                                        <div className="tab_content">
                                            {
                                                gridOpen ?
                                                    <>
                                                        <div className="tab_pane active">
                                                            <div className="product__section--inner">
                                                                <div className="row mb--n30">
                                                                    {
                                                                        currentItems.map((e, index) => {
                                                                            return (
                                                                                <>
                                                                                    <div className="col-lg-4 col-md-4 col-sm-6 col-6 custom-col mb-30" key={index}>
                                                                                        <article className="product__card">
                                                                                            <div className="product__card--thumbnail">
                                                                                                <a
                                                                                                    className="product__card--thumbnail__link display-block"
                                                                                                    href={`/productsdetail/${e?.id}`}
                                                                                                >
                                                                                                    <img
                                                                                                        className="product__card--thumbnail__img product__primary--img"
                                                                                                        src={e?.images[0]?.image}
                                                                                                        alt="product-img"
                                                                                                    />
                                                                                                    <img
                                                                                                        className="product__card--thumbnail__img product__secondary--img"
                                                                                                        src={e?.images[1]?.image}
                                                                                                        alt="product-img"
                                                                                                    />
                                                                                                </a>
                                                                                                <span className="product__badge">-14%</span>
                                                                                                {/* <ul className="product__card--action d-flex align-items-center justify-content-center">
                                                                                                    <li className="product__card--action__list">
                                                                                                        <a
                                                                                                            className="product__card--action__btn"
                                                                                                            title="Wishlist"
                                                                                                            href="wishlist.html"
                                                                                                        >
                                                                                                            <svg
                                                                                                                className="product__card--action__btn--svg"
                                                                                                                width={18}
                                                                                                                height={18}
                                                                                                                viewBox="0 0 16 13"
                                                                                                                fill="none"
                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                            >
                                                                                                                <path
                                                                                                                    d="M13.5379 1.52734C11.9519 0.1875 9.51832 0.378906 8.01442 1.9375C6.48317 0.378906 4.04957 0.1875 2.46364 1.52734C0.412855 3.25 0.713636 6.06641 2.1902 7.57031L6.97536 12.4648C7.24879 12.7383 7.60426 12.9023 8.01442 12.9023C8.39723 12.9023 8.7527 12.7383 9.02614 12.4648L13.8386 7.57031C15.2879 6.06641 15.5886 3.25 13.5379 1.52734ZM12.8816 6.64062L8.09645 11.5352C8.04176 11.5898 7.98707 11.5898 7.90504 11.5352L3.11989 6.64062C2.10817 5.62891 1.91676 3.71484 3.31129 2.53906C4.3777 1.63672 6.01832 1.77344 7.05739 2.8125L8.01442 3.79688L8.97145 2.8125C9.98317 1.77344 11.6238 1.63672 12.6902 2.51172C14.0847 3.71484 13.8933 5.62891 12.8816 6.64062Z"
                                                                                                                    fill="currentColor"
                                                                                                                />
                                                                                                            </svg>
                                                                                                            <span className="visually-hidden">
                                                                                                                Wishlist
                                                                                                            </span>
                                                                                                        </a>
                                                                                                    </li>
                                                                                                </ul> */}
                                                                                            </div>
                                                                                            <div className="product__card--content">
                                                                                                <ul className="rating product__card--rating d-flex">
                                                                                                    <li className="rating__list">
                                                                                                        <span className="rating__icon mt-2">
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                        </span>
                                                                                                    </li>
                                                                                                </ul>
                                                                                                <h3 className="product_name">
                                                                                                    <a href={`/productsdetail/${e?.id}`} title={e?.name}>
                                                                                                        {e?.name}
                                                                                                    </a>
                                                                                                </h3>
                                                                                                <div className="product__card--price">
                                                                                                    <span className="current__price">${e?.original_price}.52/-</span>
                                                                                                    <span className="old__price">${e?.original_price * 1.5}</span>
                                                                                                </div>
                                                                                                <div className="product__card--footer">
                                                                                                    <a
                                                                                                        className="product__card--btn primary__btn"
                                                                                                        href={`/productsdetail/${e?.id}`}
                                                                                                    >
                                                                                                        <svg
                                                                                                            width={14}
                                                                                                            height={11}
                                                                                                            viewBox="0 0 14 11"
                                                                                                            fill="none"
                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                        >
                                                                                                            <path
                                                                                                                d="M13.2371 4H11.5261L8.5027 0.460938C8.29176 0.226562 7.9402 0.203125 7.70582 0.390625C7.47145 0.601562 7.44801 0.953125 7.63551 1.1875L10.0496 4H3.46364L5.8777 1.1875C6.0652 0.953125 6.04176 0.601562 5.80739 0.390625C5.57301 0.203125 5.22145 0.226562 5.01051 0.460938L1.98707 4H0.299574C0.135511 4 0.0183239 4.14062 0.0183239 4.28125V4.84375C0.0183239 5.00781 0.135511 5.125 0.299574 5.125H0.721449L1.3777 9.78906C1.44801 10.3516 1.91676 10.75 2.47926 10.75H11.0339C11.5964 10.75 12.0652 10.3516 12.1355 9.78906L12.7918 5.125H13.2371C13.3777 5.125 13.5183 5.00781 13.5183 4.84375V4.28125C13.5183 4.14062 13.3777 4 13.2371 4ZM11.0339 9.625H2.47926L1.86989 5.125H11.6433L11.0339 9.625ZM7.33082 6.4375C7.33082 6.13281 7.07301 5.875 6.76832 5.875C6.4402 5.875 6.20582 6.13281 6.20582 6.4375V8.3125C6.20582 8.64062 6.4402 8.875 6.76832 8.875C7.07301 8.875 7.33082 8.64062 7.33082 8.3125V6.4375ZM9.95582 6.4375C9.95582 6.13281 9.69801 5.875 9.39332 5.875C9.0652 5.875 8.83082 6.13281 8.83082 6.4375V8.3125C8.83082 8.64062 9.0652 8.875 9.39332 8.875C9.69801 8.875 9.95582 8.64062 9.95582 8.3125V6.4375ZM4.70582 6.4375C4.70582 6.13281 4.44801 5.875 4.14332 5.875C3.8152 5.875 3.58082 6.13281 3.58082 6.4375V8.3125C3.58082 8.64062 3.8152 8.875 4.14332 8.875C4.44801 8.875 4.70582 8.64062 4.70582 8.3125V6.4375Z"
                                                                                                                fill="currentColor"
                                                                                                            />
                                                                                                        </svg>
                                                                                                        Add to cart
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                        </article>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="tab_pane active">
                                                            <div className="product__section--inner product__section--style3__inner">
                                                                <div className="row row-cols-1 mb--n30">
                                                                    {
                                                                        currentItems.map((e, index) => {
                                                                            return (
                                                                                <>
                                                                                    <div className="col mb-30" key={index}>
                                                                                        <div className="product__card product__list d-flex align-items-center">
                                                                                            <div className="product__card--thumbnail product__list--thumbnail">
                                                                                                <a
                                                                                                    className="product__card--thumbnail__link display-block"
                                                                                                    href={`/productsdetail/${e?.id}`}
                                                                                                >
                                                                                                    <img
                                                                                                        className="product__card--thumbnail__img product__primary--img"
                                                                                                        src={e?.images[0]?.image}
                                                                                                        alt="product-img"
                                                                                                    />
                                                                                                    <img
                                                                                                        className="product__card--thumbnail__img product__secondary--img"
                                                                                                        src={e?.images[1]?.image}
                                                                                                        alt="product-img"
                                                                                                    />
                                                                                                </a>
                                                                                                <span className="product__badge">-20%</span>
                                                                                                {/* <ul className="product__card--action d-flex align-items-center justify-content-center">
                                                                                                   
                                                                                                    <li className="product__card--action__list">
                                                                                                        <a
                                                                                                            className="product__card--action__btn"
                                                                                                            title="Wishlist"
                                                                                                            href="wishlist.html"
                                                                                                        >
                                                                                                            <svg
                                                                                                                className="product__card--action__btn--svg"
                                                                                                                width={18}
                                                                                                                height={18}
                                                                                                                viewBox="0 0 16 13"
                                                                                                                fill="none"
                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                            >
                                                                                                                <path
                                                                                                                    d="M13.5379 1.52734C11.9519 0.1875 9.51832 0.378906 8.01442 1.9375C6.48317 0.378906 4.04957 0.1875 2.46364 1.52734C0.412855 3.25 0.713636 6.06641 2.1902 7.57031L6.97536 12.4648C7.24879 12.7383 7.60426 12.9023 8.01442 12.9023C8.39723 12.9023 8.7527 12.7383 9.02614 12.4648L13.8386 7.57031C15.2879 6.06641 15.5886 3.25 13.5379 1.52734ZM12.8816 6.64062L8.09645 11.5352C8.04176 11.5898 7.98707 11.5898 7.90504 11.5352L3.11989 6.64062C2.10817 5.62891 1.91676 3.71484 3.31129 2.53906C4.3777 1.63672 6.01832 1.77344 7.05739 2.8125L8.01442 3.79688L8.97145 2.8125C9.98317 1.77344 11.6238 1.63672 12.6902 2.51172C14.0847 3.71484 13.8933 5.62891 12.8816 6.64062Z"
                                                                                                                    fill="currentColor"
                                                                                                                />
                                                                                                            </svg>
                                                                                                            <span className="visually-hidden">
                                                                                                                Wishlist
                                                                                                            </span>
                                                                                                        </a>
                                                                                                    </li>
                                                                                                </ul> */}
                                                                                            </div>
                                                                                            <div className="product__card--content product__list--content">
                                                                                                <h3 className="product__card--title">
                                                                                                    <a href="/">
                                                                                                        {e?.name}
                                                                                                    </a>
                                                                                                </h3>
                                                                                                <ul className="rating product__card--rating d-flex">
                                                                                                    <li className="rating__list">
                                                                                                        <span className="rating__icon">
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                        </span>
                                                                                                    </li>

                                                                                                    <li>
                                                                                                        <span className="rating__review--text">
                                                                                                            (106) Review
                                                                                                        </span>
                                                                                                    </li>
                                                                                                </ul>
                                                                                                <div className="product__list--price">
                                                                                                    <span className="current__price">{e?.selling_price}</span>
                                                                                                    <span className="old__price">${e?.original_price}/-</span>
                                                                                                </div>
                                                                                                <a
                                                                                                    className="product__card--btn primary__btn"
                                                                                                    href={`/productsdetail/${e?.id}`}
                                                                                                >
                                                                                                    + Add to cart
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                            }
                                        </div>

                                        <div className="pagination__area">
                                            <ul className="pagination__wrapper d-flex align-items-center justify-content-center">
                                                <li className="pagination__list">
                                                    <Pagination
                                                        count={totalPages}
                                                        page={currentPage}
                                                        onChange={handlePageChange}
                                                        renderItem={(item) => (
                                                            <PaginationItem
                                                                component="button"
                                                                onClick={() => handlePageChange(null, item.page)}
                                                                {...item}
                                                            />
                                                        )}
                                                    />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductsView