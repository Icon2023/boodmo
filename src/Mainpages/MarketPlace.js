import React, { useEffect, useState } from "react";
import data from '../Products.json';

//     {
//         title: "Dune",
//         desc: "Frank Herbert",
//         id: "1965",
//         image: bearings,
//     },
//     {
//         title: "Ender's Game",
//         desc: "Orson Scott Card",
//         id: "1985",
//         image: parts,
//     },
//     {
//         title: "The Hitchhiker's Guide to the Galaxy",
//         desc: "Douglas Adams",
//         id: "1979",
//         image: ac,
//     },
//     {
//         title: "1984",
//         desc: "George Orwell",
//         id: "1949",
//         image: pads,
//     },
//     {
//         title: "Brave New World",
//         desc: "Aldous Huxley",
//         id: "1932",
//         image: cylinders,
//     },
//     {
//         title: "Foundation",
//         desc: "Isaac Asimov",
//         id: "1951",
//         image: beading,
//     },
//     {
//         title: "Neuromancer",
//         desc: "William Gibson",
//         id: "1984",
//         image: door,
//     },
//     {
//         title: "Snow Crash",
//         desc: "Neal Stephenson",
//         id: "1992",
//         image: "https://example.com/snowcrash.jpg",
//     },
//     {
//         title: "The Martian",
//         desc: "Andy Weir",
//         id: "2011",
//         image: "https://example.com/themartian.jpg",
//     },
//     {
//         title: "Ready Player One",
//         desc: "Ernest Cline",
//         id: "2011",
//         image: "https://example.com/readyplayerone.jpg",
//     },
//     {
//         title: "Fahrenheit 451",
//         desc: "Ray Bradbury",
//         id: "1953",
//         image: "https://example.com/fahrenheit451.jpg",
//     },
//     {
//         title: "The War of the Worlds",
//         desc: "H.G. Wells",
//         id: "1898",
//         image: "https://example.com/thewaroftheworlds.jpg",
//     },
//     {
//         title: "I, Robot",
//         desc: "Isaac Asimov",
//         id: "1950",
//         image: "https://example.com/irobot.jpg",
//     },
//     {
//         title: "The Time Machine",
//         desc: "H.G. Wells",
//         id: "1895",
//         image: "https://example.com/thetimemachine.jpg",
//     },
//     {
//         title: "The Hunger Games",
//         desc: "Suzanne Collins",
//         id: "2008",
//         image: "https://example.com/thehungergames.jpg",
//     },
//     {
//         title: "The Maze Runner",
//         desc: "James Dashner",
//         id: "2009",
//         image: "https://example.com/themazerunner.jpg",
//     },
//     {
//         title: "Divergent",
//         desc: "Veronica Roth",
//         id: "2011",
//         image: "https://example.com/divergent.jpg",
//     },
//     {
//         title: "The Giver",
//         desc: "Lois Lowry",
//         id: "1993",
//         image: "https://example.com/thegiver.jpg",
//     },
//     {
//         title: "Ender's Shadow",
//         desc: "Orson Scott Card",
//         id: "1999",
//         image: "https://example.com/endersshadow.jpg",
//     },
//     {
//         title: "Jurassic Park",
//         desc: "Michael Crichton",
//         id: "1990",
//         image: "https://example.com/jurassicpark.jpg",
//     },
//     {
//         title: "The Andromeda Strain",
//         desc: "Michael Crichton",
//         id: "1969",
//         image: "https://example.com/andromedastrain.jpg",
//     },
//     {
//         title: "I Am Legend",
//         desc: "Richard Matheson",
//         id: "1954",
//         image: "https://example.com/iamlegend.jpg",
//     },
//     {
//         title: "The Stand",
//         desc: "Stephen King",
//         id: "1978",
//         image: "https://example.com/thestand.jpg",
//     },
//     {
//         title: "The Lord of the Rings",
//         desc: "J.R.R. Tolkien",
//         id: "1954",
//         image: "https://example.com/thelordoftherings.jpg",
//     },
//     {
//         title: "The Hobbit",
//         desc: "J.R.R. Tolkien",
//         id: "1937",
//         image: "https://example.com/thehobbit.jpg",
//     },
//     {
//         title: "Harry Potter and the Sorcerer's Stone",
//         desc: "J.K. Rowling",
//         id: "1997",
//         image: "https://example.com/harrypotter.jpg",
//     },
//     {
//         title: "The Chronicles of Narnia",
//         desc: "C.S. Lewis",
//         id: "1950",
//         image: "https://example.com/narnia.jpg",
//     },
//     {
//         title: "A Wrinkle in Time",
//         desc: "Madeleine L'Engle",
//         id: "1962",
//         image: "https://example.com/awrinkleintime.jpg",
//     },
//     {
//         title: "The War of the Worlds",
//         desc: "H.G. Wells",
//         id: "1898",
//         image: "https://example.com/thewaroftheworlds.jpg",
//     },
// ];

const MarketPlace = () => {
    const [scroll, setScroll] = useState(false);
    const [product, setProducts] = useState([]);

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
    }, []);

    useEffect(() => {
        setProducts(data)
    }, [])
    return (
        <>
            <div className="wrapper">
                <div className={`${scroll ? "header__sidebar " : "sidebar"}`}>
                    <h2>MarketPlace</h2>
                    <h3 className="mt-5">Auto Parts</h3>
                    <h3 className="mt-2">Cars</h3>
                </div>
                <div className="main">
                    <h2>Auto Parts</h2>
                    <div className="row">
                        {product?.data?.map((e, index) => {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-4" key={index}>
                                    <div className="pro_card">
                                        <img src={e.image} />
                                        <hr />
                                        <h5 className="ps-3" style={{ fontWeight: "bold", fontSize: "20px" }}>{e.title}</h5>
                                        <p className="ps-3">
                                            {e.desc}
                                        </p>
                                        <button className="">Buy Now</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarketPlace;
