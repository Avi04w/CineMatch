import React, {useEffect, useState} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
// import ApiFetcher from '../ApiFetcher';

export default function TextCarousel() {

    const [data, setdata] = useState({
        movie1: "Batman Begins",
        movie2: "The Bourne Ultimatum",
        movie3: "The Dark Knight Rises",
        movie4: "Man of Steel",
        movie5: "Suicide Squad",
        movie6: "Watchmen",
        movie7: "Interstellar",
        movie8: "The Equalizer",
        movie9: "L.A. Confidential",
        movie10: "Straight Outta Compton",
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
        naturalSlideWidth={300}
        naturalSlideHeight={300}
        totalSlides={10}
      >
        <Slider>
          <Slide index={0}><p>{data.movie1}</p></Slide>
          <Slide index={1}><p>{data.movie2}</p></Slide>
          <Slide index={2}><p>{data.movie3}</p></Slide>
          <Slide index={3}><p>{data.movie4}</p></Slide>
          <Slide index={4}><p>{data.movie5}</p></Slide>
          <Slide index={5}><p>{data.movie6}</p></Slide>
          <Slide index={6}><p>{data.movie7}</p></Slide>
          <Slide index={7}><p>{data.movie8}</p></Slide>
          <Slide index={8}><p>{data.movie9}</p></Slide>
          <Slide index={9}><p>{data.movie10}</p></Slide>
        </Slider>

        <ButtonBack className="button-1">Back</ButtonBack>
        <ButtonNext className="button-1">Next</ButtonNext>
      </CarouselProvider>
      </div>
    );
  
}