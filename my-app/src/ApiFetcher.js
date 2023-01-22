import React, { useEffect, useState } from 'react';

function ApiFetcher(){
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

    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/data").then((res) =>
            res.json().then((data) => {
                console.log("RES=",data)
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
        }));
    }, []);

    return (
        data
    )
}

export default ApiFetcher;