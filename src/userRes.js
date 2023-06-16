import React, { useState } from 'react';
import jsonData from './surveyAll.json';
import 'bulma/css/bulma.css';
import Modal from './Modal';
import { useParams } from 'react-router-dom';



function extractNumbersFromString(string) {
    const numbers = string.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
}

function ProfileCard() {
    const { value } = useParams();
    const surveyName = 'Survey ' + value;
    console.log(surveyName);
    const data = jsonData[surveyName];
    const suggestionKeys = Object.keys(data.Suggestions);
    const suggestionValues = Object.values(data.Suggestions);

    const [selectedOptions, setSelectedOptions] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showRes, setShowRes] = useState(false);
    const [suggestionText, setSuggestionText] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState('');
    
    const setOptionValue = (questionId, optionPoints) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [questionId]: {
                questionId,
                optionPoints,
            },
        }));
    };

   
    const handleSubmit = () => {
        if (Object.keys(selectedOptions).length !== data.Questions.length) {
            console.log('You have not selected all the fields');
            setShowRes(false);
            return;
        }

       

        const sumPoints = Object.values(selectedOptions).reduce((total, option) => total + option.optionPoints, 0);

        const selectedQuestions = Object.values(selectedOptions).map(option => {
            const question = data.Questions.find(q => q.id === option.questionId);
            const selectedAnswer = question.answers.find(answer => answer.points === option.optionPoints);
            return `${question.question}: ${selectedAnswer.value}`;
        });
        setSelectedQuestions(selectedQuestions);
        

        console.log("Total points: "+sumPoints);
        for (let i = 0; i < suggestionKeys.length; i++) {
            const numArr = extractNumbersFromString(suggestionKeys[i]);

            if (sumPoints > numArr[0] && sumPoints < numArr[1]) {
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
                                            <p className="subtitle is-4">{question.id}. {question.question}</p>
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
                                                        checked={selectedOptions[question.id]?.optionPoints === answer.points}
                                                        style={{ marginRight: '1em' }}
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
                        <div className="columns is-mobile is-centered">
                            <div className="buttons">
                                <button className="button is-primary is-medium" onClick={handleSubmit} disabled={isSubmitDisabled}>
                                    Submit
                                </button>
                            </div>
                        </div>
                        {showRes && showModal && <Modal onClose={handleCloseModal} suggestionText={suggestionText} selectedQuestions={selectedQuestions} />}
                        <p className="pb-5"></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
