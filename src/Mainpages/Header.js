import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineHeart, AiOutlineHome, AiOutlineLogout, AiOutlineMenu, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosArrowDown, IoMdContact } from 'react-icons/io'
import { BiLogoFacebook, BiLogoInstagramAlt, BiLogoPinterest, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import Drawer from 'react-modern-drawer';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { add_search, removeAllItemWishlist, removeAllLoginCart } from '../store/reducers/ProductSlice'
import { Product, SearchProduct, searchProducts } from '../Services/apiServices'
import Drawers from '@mui/material/Drawer';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    let pathName = location.pathname;
    const { add_wish, addto_cart, login_cart, serach_bar } = useSelector((state) => ({ ...state.products }));
    const user = JSON.parse(localStorage.getItem('USER'));
    const [isOpen, setIsOpen] = useState(false);
    const [scroll, setScroll] = useState(false);

    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchClicked, setSearchClicked] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const changeNavbarBg = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener("scroll", changeNavbarBg);

        return () => {
            window.removeEventListener("scroll", changeNavbarBg);
        };

    }, [])

    useEffect(() => {
        SearchProduct().then((res) => {
            if (res.success) {
                // console.log("dh",res);
            }
        })
    }, [])

    // const handleSearch = async () => {
    //     try {
    //         setLoading(true);
    //         setSearchClicked(true); // Set searchClicked to true when the search button is clicked
    //         const data = { search: searchTerm };
    //         const response = await Product(data);

    //         if (response) {
    //             const filteredResult = response.data.filter(
    //                 (item) =>
    //                     item.name.toLowerCase().includes(searchTerm.toLowerCase())
    //             );

    //             setFilteredData(filteredResult);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleToggleDrawer = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        localStorage.removeItem('USER')
        dispatch(removeAllItemWishlist())
        dispatch(removeAllLoginCart())
    }

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const toggleClose = () => {
        setIsOpen(false)
    }

    const handleSearchClick = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.length > 0) {
            navigate(`/search/${search}`)
        }
    };
    return (
        <>
            <Drawers
                anchor="top"
                open={open}
                onClose={handleToggleDrawer}
            >
                <div className="predictive__search--box active">
                    <div className="predictive__search--box__inner">
                        <h2 className="predictive__search--title">Search Products</h2>
                        <form className="predictive__search--form">
                            <label>
                                <input
                                    className="predictive__search--input"
                                    placeholder="Search Here"
                                    type="text"
                                    value={search}
                                    onChange={handleSearchClick}
                                />
                            </label>
                            <button
                                className="predictive__search--button text-white"
                                aria-label="search button"
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                <svg
                                    className="product__items--action__btn--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30.51"
                                    height="25.443"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeMiterlimit={10}
                                        strokeWidth={32}
                                    />
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeMiterlimit={10}
                                        strokeWidth={32}
                                        d="M338.29 338.29L448 448"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <ul>
                        {/* Display filtered data or no results message */}
                        {!loading &&
                            filteredData.length > 0 &&
                            filteredData.map((item) => (
                                <div key={item.id}>
                                    <p>{item.name}</p>
                                    {/* Add more product details as needed */}
                                </div>
                            ))}
                    </ul>
                    <button
                        className="predictive__search--close__btn"
                        aria-label="search close"
                        onClick={handleToggleDrawer}
                    >
                        <svg
                            className="predictive__search--close__icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="40.51"
                            height="30.443"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={32}
                                d="M368 368L144 144M368 144L144 368"
                            />
                        </svg>
                    </button>
                </div>
            </Drawers>

            <header className="header__section">
                <div className="header__topbar bg__primary">
                    <div className="container-fluid">
                        <div className="header__topbar--inner d-flex align-items-center justify-content-between">
                            <ul className="header__topbar--info d-none d-lg-flex">
                                <li className="header__info--list">
                                    <a className="header__info--link text-white" href="shop.html">
                                        STORES
                                    </a>
                                </li>
                                <li className="header__info--list">
                                    <a className="header__info--link text-white" href="shop.html">
                                        DELIVERY
                                    </a>
                                </li>
                                <li className="header__info--list">
                                    <a className="header__info--link text-white" href="shop.html">
                                        GUARANTEE
                                    </a>
                                </li>
                                <li className="header__info--list">
                                    <a
                                        className="header__info--link text-white"
                                        href="mailto:info@example.com"
                                    >
                                        <svg
                                            width={15}
                                            height={13}
                                            viewBox="0 0 15 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.368 9.104C7.26133 9.17867 7.13867 9.216 7 9.216C6.86133 9.216 6.744 9.17867 6.648 9.104L0.36 4.624C0.264 4.56 0.178667 4.54933 0.104 4.592C0.04 4.624 0.00800002 4.69867 0.00800002 4.816V11.984C0.00800002 12.112 0.0506667 12.2187 0.136 12.304C0.221333 12.3893 0.322667 12.432 0.44 12.432H13.56C13.6773 12.432 13.7787 12.3893 13.864 12.304C13.96 12.2187 14.008 12.112 14.008 11.984V4.816C14.008 4.69867 13.9707 4.624 13.896 4.592C13.8213 4.54933 13.736 4.56 13.64 4.624L7.368 9.104ZM6.76 8.32C6.84533 8.37333 6.92533 8.4 7 8.4C7.08533 8.4 7.16533 8.37333 7.24 8.32L12.52 4.56C12.6373 4.464 12.696 4.352 12.696 4.224V0.783999C12.696 0.666666 12.6533 0.570666 12.568 0.495999C12.4933 0.410666 12.3973 0.367999 12.28 0.367999H1.72C1.60267 0.367999 1.50667 0.410666 1.432 0.495999C1.35733 0.570666 1.32 0.666666 1.32 0.783999V4.224C1.32 4.37333 1.37333 4.48533 1.48 4.56L6.76 8.32ZM3.784 2.064H9.96C10.088 2.064 10.1947 2.112 10.28 2.208C10.3653 2.29333 10.408 2.4 10.408 2.528C10.408 2.64533 10.3653 2.74667 10.28 2.832C10.1947 2.91733 10.088 2.96 9.96 2.96H3.784C3.656 2.96 3.54933 2.91733 3.464 2.832C3.37867 2.74667 3.336 2.64533 3.336 2.528C3.336 2.4 3.37867 2.29333 3.464 2.208C3.54933 2.112 3.656 2.064 3.784 2.064ZM3.784 3.632H9.96C10.088 3.632 10.1947 3.68 10.28 3.776C10.3653 3.86133 10.408 3.96267 10.408 4.08C10.408 4.19733 10.3653 4.304 10.28 4.4C10.1947 4.48533 10.088 4.528 9.96 4.528H3.784C3.656 4.528 3.54933 4.48533 3.464 4.4C3.37867 4.31467 3.336 4.21333 3.336 4.096C3.336 3.968 3.37867 3.86133 3.464 3.776C3.54933 3.68 3.656 3.632 3.784 3.632Z"
                                                fill="#FF2D37"
                                            />
                                        </svg>
                                        info@example.com
                                    </a>
                                </li>
                            </ul>
                            <div className="header__top--right d-flex align-items-center">
                                <ul className="social__share style5 d-flex">
                                    <li className="header__link--menu">
                                        <Link
                                            className="header__link--menu__text text-white"
                                            to="/wishlist"
                                        >
                                            <AiOutlineHeart style={{ fontSize: "20px" }} />
                                            Wishlist
                                        </Link>
                                    </li>
                                    <li className="social__share--list">
                                        <a
                                            className="social__share--icon text-white"
                                            target="_blank"
                                            href="https://www.facebook.com/"
                                        >
                                            <BiLogoFacebook style={{ fontSize: "20px", color: "white" }} />
                                        </a>
                                    </li>
                                    <li className="social__share--list">
                                        <a
                                            className="social__share--icon text-white"
                                            target="_blank"
                                            href="https://twitter.com/"
                                        >
                                            <BiLogoTwitter style={{ fontSize: "20px", color: "white" }} />
                                        </a>
                                    </li>
                                    <li className="social__share--list">
                                        <a
                                            className="social__share--icon text-white"
                                            target="_blank"
                                            href="https://www.instagram.com/"
                                        >
                                            <BiLogoInstagramAlt style={{ fontSize: "20px", color: "white" }} />
                                        </a>
                                    </li>
                                    <li className="social__share--list">
                                        <a
                                            className="social__share--icon text-white"
                                            target="_blank"
                                            href="https://www.youtube.com/"
                                        >
                                            <BiLogoYoutube style={{ fontSize: "20px", color: "white" }} />
                                        </a>
                                    </li>
                                    <li className="social__share--list">
                                        <a
                                            className="social__share--icon text-white"
                                            target="_blank"
                                            href="https://www.pinterest.com/"
                                        >
                                            <BiLogoPinterest style={{ fontSize: "20px", color: "white" }} />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`main__header ${scroll ? "header__stickyclose" : "header__sticky"}`}>
                    <div className="container-fluid">
                        <div className="main__header--inner position__relative d-flex justify-content-between align-items-center">
                            <div className='toggle_icon'>
                                <a onClick={toggleDrawer}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon offcanvas__header--menu__open--svg" viewBox="0 0 512 512"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 160h352M80 256h352M80 352h352" /></svg>
                                </a>
                            </div>

                            <div className="main__logo">
                                <h1 className="main__logo--title">
                                    <a className="main__logo--link" href="/">
                                        <img
                                            className="main__logo--img"
                                            src="assets/img/logo/logonew.png"
                                            alt="logo-img"
                                        />
                                    </a>
                                </h1>
                            </div>
                            <div className="header__menu style3 d-none d-lg-block">
                                <nav className="header__menu--navigation">
                                    <ul className="header__menu--wrapper d-flex">
                                        <li className="header__menu--items">
                                            <a href="/" className={`header__menu--link ${window.location.pathname == "/" ? "active" : ""
                                                }`}>
                                                Home
                                            </a>
                                        </li>
                                        <li className="header__menu--items">
                                            <a className={`header__menu--link ${window.location.pathname == "/tools-equiments" ? "active" : ""
                                                }`} href="/tools-equiments">
                                                Tools & Equiments
                                            </a>
                                        </li>
                                        <li className="header__menu--items">
                                            <a className={`header__menu--link ${window.location.pathname == "/market-place" || pathName.startsWith('/market-places/auto') || pathName.startsWith('/market-places/car') ? "active" : ""
                                                }`} href="/market-place">
                                                MarketPlace
                                            </a>
                                        </li>
                                        <li className="header__menu--items">
                                            <a className={`header__menu--link ${window.location.pathname == "/car-exchange" ? "active" : ""
                                                }`} href="/car-exchange">
                                                Car Exchange
                                            </a>
                                        </li>
                                        <li className="header__menu--items">
                                            <a className={`header__menu--link ${window.location.pathname == "/car-insurance" ? "active" : ""
                                                }`} href="/car-insurance">
                                                Car Insurance
                                            </a>
                                        </li>
                                        <li className="header__menu--items">
                                            <a className="header__menu--link">
                                                Others
                                                <IoIosArrowDown style={{ fontSize: "20px" }} />
                                            </a>
                                            <ul className="header__sub--menu">
                                                <li className="header__sub--menu__items">
                                                    {
                                                        user?.success === true ?
                                                            <Link to="/my-orders" className="header__sub--menu__link">
                                                                My Orders
                                                            </Link> : ""
                                                    }
                                                </li>
                                                <li className="header__sub--menu__items">
                                                    {
                                                        user?.success === true ?
                                                            <Link to="/my-address" className="header__sub--menu__link">
                                                                My Address
                                                            </Link>
                                                            : ""
                                                    }
                                                </li>
                                                <li className="header__sub--menu__items">
                                                    {
                                                        user?.success !== true ?
                                                            <Link to="/login" className="header__sub--menu__link">
                                                                Login
                                                            </Link>
                                                            : ""
                                                    }
                                                </li>
                                                <li className="header__sub--menu__items">
                                                    <Link
                                                        to="/privacy-policy"
                                                        className="header__sub--menu__link"
                                                    >
                                                        Privacy Policy
                                                    </Link>
                                                </li>
                                                <li className="header__sub--menu__items">
                                                    {
                                                        user?.success === true ?
                                                            <Link to="/wishlist" className="header__sub--menu__link">
                                                                My Wishlist
                                                            </Link>
                                                            : ""
                                                    }
                                                </li>
                                                <li className="header__sub--menu__items">
                                                    <Link
                                                        to="/brands"
                                                        className="header__sub--menu__link"
                                                    >
                                                        Brands
                                                    </Link>
                                                </li>
                                                <li className="header__sub--menu__items">
                                                    <Link
                                                        to="/vehicles"
                                                        className="header__sub--menu__link"
                                                    >
                                                        Vehicle
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="header__account">
                                <ul className="header__account--wrapper d-flex align-items-center">
                                    <li className="header__account--items  header__account--search__items">
                                        <p style={{ cursor: "pointer" }}>
                                            <span className="visually-hidden">Search</span>
                                            {/* <input type='text' placeholder='Search Here...' className='search_box' value={search} onChange={handleSearchClick} /> */}
                                            <AiOutlineSearch style={{ fontSize: "28px" }} onClick={handleToggleDrawer} />
                                        </p>
                                    </li>

                                    <li className="header__account--items d-none d-lg-block">
                                        <Link className="header__account--btn" to="/wishlist">
                                            <AiOutlineHeart style={{ fontSize: "28px" }} />
                                            {
                                                add_wish?.length !== 0 ? <span className="items__count">{add_wish.length}</span> : ""
                                            }
                                        </Link>
                                    </li>
                                    <li className="header__account--items d-none d-lg-block">
                                        <a
                                            className="header__account--btn minicart__open--btn"
                                            href="/cart"
                                        >
                                            <AiOutlineShoppingCart style={{ fontSize: "28px" }} />
                                            {
                                                user?.success !== true ?
                                                    <>
                                                        {
                                                            addto_cart?.length !== 0 ? <span className="items__count">{addto_cart?.length}</span> : ""
                                                        }
                                                    </> :
                                                    <>
                                                        {
                                                            login_cart?.length !== 0 ? <span className="items__count">{login_cart?.length}</span> : ""
                                                        }
                                                    </>
                                            }
                                        </a>
                                    </li>
                                    <li className="header__account--items d-none d-lg-block">
                                        {
                                            user?.success !== true ?
                                                <a className="header__account--btn" href="/login">
                                                    <IoMdContact style={{ fontSize: "28px" }} />
                                                </a>
                                                : <a className="header__account--btn" onClick={handleLogout}>
                                                    <AiOutlineLogout style={{ fontSize: "28px", color: "#363062" }} />
                                                </a>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {
                    <div className={search.length > 0 && allData.length > 0 ? 'search_barview' : ""}>
                        {allData.length > 0 &&
                            search.length > 0 &&
                            allData.map((e, index) => {
                                return (
                                    <div key={index}>
                                        <p>{e?.name}</p>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>
                } */}

                {/* Start Offcanvas stikcy toolbar */}
                <div className="offcanvas__stikcy--toolbar">
                    <ul className="d-flex justify-content-between text-center">
                        <li className="offcanvas__stikcy--toolbar__list">
                            <a className="offcanvas__stikcy--toolbar__btn" href="/">

                                <AiOutlineHome style={{ fontSize: "20px" }} />
                                <span className="offcanvas__stikcy--toolbar__label">Home</span>
                            </a>
                        </li>
                        <li className="offcanvas__stikcy--toolbar__list">
                            <a className="offcanvas__stikcy--toolbar__btn" href="/market-place">
                                <BsShop style={{ fontSize: "20px" }} />
                                <span className="offcanvas__stikcy--toolbar__label">Market Place</span>
                            </a>
                        </li>
                        <li className="offcanvas__stikcy--toolbar__list ">
                            {/* <a
                                className="offcanvas__stikcy--toolbar__btn search__open--btn"
                                href="/"
                                data-offcanvas=""
                            >
                            </a> */}
                            <AiOutlineSearch style={{ fontSize: "22px" }} onClick={handleToggleDrawer} />
                            <span className="offcanvas__stikcy--toolbar__label">Search</span>
                        </li>
                        <li className="offcanvas__stikcy--toolbar__list">
                            <Link className="offcanvas__stikcy--toolbar__btn" to="/wishlist">
                                <AiOutlineHeart style={{ fontSize: "24px" }} />
                                <span className="offcanvas__stikcy--toolbar__label">Wishlist</span>
                                {
                                    add_wish?.length !== 0 ? <span className="items__count">{add_wish?.length}</span> : ""
                                }
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Start serch box area */}
                <div className="predictive__search--box ">
                    <div className="predictive__search--box__inner">
                        <h2 className="predictive__search--title">Search Products</h2>
                        <form className="predictive__search--form" action="#">
                            <label>
                                <input
                                    className="predictive__search--input"
                                    placeholder="Search Here"
                                    type="text"
                                />
                            </label>
                            <button
                                className="predictive__search--button text-white"
                                aria-label="search button"
                            >
                                <svg
                                    className="product__items--action__btn--svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30.51"
                                    height="25.443"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeMiterlimit={10}
                                        strokeWidth={32}
                                    />
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeMiterlimit={10}
                                        strokeWidth={32}
                                        d="M338.29 338.29L448 448"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <button
                        className="predictive__search--close__btn"
                        aria-label="search close"
                        data-offcanvas=""
                    >
                        <svg
                            className="predictive__search--close__icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="40.51"
                            height="30.443"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={32}
                                d="M368 368L144 144M368 144L144 368"
                            />
                        </svg>
                    </button>
                </div>

                {/* start toggle open */}
                <div className="toggle_open">
                    <Drawer
                        open={isOpen}
                        onClose={toggleDrawer}
                        direction='left'
                        className='bla bla bla'
                    >
                        <div className="offcanvas__inner">
                            <div className="offcanvas__logo">
                                <a className="offcanvas__logo_link" href="/">
                                    <img
                                        src="assets/img/logo/logonew.png"
                                        alt="Grocee Logo"
                                        width={158}
                                        height={36}
                                    />
                                </a>
                                <AiOutlineClose style={{ fontSize: "24px" }} onClick={toggleClose} />
                            </div>
                            <nav className="offcanvas__menu">
                                <ul className="offcanvas__menu_ul">
                                    <li className="offcanvas__menu_li">
                                        <Link className="offcanvas__menu_item" to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="offcanvas__menu_li">
                                        <Link className="offcanvas__menu_item" to="/market-place">
                                            Market Place
                                        </Link>
                                    </li>
                                    <li className="offcanvas__menu_li">
                                        <Link className="offcanvas__menu_item" to="/">
                                            My Account
                                        </Link>
                                    </li>
                                    <li className="offcanvas__menu_li">
                                        <Link className="offcanvas__menu_item" to="/privacy-policy">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                </ul>
                                <div className="offcanvas__account--items">
                                    {
                                        user?.success !== true ?
                                            <>
                                                <Link
                                                    to="/login"
                                                    className="offcanvas__account--items__btn d-flex align-items-center"
                                                >
                                                    <span className="offcanvas__account--items__icon">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20.51"
                                                            height="19.443"
                                                            viewBox="0 0 512 512"
                                                        >
                                                            <path
                                                                d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={32}
                                                            />
                                                            <path
                                                                d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeMiterlimit={10}
                                                                strokeWidth={32}
                                                            />
                                                        </svg>
                                                    </span>
                                                    <span className="offcanvas__account--items__label">
                                                        Login / Register
                                                    </span>
                                                </Link>
                                            </>
                                            :
                                            <>
                                                <Link onClick={handleLogout}>
                                                    <span className="offcanvas__account--items__label">
                                                        Logout
                                                    </span>
                                                </Link>
                                            </>
                                    }
                                </div>
                            </nav>
                        </div>
                    </Drawer>
                </div>
            </header>
        </>
    )
}

export default Header