import React, { useEffect, useState } from 'react'
import { CarCompines, CarMode, CarModel, CarYear } from '../../Services/apiServices'

const HomeSilder = () => {
    const [carName, setCarName] = useState([]);
    const [carValName, setCarValName] = useState('');

    const [carModel, setCarModel] = useState([]);
    const [carValModel, setCarValModel] = useState('')

    const [carYear, setCarYear] = useState([]);
    const [carValYear, setCarValYear] = useState('')

    const [carModei, setCarModei] = useState([]);
    const [carValModei, setValModei] = useState('')

    useEffect(() => {
        CarCompines().then((res) => {
            setCarName(res?.data)
        })
    }, [])

    const handleChange = (e) => {
        setCarValName(e.target.value)
        CarModel(e.target.value).then((res) => {
            setCarModel(res?.data)
        })
    }

    const handleChange1 = (e) => {
        setCarValModel(e.target.value)
        let val = e.target.value
        setCarValYear(val)
        CarYear({ carValName, val }).then((res) => {
            setCarYear(res?.data)
            console.log(res?.data);
        })
    }

    const handleChange2 = (e) => {
        setValModei(e.target.value)
        let val = e.target.value
        console.log({ carValName, carValYear, val });
        CarMode({ carValName, carValYear, val }).then((res) => {
            setCarModei(res?.data)
            console.log(res?.data);
        })
    }

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
                                        <select className="search__filter--select__field" onChange={handleChange}>
                                            <option selected="" value={0}>
                                                Select Car Maker
                                            </option>
                                            {
                                                carName.map((e, index) => {
                                                    return (
                                                        <option value={e?.id} key={index} >{e?.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="search__filter--select select search__filter--width">
                                        <select className="search__filter--select__field" disabled={carValName.length <= 0 ? true : false} onChange={handleChange1}>
                                            <option selected="" value={0}>
                                                Select Model
                                            </option>
                                            {
                                                carModel.map((e, index) => {
                                                    return (
                                                        <option value={e?.id} key={index}>{e?.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="search__filter--select select search__filter--width">
                                        <select className="search__filter--select__field"  disabled={carValModel.length <= 0 ? true : false} onChange={handleChange2}>
                                            <option selected="" value={0}>
                                                Choose Year
                                            </option>
                                            {
                                                carYear.map((e, index) => {
                                                    return (
                                                        <option value={e?.id} key={index} >{e?.year}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="search__filter--select select search__filter--width">
                                        <select className="search__filter--select__field" disabled={carValModei.length <= 0 ? true : false} >
                                            <option selected="" value={0}>
                                                Select Class
                                            </option>
                                            {
                                                carModei.map((e, index) => {
                                                    return (
                                                        <option value={e?.id} key={index} >{e?.modification}</option>
                                                    )
                                                })
                                            }
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