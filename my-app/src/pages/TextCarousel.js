import React, {useEffect, useState} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
// import ApiFetcher from '../ApiFetcher';

export default function TextCarousel() {

    const [data, setdata] = useState({
        movie1: "",
        movie2: "",
        movie3: "",
        movie4: "",
        movie5: "",
        movie6: "",
        movie7: "",
        movie8: "",
        movie9: "",
        movie10: "",
    });

    // const apiCall = async () => {
    //     const fetchVal =  await fetch("/data");
    //     console.log(fetchVal)
    //     const getData = await fetchVal.json()
    //     // console.log(getData)
    // }

    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/data").then((res) => {
            console.log("RES=",res)
            res.json().then((data) => {
                console.log("data=",data)
                setdata({
                // Setting a data from api            
                    movie1: data.Movies.Movie1.name,
        
                    movie2: data.Movies.Movie2.name,
        
                    movie3: data.Movies.Movie3.name,
                    
                    movie4: data.Movies.Movie4.name,
                    
                    movie5: data.Movies.Movie5.name,
                    
                    movie6: data.Movies.Movie6.name,
                    
                    movie7: data.Movies.Movie7.name,
                    
                    movie8: data.Movies.Movie8.name,
                    
                    movie9: data.Movies.Movie9.name,
        
                    movie10: data.Movies.Movie10.name
                });
            })
        })
    }, []);
    
    console.log(data)

    return (
    <div class='text'>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={10}
      >
        <Slider>
          <Slide index={0}><p>movie1 and a lot of text as place holders</p></Slide>
          <Slide index={1}><p>{data.movie1}</p></Slide>
          <Slide index={2}><p>movie3</p></Slide>
          <Slide index={3}><p>movie4</p></Slide>
          <Slide index={4}><p>movie5</p></Slide>
          <Slide index={5}><p>movie6</p></Slide>
          <Slide index={6}><p>movie7</p></Slide>
          <Slide index={7}><p>movie8</p></Slide>
          <Slide index={8}><p>movie9</p></Slide>
          <Slide index={9}><p>movie10</p></Slide>
        </Slider>

        <ButtonBack className="button-1">Back</ButtonBack>
        <ButtonNext className="button-1">Next</ButtonNext>
      </CarouselProvider>
      </div>
    );
  
}