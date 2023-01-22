import './Recs.css';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// import ImageSlider from '..//Components/ImageSlider';
import TextCarousel from './TextCarousel';



function Recs() {    
    return (
        <div className='container'>
            <div class='center'>
                <div className='carousel'>
                    <TextCarousel />
                </div>
                <div>
                    <Link to="/"><button className="button-1">Go Home</button></Link>
                </div>
            </div>
        </div>
    )
}
export default Recs;