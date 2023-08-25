import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import jsonData from './surveyAll.json';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import './ProfileCard.css'; 

function LandingPage() {
    let count = 0;
    // State variable
    const [startIndex, setStartIndex] = useState(0); 

    // Function to move to the next set of surveys
    const handleNextClick = () => {
        const surveysCount = Object.keys(jsonData).length;
        setStartIndex((prevIndex) => (prevIndex + 1) % surveysCount); 
    };

    // Function to move to the previous set of surveys
    const handlePrevClick = () => {
        const surveysCount = Object.keys(jsonData).length;
        setStartIndex((prevIndex) =>
            (prevIndex - 1 + surveysCount) % surveysCount 
        );
    };
    return (
        
        <div>
            <div class="navbar custom-navbar">
                <div class="navbar-container">
                    <div class="navbar-logo">

                        <Link to="/" >
                            <img className="logo-image" src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div class="navbar-links">
                        <a href="/" class="navbar-link">Home</a>
                        <a href="/aboutus" class="navbar-link">About Us</a>
                        <a href="/admin" className="navbar-link">
                            Admin
                        </a>
                    </div>

                </div>
            </div>
            <div className="blur-background-main columns is-centered">
                <div className="column is-three-quarters-widescreen">
                    <section className="hero is-warning">
                        <div className="hero-body columns is-centered">
                            <p className="title pb-6">
                                <h1 className="title-text">Welcome to the Survey Home Page</h1>
                            </p>
                        </div>
                    </section>
                    <div className="card">
                        <div className="card-content ">
                            <p className="pb-6"></p>
                            <div className="question-container">
                                {/* Displays all the surveys from the json file*/}
                                {Object.keys(jsonData).map((surveyKey, index) => {
                                    if (index < startIndex || index >= startIndex + 3) {
                                        // Only show surveys within the visible range
                                        return null;
                                    }
                                    const survey = jsonData[surveyKey];
                                    count = count + 1;
                                    return (
                                        <div key={surveyKey} className="card question-outsidecontainer mb-3">
                                            <div className="card-content buttons is-centered">
                                                <div className ="custom-div mb-3">
                                                    {survey.testName}
                                                </div>
                                                <div className="image-container">
                                                    <img
                                                        src={survey.ImageURL}
                                                        alt={survey.testName}
                                                        className="survey-image"
                                                    />
                                                </div>
                                                <p className="survey-description pb-4">{survey.Description}</p>
                                                <Link to={`/profile/${index+1}`}>
                                                    <button className="button is-primary" value={index+1}>
                                                        Survey {index+1}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="carousel-controls">
                                {startIndex > 0 && (
                                    <button className="carousel-control-button left" onClick={handlePrevClick}>
                                        &lt; {/* Left arrow */}
                                    </button>
                                )}
                                {startIndex + 3 < Object.keys(jsonData).length && (
                                    <button className="carousel-control-button right" onClick={handleNextClick}>
                                        &gt; {/* Right arrow */}
                                    </button>
                                )}
                            </div>
                            <p className="pb-6"></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LandingPage;
