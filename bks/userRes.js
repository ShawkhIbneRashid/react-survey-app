import React, { useState } from 'react';
import data from './modAdminResponse.json';
import 'bulma/css/bulma.css';
import Modal from './Modal';

const suggestionKeys = Object.keys(data.Suggestions);
const suggestionValues = Object.values(data.Suggestions);
const qLength = data.Questions.length;

console.log(qLength);

var valPoint1;
var valPoint2;
var valPoint3;
var sumPoints = 0;

function extractNumbersFromString(string) {
    const numbers = string.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
}

var numArr = [];

function ProfileCard() {
    const [selectedOptions, setSelectedOption] = useState({
        1: -1,
        2: -1,
        3: -1,
    });
    const [showModal, setShowModal] = useState(false);
    const [showRes, setShowRes] = useState(false);
    const [suggestionText, setSuggestionText] = useState('');

    const setVals = (val1, val2, val3) => {
        valPoint1 = val1;
        valPoint2 = val2;
        valPoint3 = val3;
        console.log(valPoint1, valPoint2, valPoint3);
    };


    const handleSubmit = () => {
        // Handle form submission or further processing of selected options
        if (valPoint1 == -1 || valPoint2 == -1 || valPoint3 == -1) {
            console.log("You have not selected all the fields");
            setShowRes(false);
        }
        else {
            sumPoints = Number(valPoint1) + Number(valPoint2) + Number(valPoint3);
            console.log(sumPoints);
            for (var i = 0; i < suggestionKeys.length; i++) {

                numArr = extractNumbersFromString(suggestionKeys[i]);

                if (sumPoints > numArr[0] && sumPoints < numArr[1]) {
                    console.log(suggestionValues[i]);
                    setSuggestionText(suggestionValues[i]);
                }  
            }
            setShowRes(true);
            setSelectedOption({
                1: -1,
                2: -1,
                3: -1,
            });
        }
        // Show the modal after submitting
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isSubmitDisabled = Object.values(selectedOptions).includes(-1);

    return (
        <div>
            <div className="columns is-mobile is-centered has-background-grey-lighter">
                <div className="column is-one-third-widescreen">
                    <section className="hero is-warning">
                        <div className="hero-body">
                            <p className="title">{data.testName}</p>
                        </div>
                    </section>
                    <div className="card">
                        {data.Questions.map((question) => (
                            <div key={question.id}>

                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="subtitle is-4">{question.id + '.'} {question.question}</p>
                                        </div>
                                    </div>

                                    {question.answers.map((answer, index) => (
                                        <div key={index}>
                                            <p className="subtitle is-5 pb-3 pl-3">
                                                <label className="radio">
                                                    <input
                                                        type="radio"
                                                        value={answer.points}
                                                        name={`radioPoint${question.id}`}
                                                        checked={selectedOptions[question.id] == answer.points}
                                                        style={{ marginRight: '1em' }}
                                                        onClick={() => {
                                                            setSelectedOption((prevState) => {
                                                                const updatedState = {
                                                                    ...prevState,
                                                                    [question.id]: answer.points,
                                                                };
                                                                setVals(updatedState[1], updatedState[2], updatedState[3]);
                                                                return updatedState;
                                                            });
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
                        <p className="pb-5">

                        </p>
                        <div className="columns is-mobile is-centered">
                            <div className="buttons">
                                <button className="button is-primary is-medium" onClick={handleSubmit} disabled={isSubmitDisabled}>
                                    Submit
                                </button>
                            </div>
                        </div>
                        {showRes && showModal && <Modal onClose={handleCloseModal} suggestionText={suggestionText}/>} {/* Show the modal when showModal is true */}
                        <p className="pb-5">

                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;