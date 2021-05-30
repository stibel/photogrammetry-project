import React from "react";
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useStyle } from '../contexts/StyleContext';

//Fisher-Yates shuffle algorithm
const shuffle = array => {
    let i, j, x;

    for (i = array.length - 1; i > 0; --i) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

const zoomOutProperties = {
    duration: 2000,
    transitionDuration: 500,
    infinite: true,
    scale: 0.4,
    arrows: false
};

const Slideshow = ({ data }) => {

    //random order of images for some variety
    const images = shuffle(data);
    const { curStyle } = useStyle();

    return (
        <div style={{
            ...curStyle,
            marginTop: '10vh',
            width: '35vw',
            backgroundColor: 'inherit',
            justifyContent: 'center',
            filter: `drop-shadow(0 0 1vh ${curStyle.colours.stripes})`
        }}>
            <Zoom {...zoomOutProperties}>
                {
                    images.map(
                        (slide) =>
                            <div key={slide.id}>
                                <img style={{ padding: "0", margin: "0", width: "30vw", borderRadius: '5%'}} src={slide.image} alt={"slide"} />
                                <div style={{
                                    padding: '1%',
                                    display: 'flex',
                                    flexFlow: 'column',
                                    justifyContent: 'center',
                                    fontFamily: curStyle.fonts.family,
                                    color: curStyle.colours.stripes,
                                    fontSize: curStyle.fonts.size.m,
                                    textAlign: 'center',
                                    alignItems: 'center'
                                }}>
                                    {slide.desc}
                                </div>
                            </div>
                    )
                }
            </Zoom>
        </div>
    )
};

export default Slideshow;