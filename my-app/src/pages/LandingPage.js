import './LandingPage.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import logo from './Images/Logo1.png'


function LandingPage() {
    const [file, setFile] = useState();

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload() {
        saveAs(file, 'NetflixViewingHistory.csv')
    }
    
    return (
        <div className='container'>
            <div>
                <img className="logo" src= {logo} alt="logo"/>
                <div className='headers'>
                    <h1>How to personalize your movie recommendations:</h1>
                </div>
                <ol className='list'>
                    <li>Go to your netflix account page</li>
                    <li>Click the profile & parental controls settings for the profile you want to see</li>
                    <li>Open your viewing activity</li>
                    <li>Press Download All from the bottom of the page</li>
                    <li>Insert your downloaded CSV file into the box above</li>
                </ol>
            </div>
            <input type="file" onChange={handleFileChange} className="button-1"/>
            <Link to='recs'><button onClick={handleUpload} className="button-1">
                Upload Movie History
            </button></Link>
        </div>
      )
}

export default LandingPage;