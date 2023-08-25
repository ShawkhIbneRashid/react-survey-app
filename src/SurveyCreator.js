import React, { useState, useEffect } from 'react';
import surveysData from './surveyAll.json';
import axios from 'axios';
import 'bulma/css/bulma.css';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import { v4 as uuidv4 } from 'uuid';


const AdminSurveyForm = () => {
    // State variables
    const [surveyName, setSurveyName] = useState('');
    const [questions, setQuestions] = useState([]);
    const [suggestions, setSuggestions] = useState({});
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogQuestion, setDialogQuestion] = useState('');
    const [dialogAnswers, setDialogAnswers] = useState([]);
    const [dialogValue, setDialogValue] = useState('');
    const [dialogPoints, setDialogPoints] = useState('');

    const [suggestionDialogOpen, setSuggestionDialogOpen] = useState(false);
    const [suggestionRange, setSuggestionRange] = useState('');
    const [suggestionMessage, setSuggestionMessage] = useState('');

    const [insertNewSurvey, setInsertNewSurvey] = useState(false);

    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [deletedSurvey, setDeletedSurvey] = useState(null);
    const [deletedQuestion, setDeletedQuestion] = useState(null);
    const [deletedSuggestion, setDeletedSuggestion] = useState(null);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deletedAnswer, setDeletedAnswer] = useState(null);

    const [surveys, setSurveys] = useState([]);

    const [nextQuestionId, setNextQuestionId] = useState(questions.length);
    const [nextAnswerId, setNextAnswerId] = useState(dialogAnswers.length);

    const [oldSurveyAddQuestionModalOpen, setOldSurveyAddQuestionModalOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [answerValue, setAnswerValue] = useState('');
    const [answerPoints, setAnswerPoints] = useState('');

    const [oldSurveyAddAnswerModalOpen, setOldSurveyAddAnswerModalOpen] = useState(false);
    const [oldAnswers, oldSetAnswers] = useState([]);
    const [oldAnswerValue, oldSetAnswerValue] = useState('');
    const [oldAnswerPoints, oldSetAnswerPoints] = useState('');
    const [oldQID, oldSetQID] = useState('');

    const [oldSurveyAddSuggestionModalOpen, setOldSurveyAddSuggestionModalOpen] = useState(false);
    const [suggestionNewRange, setNewSuggestionRange] = useState('');
    const [suggestionNewMessage, setNewSuggestionMessage] = useState('');

    const backendBaseUrl = 'http://localhost:5000';

    const handleOldSurveyAddSuggestionModalOpen = () => {
        setOldSurveyAddSuggestionModalOpen(true);
    };

    const handleOldSurveyAddSuggestionModalClose = () => {
        setOldSurveyAddSuggestionModalOpen(false);
        setNewSuggestionRange('');
        setNewSuggestionMessage('');
    };

    // Function to add suggestions
    const handleOldSurveyAddSuggestionSubmit = () => {
        const trimmedRange = suggestionNewRange.trim();
        const trimmedMessage = suggestionNewMessage.trim();
        if (trimmedRange === '' || trimmedMessage === '') {
            return;
        }

        axios.post(`${backendBaseUrl}/add_suggestion`, {
            survey_name: selectedSurvey.testName,
            range: trimmedRange,
            message: trimmedMessage,
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error adding suggestion:', error);
            });

        setNewSuggestionRange('');
        setNewSuggestionMessage('');

        setOldSurveyAddSuggestionModalOpen(false);
    };

    const handleOldSurveyAddQuestionModalOpen = () => {
        setOldSurveyAddQuestionModalOpen(true);
    };

    const handleOldSurveyAddAnswerModalOpen = (question) => {
        setOldSurveyAddAnswerModalOpen(true);
        oldSetQID(question.id);
    };

    const handleOldSurveyAddQuestionModalClose = () => {
        setOldSurveyAddQuestionModalOpen(false);
        setQuestion('');
        setAnswers([]);
        setAnswerValue('');
        setAnswerPoints('');
    };

    const handleOldSurveyAddAnswerModalClose = () => {
        setOldSurveyAddAnswerModalOpen(false);
        oldSetAnswers([]);
        oldSetQID('');
        oldSetAnswerValue('');
        oldSetAnswerPoints('');
    };

    const handleAddNewAnswer = () => {
        const option = String.fromCharCode(97 + answers.length); // Generate option dynamically ('a', 'b', 'c', ...)
        const newAnswer = { option, value: answerValue, points: Number(answerPoints), id: Math.floor(Math.random() * 100000) };
        setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
        setAnswerValue('');
        setAnswerPoints('');
    };

    const handleAddNewQAnswer = () => {
        const option = String.fromCharCode(97 + oldAnswers.length);
        const newAnswer = { option, value: oldAnswerValue, points: Number(oldAnswerPoints), id: Math.floor(Math.random() * 100000) };
        oldSetAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
        oldSetAnswerValue('');
        oldSetAnswerPoints('');
    };

    // Function to add new answers
    const handleOldSurveyAddQuestionSubmit = () => {
        const trimmedQuestion = question.trim();
        if (trimmedQuestion === '' || answers.length === 0) {
            return;
        }
        console.log(selectedSurvey.testName);
        const newQuestion = {
            question: trimmedQuestion,
            answers: answers,
        };
        console.log(newQuestion);

        axios.post(`${backendBaseUrl}/add_question`, {
            survey_name: selectedSurvey.testName,
            question_data: newQuestion,
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error adding question:', error);
            });

        setQuestion('');
        setAnswers([]);
        setAnswerValue('');
        setAnswerPoints('');

        setOldSurveyAddQuestionModalOpen(false);
    };

    // Function to add new answers to an already added survey
    const handleOldSurveyAddAnswerSubmit = () => {

        if (oldAnswers.length === 0) {
            return;
        }

        axios.post(`${backendBaseUrl}/add_answer`, {
            survey_name: selectedSurvey.testName,
            question_id: oldQID,
            answer_data: oldAnswers,
        })
            .then((response) => {

                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error adding question:', error);

            });

        // Clear the modal state
        oldSetAnswers([]);
        oldSetAnswerValue('');
        oldSetAnswerPoints('');

        // Close the modal
        setOldSurveyAddAnswerModalOpen(false);
    };

    const handleDeleteConfirm = () => {
        if (deletedSurvey) {
            handleSurveyDelete(deletedSurvey);
        } else if (deletedQuestion) {
            handleQuestionDelete(deletedQuestion);
            handleSuggestionDelete(deletedQuestion.id);
        } else if (deletedSuggestion) {
            handleSuggestionDelete(deletedSuggestion);
        } else if (deletedAnswer) {
            handleAnswerDelete(deletedAnswer.question, deletedAnswer.answer);
        }

        // Clear the deleted components
        setDeletedSurvey(null);
        setDeletedQuestion(null);
        setDeletedSuggestion(null);
        setDeletedAnswer(null);

        // Close the confirmation dialog
        setShowConfirmation(false);
    };

    const handleDeleteCancel = () => {
        // Clear the deleted components
        setDeletedSurvey(null);
        setDeletedQuestion(null);
        setDeletedSuggestion(null);
        // Close the confirmation dialog
        setShowConfirmation(false);
    };

    // Delete survey
    const handleSurveyDelete = (survey) => {
        const surveyName = survey.testName;
        console.log(Object.keys(survey));
        if (showConfirmation) {

            setSurveys((prevSurveys) => prevSurveys.filter((s) => s !== survey));

            // Clear the selected survey if it matches the deleted survey
            if (selectedSurvey === survey) {
                setSelectedSurvey(null);
            }

            setShowConfirmation(false);

            // Send DELETE request to the server with the surveyName as the URL parameter
            axios.delete(`${backendBaseUrl}/delete_survey/${encodeURIComponent(surveyName)}`)
                .then((response) => {
                    console.log('Survey deleted successfully.');
                    // Handle any success actions or display a success message to the admin
                })
                .catch((error) => {
                    console.error('Error deleting survey:', error);
                    // Handle error scenarios or display an error message to the admin
                });
        } else {
            setDeletedSurvey(survey);
            setShowConfirmation(true);
        }
    };

    //Delete question
    const handleQuestionDelete = (question) => {
        const surveyName = selectedSurvey.testName; // Assuming testName is the unique identifier for the survey

        if (!showConfirmation) {
            // Set the selected question to be deleted
            setDeletedQuestion(question);
            // Open the confirmation dialog
            setShowConfirmation(true);
        } else {
            // Send DELETE request to the server to delete the question
            axios.delete(`${backendBaseUrl}/delete_question/${encodeURIComponent(surveyName)}/${question.id}`)
                .then((response) => {
                    console.log('Question deleted successfully from the survey.');
                    // Update the frontend state to remove the question
                    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== question.id));

                    // Update the selected survey's Questions array if it matches the deleted question
                    setSelectedSurvey((prevSurvey) => ({
                        ...prevSurvey,
                        Questions: prevSurvey.Questions.filter((q) => q.id !== question.id),
                    }));

                    // Clear the selected question if it matches the deleted question
                    if (selectedQuestion && selectedQuestion.id === question.id) {
                        setSelectedQuestion(null);
                    }
                })
                .catch((error) => {
                    console.error('Error deleting question from the survey:', error);
                    // Handle error scenarios or display an error message to the admin
                });

            // Close the confirmation dialog
            setShowConfirmation(false);
        }
    };

    // Delete Answer
    const handleAnswerDelete = (question, answer) => {
        if (!showConfirmation) {
            // Set the selected answer to be deleted
            setDeletedAnswer({ question, answer });
            // Open the confirmation dialog
            setShowConfirmation(true);
        } else {
            // Remove the selected answer from the state
            setQuestions((prevQuestions) =>
                prevQuestions.map((q) => {
                    if (q.id === question.id) {
                        const updatedAnswers = q.answers.filter((a) => a.option !== answer.option);
                        return {
                            ...q,
                            answers: updatedAnswers,
                        };
                    }
                    return q;
                })
            );

            // Update the selected question with the modified answers
            setSelectedQuestion((prevSelectedQuestion) => {
                if (prevSelectedQuestion && prevSelectedQuestion.id === question.id) {
                    const updatedAnswers = prevSelectedQuestion.answers.filter((a) => a.option !== answer.option);
                    return {
                        ...prevSelectedQuestion,
                        answers: updatedAnswers,
                    };
                }
                return prevSelectedQuestion;
            });

            // Update the selected survey with the modified answers
            if (selectedSurvey && selectedSurvey.Questions) {
                setSelectedSurvey((prevSelectedSurvey) => ({
                    ...prevSelectedSurvey,
                    Questions: prevSelectedSurvey.Questions.map((q) => {
                        if (q.id === question.id) {
                            const updatedAnswers = q.answers.filter((a) => a.option !== answer.option);
                            return {
                                ...q,
                                answers: updatedAnswers,
                            };
                        }
                        return q;
                    }),
                }));
            }
            // Make a DELETE request to the backend to delete the answer permanently
            axios.delete(`${backendBaseUrl}/delete_answer/${encodeURIComponent(selectedSurvey.testName)}/${question.id}/${answer.id}`)
                .then((response) => {
                    console.log(response.data); // Handle the response from the server if needed
                })
                .catch((error) => {
                    console.error('Error deleting answer:', error); // Handle the error if something goes wrong
                });
        }
    };

    // Delete suggestions
    const handleSuggestionDelete = (range) => {
        if (showConfirmation) {
            // Remove the selected suggestion from the state
            setSuggestions((prevSuggestions) => {
                const updatedSuggestions = { ...prevSuggestions };
                delete updatedSuggestions[range];
                return updatedSuggestions;
            });

            // Remove the selected suggestion from the selected survey if it matches the deleted suggestion
            if (selectedSurvey && selectedSurvey.Suggestions && selectedSurvey.Suggestions[range]) {
                setSelectedSurvey((prevSurvey) => {
                    const updatedSuggestions = { ...prevSurvey.Suggestions };
                    delete updatedSuggestions[range];
                    return {
                        ...prevSurvey,
                        Suggestions: updatedSuggestions,
                    };
                });
                axios.delete(`${backendBaseUrl}/delete_suggestion/${encodeURIComponent(selectedSurvey.testName)}/${encodeURIComponent(range)}`)
                    .then((response) => {
                        console.log(response.data); // Handle the response from the server if needed
                    })
                    .catch((error) => {
                        console.error('Error deleting suggestion:', error); // Handle the error if something goes wrong
                    });
            }

            // Close the confirmation dialog
            setShowConfirmation(false);
        } else {
            // Set the selected suggestion to be deleted
            setDeletedSuggestion(range);
            // Open the confirmation dialog
            setShowConfirmation(true);
        }

    };

    useEffect(() => {
        setSurveys(Object.values(surveysData));
    }, []);

    const handleSurveyCardClose = () => {
        setSelectedSurvey(null);
    };

    const handleSurveyClick = (survey) => {
        setSelectedSurvey(survey);
    };

    if (!insertNewSurvey) {
        return (
            <div>
                <div className="navbar custom-navbar">
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
                </div>
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <button className="button is-primary is-large mb-3 mt-6" onClick={() => setInsertNewSurvey(true)}>Insert New Survey</button>
                            <h2 className="title is-2">All Surveys:</h2>
                            <table className="table is-bordered is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Survey #</th>
                                        <th>Survey Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {surveys.map((survey, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{survey.testName}</td>
                                            <td>
                                                <button className="button" onClick={() => handleSurveyClick(survey)}>
                                                    View Details
                                                </button>
                                                <button className="button is-danger ml-2" onClick={() => handleSurveyDelete(survey)}>
                                                    <span className="icon">
                                                        <i className="fas fa-minus"></i>
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {selectedSurvey && (
                                <div className="card mt-4">

                                    <div className="card-content">
                                        <div className="content">
                                            <div className="is-flex is-align-items-center">

                                                <h4 className="title is-3 mr-auto">{selectedSurvey.testName}</h4>
                                                <div class="mb-3 ml-6">
                                                    <button className="delete" aria-label="close" onClick={handleSurveyCardClose}></button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="content">
                                            <div className="is-flex is-align-items-center mb-3">
                                                <h4 className="title is-3">Description:</h4>
                                            </div>
                                            <p className="is-size-4">{selectedSurvey.Description}</p>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="content">
                                            <div className="is-flex is-align-items-center mb-3">
                                                <h4 className="title is-3 mt-3">Questions:</h4>

                                                <button className="button is-primary ml-6" onClick={handleOldSurveyAddQuestionModalOpen}>
                                                    <span className="icon">
                                                        <i className="fas fa-plus"></i>
                                                    </span>
                                                </button>
                                            </div>
                                            <ul>
                                                {selectedSurvey.Questions.map((question, questionIndex) => (
                                                    <li key={questionIndex}>
                                                        <strong>{question.question}</strong>
                                                        <button className="button ml-2 is-danger is-small is-outlined" onClick={() => handleQuestionDelete(question)}>
                                                            <span className="icon">
                                                                <i className="fas fa-minus"></i>
                                                            </span>
                                                        </button>
                                                        <button className="button is-small is-outlined is-primary ml-2" onClick={() => handleOldSurveyAddAnswerModalOpen(question)}>
                                                            <span className="icon">
                                                                <i className="fas fa-plus"></i>
                                                            </span>
                                                        </button>
                                                        <ul>
                                                            {question.answers.map((answer, answerIndex) => (
                                                                <li key={answerIndex}>
                                                                    Option: {answer.option} | Value: {answer.value} | Points: {answer.points}
                                                                    <button className="button ml-2 is-danger is-small is-outlined" onClick={() => handleAnswerDelete(question, answer)}>
                                                                        <span className="icon">
                                                                            <i className="fas fa-minus"></i>
                                                                        </span>
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="is-flex is-align-items-center mb-3">
                                                <h4 className="title is-3 mt-3">Suggestions:</h4>

                                                <button className="button is-primary ml-6" onClick={handleOldSurveyAddSuggestionModalOpen}>
                                                    <span className="icon">
                                                        <i className="fas fa-plus"></i>
                                                    </span>
                                                </button>
                                            </div>
                                            <ul>
                                                {Object.entries(selectedSurvey.Suggestions).map(([range, message], suggestionIndex) => (
                                                    <li key={suggestionIndex}>
                                                        Range: {range} | Message: {message}
                                                        <button className="button ml-2 is-danger is-small is-outlined" onClick={() => handleSuggestionDelete(range)}>
                                                            <span className="icon">
                                                                <i className="fas fa-minus"></i>
                                                            </span>
                                                        </button>

                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Render the new modal */}
                            {oldSurveyAddQuestionModalOpen && (
                                <div className="modal is-active">
                                    <div className="modal-background" onClick={handleOldSurveyAddQuestionModalClose}></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                            <p className="modal-card-title">Add Question</p>
                                            <button className="delete" aria-label="close" onClick={handleOldSurveyAddQuestionModalClose}></button>
                                        </header>
                                        <section className="modal-card-body">
                                            <div className="field">
                                                <label className="label" htmlFor="questionInput">
                                                    Question:
                                                </label>
                                                <div className="control">
                                                    <input
                                                        id="questionInput"
                                                        className="input"
                                                        type="text"
                                                        value={question}
                                                        onChange={(e) => setQuestion(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <h4 className="title is-4">Answers:</h4>
                                            <div className="field is-horizontal">
                                                <div className="field-body">
                                                    <div className="field">
                                                        <label className="label" htmlFor="valueInput">
                                                            Value:
                                                        </label>
                                                        <div className="control">
                                                            <input
                                                                id="valueInput"
                                                                className="input"
                                                                type="text"
                                                                value={answerValue}
                                                                onChange={(e) => setAnswerValue(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <label className="label" htmlFor="pointsInput">
                                                            Points:
                                                        </label>
                                                        <div className="control">
                                                            <input
                                                                id="pointsInput"
                                                                className="input"
                                                                type="number"
                                                                value={answerPoints}
                                                                onChange={(e) => setAnswerPoints(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <button className="button is-primary" onClick={handleAddNewAnswer}>
                                                            Add Answer
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <h4 className="title is-4">Added Answers:</h4>
                                            {answers.length > 0 ? (
                                                <ul>
                                                    {answers.map((answer, index) => (
                                                        <li key={index}>
                                                            Option: {answer.option} | Value: {answer.value} | Points: {answer.points}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>No answers added yet.</p>
                                            )}
                                        </section>
                                        <footer className="modal-card-foot">

                                            <button className="button is-success" onClick={handleOldSurveyAddQuestionSubmit}>
                                                Submit
                                            </button>
                                            <button className="button is-danger" onClick={handleOldSurveyAddQuestionModalClose}>
                                                Cancel
                                            </button>
                                        </footer>
                                    </div>
                                </div>
                            )}

                            {/* Render the new modal for answeres */}
                            {oldSurveyAddAnswerModalOpen && (
                                <div className="modal is-active">
                                    <div className="modal-background" onClick={handleOldSurveyAddAnswerModalClose}></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                            <p className="modal-card-title">Add Answers</p>
                                            <button className="delete" aria-label="close" onClick={handleOldSurveyAddAnswerModalClose}></button>
                                        </header>
                                        <section className="modal-card-body">
                                            <div className="field">
                                                <label className="label" htmlFor="questionInput">
                                                    Question:
                                                    {selectedSurvey.Questions.question}
                                                </label>
                                            </div>

                                            <h4 className="title is-4">Answers:</h4>
                                            <div className="field is-horizontal">
                                                <div className="field-body">
                                                    <div className="field">
                                                        <label className="label" htmlFor="valueInput">
                                                            Value:
                                                        </label>
                                                        <div className="control">
                                                            <input
                                                                id="valueInput"
                                                                className="input"
                                                                type="text"
                                                                value={oldAnswerValue}
                                                                onChange={(e) => oldSetAnswerValue(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <label className="label" htmlFor="pointsInput">
                                                            Points:
                                                        </label>
                                                        <div className="control">
                                                            <input
                                                                id="pointsInput"
                                                                className="input"
                                                                type="number"
                                                                value={oldAnswerPoints}
                                                                onChange={(e) => oldSetAnswerPoints(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <button className="button is-primary" onClick={handleAddNewQAnswer}>
                                                            Add Answer
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <h4 className="title is-4">Added Answers:</h4>
                                            {oldAnswers.length > 0 ? (
                                                <ul>
                                                    {oldAnswers.map((answer, index) => (
                                                        <li key={index}>
                                                            Option: {answer.option} | Value: {answer.value} | Points: {answer.points}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>No answers added yet.</p>
                                            )}
                                        </section>
                                        <footer className="modal-card-foot">

                                            <button className="button is-success" onClick={handleOldSurveyAddAnswerSubmit}>
                                                Submit
                                            </button>
                                            <button className="button is-danger" onClick={handleOldSurveyAddAnswerModalClose}>
                                                Cancel
                                            </button>
                                        </footer>
                                    </div>
                                </div>
                            )}

                            {oldSurveyAddSuggestionModalOpen && (
                                <div className="modal is-active">
                                    <div className="modal-background" onClick={handleOldSurveyAddSuggestionModalClose}></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                            <p className="modal-card-title">Add Suggestion</p>
                                            <button className="delete" aria-label="close" onClick={handleOldSurveyAddSuggestionModalClose}></button>
                                        </header>
                                        <section className="modal-card-body">
                                            <div className="field">
                                                <label className="label" htmlFor="rangeInput">
                                                    Range:
                                                </label>
                                                <div className="control">
                                                    <input
                                                        id="rangeInput"
                                                        className="input"
                                                        type="text"
                                                        value={suggestionNewRange}
                                                        onChange={(e) => setNewSuggestionRange(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="field">
                                                <label className="label" htmlFor="messageInput">
                                                    Message:
                                                </label>
                                                <div className="control">
                                                    <textarea
                                                        id="messageInput"
                                                        className="textarea"
                                                        value={suggestionNewMessage}
                                                        onChange={(e) => setNewSuggestionMessage(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </section>
                                        <footer className="modal-card-foot">
                                            <button className="button is-success" onClick={handleOldSurveyAddSuggestionSubmit}>
                                                Submit
                                            </button>
                                            <button className="button is-danger" onClick={handleOldSurveyAddSuggestionModalClose}>
                                                Cancel
                                            </button>
                                        </footer>
                                    </div>
                                </div>
                            )}

                            {showConfirmation && (
                                <div className="modal is-active">
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                            <p className="modal-card-title">Delete Confirmation</p>
                                            <button className="delete" aria-label="close" onClick={handleDeleteCancel}></button>
                                        </header>
                                        <section className="modal-card-body has-text-centered">

                                            <p className="mb-3 mt-3 is-size-4">Do you want to delete this component?</p>
                                        </section>
                                        <footer className="modal-card-foot">
                                            <div className="buttons is-centered">
                                                <button className="button is-danger" onClick={handleDeleteConfirm}>
                                                    Yes
                                                </button>
                                                <button className="button is-primary" onClick={handleDeleteCancel}>
                                                    No
                                                </button>
                                            </div>
                                        </footer>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );


    }



    const handleAddQuestion = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogQuestion('');
        setDialogAnswers([]);
        //setDialogOption('');
        setDialogValue('');
        setDialogPoints('');
        setNextAnswerId(dialogAnswers.length);
    };

    const handleAddAnswer = () => {
        const option = String.fromCharCode(97 + dialogAnswers.length); // Generate option dynamically ('a', 'b', 'c', ...)
        const answer = { option, value: dialogValue, points: Number(dialogPoints), id: Math.floor(Math.random() * 100000) };
        setNextAnswerId((prevId) => prevId + 1);
        setDialogAnswers((prevAnswers) => [...prevAnswers, answer]);
        setDialogValue('');
        setDialogPoints('');
    };


    const handleDialogSubmit = () => {
        const question = dialogQuestion.trim();
        if (question === '' || dialogAnswers.length === 0) {
            return;
        }

        // Create a new question object with the generated id
        const newQuestion = {
            id: nextQuestionId,
            question,
            answers: dialogAnswers,
        };

        // Update the questions state with the new question
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

        // Increment the nextQuestionId for the next question
        setNextQuestionId((prevId) => prevId + 1);

        // Close the dialog
        handleDialogClose();
    };

    const handleAddSuggestion = () => {
        setSuggestionDialogOpen(true);
    };

    const handleSuggestionDialogClose = () => {
        setSuggestionDialogOpen(false);
        setSuggestionRange('');
        setSuggestionMessage('');
    };

    const handleAddSuggestionSubmit = () => {
        const suggestion = { range: suggestionRange, message: suggestionMessage };
        setSuggestions((prevSuggestions) => ({ ...prevSuggestions, [suggestion.range]: suggestion.message }));
        handleSuggestionDialogClose();
    };

    const handleSurveySubmission = () => {
        const newSurvey = {
            testName: surveyName,
            Description: description,
            ImageURL: imageURL,
            Questions: questions,
            Suggestions: suggestions,
        };

        const newSurveyKey = uuidv4();

        const updatedSurveyData = {
            ...surveysData,
            [`Survey ${newSurveyKey}`]: newSurvey,
        };
        // Convert the updated data to JSON string
        const updatedDataString = JSON.stringify(updatedSurveyData, null, 2);

        axios
            .post(`${backendBaseUrl}/update_json`, updatedSurveyData)
            .then((response) => {
                console.log('Survey data updated successfully.');
                // Handle any success actions or display a success message to the admin
            })
            .catch((error) => {
                console.error('Error updating survey data:', error);
                // Handle error scenarios or display an error message to the admin
            });

        // Reset the form fields
        setInsertNewSurvey(false);
        setSurveyName('');
        setDescription('');
        setImageURL('');
        setQuestions([]);
        setSuggestions({});
        setNextQuestionId(questions.length);
        setNextAnswerId(dialogAnswers.length);
    };

    return (
        <div>
            <div className="navbar custom-navbar">
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
            </div>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <h2 className="title is-2 has-text-centered mt-4">Insert New Survey</h2>
                        <div className="field">
                            <label className="label" htmlFor="surveyName">
                                <span className="title is-3">Survey Name:</span>
                            </label>
                            <div className="control">
                                <input
                                    id="surveyName"
                                    className="input"
                                    type="text"
                                    value={surveyName}
                                    onChange={(e) => setSurveyName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="description">
                                <span className="title is-3">Description:</span>
                            </label>
                            <div className="control">
                                <textarea
                                    id="description"
                                    className="textarea"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="imageURL">
                                <span className="title is-3">Image URL for the Survey:</span>
                            </label>
                            <div className="control">
                                <input
                                    id="imageURL"
                                    className="input"
                                    type="text"
                                    value={imageURL}
                                    onChange={(e) => setImageURL(e.target.value)}
                                />
                            </div>
                        </div>

                        <h3 className="title is-3">Questions:</h3>
                        <button className="button is-primary mb-3" onClick={handleAddQuestion}>
                            Add Question
                        </button>
                        <ul>
                            {questions.map((question, index) => (
                                <li key={index}>
                                    <strong>{question.question}</strong>

                                    <ul>
                                        {question.answers.map((answer, answerIndex) => (
                                            <li key={answerIndex}>
                                                Option: {answer.option} | Value: {answer.value} | Points: {answer.points}

                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>

                        <h3 className="title is-3">Suggestions:</h3>
                        <button className="button is-primary" onClick={handleAddSuggestion}>
                            Add Suggestion
                        </button>
                        <ul>
                            {Object.entries(suggestions).map(([range, message], index) => (
                                <li key={index}>
                                    Range: {range} | Message: {message}

                                </li>
                            ))}
                        </ul>

                        <button className="button is-success mt-4" onClick={handleSurveySubmission}>
                            Submit Survey
                        </button>

                        {dialogOpen && (
                            <div className="modal is-active">
                                <div className="modal-background"></div>
                                <div className="modal-card">
                                    <header className="modal-card-head">
                                        <p className="modal-card-title">Add Question</p>
                                        <button className="delete" aria-label="close" onClick={handleDialogClose}></button>
                                    </header>
                                    <section className="modal-card-body">
                                        <div className="field">
                                            <label className="label" htmlFor="questionInput">
                                                Question:
                                            </label>
                                            <div className="control">
                                                <input
                                                    id="questionInput"
                                                    className="input"
                                                    type="text"
                                                    value={dialogQuestion}
                                                    onChange={(e) => setDialogQuestion(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <h4 className="title is-4">Answers:</h4>
                                        <div className="field is-horizontal">
                                            <div className="field-body">
                                                <div className="field">
                                                    <label className="label" htmlFor="valueInput">
                                                        Value:
                                                    </label>
                                                    <div className="control">
                                                        <input
                                                            id="valueInput"
                                                            className="input"
                                                            type="text"
                                                            value={dialogValue}
                                                            onChange={(e) => setDialogValue(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label" htmlFor="pointsInput">
                                                        Points:
                                                    </label>
                                                    <div className="control">
                                                        <input
                                                            id="pointsInput"
                                                            className="input"
                                                            type="number"
                                                            value={dialogPoints}
                                                            onChange={(e) => setDialogPoints(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <button className="button is-primary" onClick={handleAddAnswer}>
                                                        Add Answer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <h4 className="title is-4">Added Answers:</h4>
                                        {dialogAnswers.length > 0 ? (
                                            <ul>
                                                {dialogAnswers.map((answer, index) => (
                                                    <li key={index}>
                                                        Option: {answer.option} | Value: {answer.value} | Points: {answer.points}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No answers added yet.</p>
                                        )}
                                    </section>
                                    <footer className="modal-card-foot">
                                        <button className="button is-success" onClick={handleDialogSubmit}>
                                            Submit
                                        </button>
                                        <button className="button is-danger" onClick={handleDialogClose}>
                                            Cancel
                                        </button>
                                    </footer>
                                </div>
                            </div>
                        )}

                        {suggestionDialogOpen && (
                            <div className="modal is-active">
                                <div className="modal-background"></div>
                                <div className="modal-card">
                                    <header className="modal-card-head">
                                        <p className="modal-card-title">Add Suggestion</p>
                                        <button className="delete" aria-label="close" onClick={handleSuggestionDialogClose}></button>
                                    </header>
                                    <section className="modal-card-body">
                                        <div className="field">
                                            <label className="label" htmlFor="rangeInput">
                                                Point Range:
                                            </label>
                                            <div className="control">
                                                <input
                                                    id="rangeInput"
                                                    className="input"
                                                    type="text"
                                                    value={suggestionRange}
                                                    onChange={(e) => setSuggestionRange(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="field">
                                            <label className="label" htmlFor="messageInput">
                                                Message:
                                            </label>
                                            <div className="control">
                                                <input
                                                    id="messageInput"
                                                    className="input"
                                                    type="text"
                                                    value={suggestionMessage}
                                                    onChange={(e) => setSuggestionMessage(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                    <footer className="modal-card-foot">
                                        <button className="button is-success" onClick={handleAddSuggestionSubmit}>
                                            Submit
                                        </button>
                                        <button className="button is-danger" onClick={handleSuggestionDialogClose}>
                                            Cancel
                                        </button>
                                    </footer>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSurveyForm;