import React from 'react';
import 'bulma/css/bulma.css';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div>
            <div className="columns is-centered has-background-grey-lighter">
                <div className="column is-one-third-widescreen">
                    <section className="hero is-warning">
                        <div className="hero-body columns is-centered">
                            <p className="title pb-6">
                                <h1 className="title-text">Welcome to the Survey Home Page</h1>
                            </p>
                        </div>
                    </section>
                    <div className="card">
                        <div className="card-content">
                            <p className="pb-6"></p>
                            <div>
                                <div className="card">
                                    <div className="card-content">
                                    <Link to="/profile/1">
                                            <button className="button is-primary" value="1">Survey 1</button>
                                            
                                    </Link>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-content">
                                    <Link to="/profile/2">
                                            <button className="button is-primary" value="2">Survey 2</button>
                                    </Link>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-content">
                                    <Link to="/profile/3">
                                            <button className="button is-primary" value="3">Survey 3</button>
                                    </Link>
                                    </div>
                                </div>
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
