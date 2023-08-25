import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import languages from './images/programming-languages.png';
import 'bulma/css/bulma.css';
import './ProfileCard.css';
// An about us section to introduce the company
function AboutUs(){
    return (
        <div>
            <nav className="navbar custom-navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <Link to="/">
                            <img className="logo-image" src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="navbar-links">
                        <a href="/" className="navbar-link">
                            Home
                        </a>
                        <a href="/aboutus" className="navbar-link">
                            About Us
                        </a>
                        <a href="/admin" className="navbar-link">
                            Admin
                        </a>
                    </div>
                </div>
            </nav>
                
            <section className="section">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <h1 className="title has-text-centered">About Us</h1>
                            <div className="content has-text-centered">
                                <p className="is-size-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
                                    ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                                </p>
                                <img src={languages} alt="Image" style={{ width: '100%' }} />
                                <p className="is-3"></p>
                                <p className="is-size-4">
                                    Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at
                                    dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.
                                    Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia
                                    aliquet. Mauris ipsum.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
