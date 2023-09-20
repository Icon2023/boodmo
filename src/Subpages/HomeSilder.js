import React from 'react'

const HomeSilder = () => {
    return (
        <>
            <section className="hero__slider--section">
                <div className="slider__thumbnail--style5 position-relative">
                    <img
                        className="slider__thumbnail--img__style5"
                        src="assets/img/slider/home5-slider-thumb.webp"
                        alt="slider-img"
                    />
                    <div className="hero__content--style5 text-center">
                        <h2 className="hero__content--style5__title h1">
                            Comes Width The <br />{" "}
                            <span className="text__secondary">Ultimate Protection</span>
                        </h2>
                    </div>
                    {/* Start search filter area */}
                    <div className="search__filter--section search__filter--style5">
                        <div className="container">
                            <div className="section__heading style2 text-center mb-30">
                                <h2 className="section__heading--maintitle">Search by Vehicle</h2>
                                <p className="section__heading--desc">
                                    Filter your results by entering your Vehicle to ensure you find
                                    the parts that fit.
                                </p>
                            </div>
                            <div className="search__filter--inner style5">
                                <form className="search__filter--form__style2 d-flex" action="#">
                                    <div className="search__filter--select select search__filter--width">
                                        <select className="search__filter--select__field">
                                            <option selected="" value={1}>
                                                Select Make
                                            </option>
                                            <option value={2}>Brake Calipers </option>
                                            <option value={3}>Engine Oil </option>
                                            <option value={4}>Motor Oil </option>
                                            <option value={5}>Oil Filters </option>
                                        </select>
                                    </div>
                                    <div className="search__filter--select select search__filter--width">
                                        <select className="search__filter--select__field">
                                            <option selected="" value={1}>
                                                Select Model
                                            </option>
                                            <option value={2}>Toyota Combo </option>
                                            <option value={3}>Model 2022 </option>
                                            <option value={4}>Air Boxes</option>
                                        </select>
                                    </div>
                                    <div className="search__filter--select select search__filter--width">
                                        <select className="search__filter--select__field">
                                            <option selected="" value={1}>
                                                Choose Year
                                            </option>
                                            <option value={2}>Year 2020 </option>
                                            <option value={3}>Year 2022 </option>
                                            <option value={4}>Year 2024</option>
                                            <option value={5}>Year 2026 </option>
                                        </select>
                                    </div>
                                    <div className="search__filter--select select search__filter--width">
                                        <select className="search__filter--select__field">
                                            <option selected="" value={1}>
                                                Select Class
                                            </option>
                                            <option value={2}>Class One </option>
                                            <option value={3}>Class Two </option>
                                            <option value={4}>Class Three </option>
                                            <option value={5}>Class Four </option>
                                        </select>
                                    </div>
                                    <div className="search__filter--select select search__filter--width">
                                        <select className="search__filter--select__field">
                                            <option selected="" value={1}>
                                                Select Type
                                            </option>
                                            <option value={2}>Tail Lights</option>
                                            <option value={3}>Car Covers</option>
                                            <option value={4}>Hoods</option>
                                            <option value={5}>Bumpers</option>
                                        </select>
                                    </div>
                                    <div className="search__filter--width">
                                        <button
                                            className="search__filter--btn primary__btn"
                                            type="submit"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* End search filter area */}
                </div>
            </section>
        </>
    )
}

export default HomeSilder