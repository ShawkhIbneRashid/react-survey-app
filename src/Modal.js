import React, { useState, useRef } from 'react';
import 'bulma/css/bulma.css';
import emailjs from '@emailjs/browser';

function Modal({ onClose, suggestionText, selectedQuestions }) {
    var answerVals = "";
    const delimiter = ": ";
    for (let i = 0; i < Object.keys(selectedQuestions).length; i++) {
        answerVals = answerVals + "Question " + (i + 1) + "\n";
        answerVals = answerVals + Object.values(selectedQuestions)[i].split(delimiter)[0] + "\n" + "Response" + "\n";
        answerVals = answerVals + Object.values(selectedQuestions)[i].split(delimiter)[1] + "\n";
        if (i != Object.keys(selectedQuestions).length - 1)
            answerVals = answerVals + "\n";
    }
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const fromMessage = process.env.fromMessage;
    const formRef = useRef();
    const fromEmail = process.env.fromEmail;

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        emailjs.sendForm(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID,
            formRef.current,
            process.env.REACT_APP_PUBLIC_KEY
        )
            .then((response) => {
                console.log('Email sent successfully:', response.text);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });

        const adminEmailData = {
            from_name: fromMessage,
            message: suggestionText,
            reply_to: fromEmail,
            //to_name: 'Admin Name', // Replace with the actual admin's name or a suitable identifier
            to_name: name,
            user_phone: phoneNumber,
            from_email: email,
            answers: answerVals,
        };

        // Send email to the admin
        emailjs.send(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_ADMIN_TEMPLATE_ID,
            adminEmailData,
            process.env.REACT_APP_PUBLIC_KEY
        )
            .then((response) => {
                console.log('Email sent to admin successfully:', response.text);
            })
            .catch((error) => {
                console.error('Error sending email to admin:', error);
            });
        //console.log("Selected questions:", selectedQuestions);
        onClose(); // Close the modal after form submission
    };

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Thank you, fill the below details.</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <input type="hidden" name="from_name" value={fromMessage} />
                        <input type="hidden" name="message" value={suggestionText} />
                        <input type="hidden" name="reply_to" value={fromEmail} />
                        <input type="hidden" name="answers" value={answerVals} />
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="to_name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Phone Number</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="user_phone"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email Address</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="email"
                                    name="from_email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="button" onClick={onClose}>
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default Modal;
