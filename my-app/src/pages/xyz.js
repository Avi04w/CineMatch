import React, { useState, useEffect } from "react";

import fs from 'fs';


function LandingPage() {
    const [file, setFile] = useState(null);
  
    function handleUpload() {
        console.log("FOOOOO");
      // Use the saveAs function to save the file to the user's computer
        // const directory = '/Users/azlannaeem/ProgrammingProjects/MovieMemoir/backend';
        const directory = '//Users//aviwalia//Documents//UofT';
        

        fs.writeFile(`${directory}/${"NetflixViewingHistory"}`, file, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("The file was saved!");
        });
    }

    return (
        <div className="background">
            <h1>How to personalize your movie recommendations:</h1>
        
            <li>Step 1: Go to your netflix account page</li>
            <li>Step 2: Click the profile & parental controls settings for the profile you want to see</li>
            <li>Step 3: Open your viewing activity</li>
            <li>Step 4: Press Download All from the bottom of the page</li>
            <li>Step 5: Insert your downloaded CSV file into the box above</li>

            <><input type="file" onChange={() => handleFileChange()} />
            <button disabled={false} onClick={() => handleUpload()}>Save to computer</button></>
            <button 
                disabled={false} 
                onChange={() => console.log("HAHAHAHA")}
                onClick={() => console.log("dummy button")}>
                    Dummy button
            </button>
        </div>
    );
}

export default LandingPage;