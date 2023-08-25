import React, { useState } from 'react';
import jsonData from './surveyAll.json';
import 'bulma/css/bulma.css';
import Modal from './Modal';
import logo from './images/logo.png';
import './ProfileCard.css'; // Import the custom CSS file
import { Link, useParams } from 'react-router-dom';

function extractNumbersFromString(string) {
    const numbers = string.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
}

function ProfileCard() {
    // State variables
    const { value } = useParams();
    const surveyName = Object.keys(jsonData)[value-1];
    const data = jsonData[surveyName];
    const suggestionKeys = Object.keys(data.Suggestions);
    const suggestionValues = Object.values(data.Suggestions);

    const [selectedOptions, setSelectedOptions] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showRes, setShowRes] = useState(false);
    const [suggestionText, setSuggestionText] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState('');

    const [emailStatus, setEmailStatus] = useState(null); 
    const [showEmailModal, setShowEmailModal] = useState(false);

    // Function to set some state variables
    const handleEmailSent = (val) => {
        setEmailStatus(val);
        setShowEmailModal(true);
    };

    // Close the modal
    const handleEmailModalClose = () => {
        setShowEmailModal(false);
    };

    const setOptionValue = (questionId, optionPoints) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [questionId]: {
                questionId,
                optionPoints,
            },
        }));
    };

    // Submit button function 
    const handleSubmit = () => {
        if (Object.keys(selectedOptions).length !== data.Questions.length) {
            console.log('You have not selected all the fields');
            setShowRes(false);
            return;
        }

        const sumPoints = Number(Object.values(selectedOptions).reduce((total, option) => total + option.optionPoints, 0));
        const selectedQuestions = Object.values(selectedOptions).map(option => {
            const question = data.Questions.find(q => q.id === option.questionId);
            const selectedAnswer = question.answers.find(answer => answer.points === option.optionPoints);
            return `${question.question}: ${selectedAnswer.value}`;
        });
        setSelectedQuestions(selectedQuestions);

        console.log("Total points: "+sumPoints);
        for (let i = 0; i < suggestionKeys.length; i++) {
            const numArr = extractNumbersFromString(suggestionKeys[i]);

            if (sumPoints >= numArr[0] && sumPoints <= numArr[1]) {
                console.log(suggestionValues[i]);
                setSuggestionText(suggestionValues[i]);
            }
        }
        setShowRes(true);
        setSelectedOptions({});
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const isSubmitDisabled = Object.keys(selectedOptions).length !== data.Questions.length;
    return (
        <div>
            <div className="navbar custom-navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">

                        <Link to="/" >
                            <img className="logo-image" src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="navbar-links">
                        <a href="/" className="navbar-link">Home</a>
                        <a href="/aboutus" className="navbar-link">About Us</a>
                        <a href="/admin" className="navbar-link">
                            Admin
                        </a>
                    </div>
                </div>
            </div>

            <div className="columns is-mobile  is-centered">
                
                <div className={`column ${window.innerWidth <= 768 ? 'is-four-fifths' : 'is-three-fifths'}`}>
                    <section className="hero is-warning ">
                        <div className="hero-body">
                            <p className="title">{data.testName}</p>
                        </div>
                    </section>
                    <div className="card srquestion-container">
                        {/* Loops through the questions*/}
                        {data.Questions.map((question) => (
                            <div key={question.id}>
                                <div className="card-content border-question">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="subtitle is-4 ">{question.id+1}. {question.question}</p>
                                        </div>
                                    </div>
                                    {/* Loops through the answers of one question*/}
                                    {question.answers.map((answer, index) => (
                                        <div key={index}>
                                            <p className="subtitle is-5 pb-4 pl-5">
                                                <label className="radio">
                                                    <input
                                                        type="radio"
                                                        value={answer.points}
                                                        name={`radioPoint${question.id}`}
                                                        data-label={String.fromCharCode(65 + index)}
                                                        checked={selectedOptions[question.id]?.optionPoints === answer.points}
                                                        onChange={() => {
                                                            setOptionValue(question.id, answer.points);
                                                        }}
                                                    />
                                                    {answer.value}
                                                </label>
                                            </p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        ))}
                        <p className="pb-5"></p>
                        <div className="columns is-mobile is-centered mt-4">
                            <div className="buttons">
                                <button className={`button is-primary ${window.innerWidth <= 768 ? 'is-normal' : 'is-large'}`} onClick={handleSubmit} disabled={isSubmitDisabled}>
                                    Submit
                                </button>
                            </div>
                        </div>
                        {showRes && showModal && <Modal onClose={handleCloseModal} suggestionText={suggestionText} selectedQuestions={selectedQuestions} handleEmailSent={handleEmailSent}/>}
                        <p className="pb-5"></p>
                    </div>
                </div>
               
            </div>
            {/* Confirmation modal*/}
            {showEmailModal && (
                <div className={`modal ${emailStatus ? 'is-success' : 'is-danger'} is-active`}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{emailStatus ? 'Email Sent Successfully' : 'Error Sending Email'}</p>
                            <button className="delete" aria-label="close" onClick={handleEmailModalClose}></button>
                        </header>
                        <section className="modal-card-body">
                            <div className="content">
                                <p>{emailStatus ? 'Your email has been sent successfully.' : 'There was an error sending your email.'}</p>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-primary" onClick={handleEmailModalClose}>Okay</button>
                        </footer>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ProfileCard;