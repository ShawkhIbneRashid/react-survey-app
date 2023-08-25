const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON request bodies

app.post('/update_json', (req, res) => {
    // Get the JSON data from the request
    const json_data = req.body;
    // console.log('Received JSON data:', json_data);  // Debug statement

    // Read the existing JSON file
    const filePath = './src/surveyAll.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading JSON file' });
        }

        let existing_data = JSON.parse(data);

        // Update the JSON data
        existing_data = { ...existing_data, ...json_data };

        // Write the updated JSON data back to the file
        fs.writeFile(filePath, JSON.stringify(existing_data, null, 4), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to JSON file' });
            }
            // Return a response indicating success
            return res.json({ message: 'JSON file updated successfully' });
        });
    });
});

app.delete('/delete_survey/:survey_name', (req, res) => {
    const survey_name = req.params.survey_name;

    // Read the existing JSON file
    const filePath = './src/surveyAll.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading JSON file' });
        }

        let existing_data = JSON.parse(data);

        let key_to_delete = null;

        // Find the key to delete
        for (const key in existing_data) {
            if (existing_data[key].testName === survey_name) {
                key_to_delete = key;
                break;
            }
        }

        // Check if a matching survey was found
        if (key_to_delete !== null) {
            delete existing_data[key_to_delete];
            fs.writeFile(filePath, JSON.stringify(existing_data, null, 4), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error writing to JSON file' });
                }
                return res.status(200).json({ message: `Survey ${survey_name} deleted successfully` });
            });
        } else {
            return res.status(404).json({ error: `Survey ${survey_name} not found` });
        }
    });
});

app.delete('/delete_question/:survey_name/:question_id', (req, res) => {
    const survey_name = req.params.survey_name;
    const question_id = parseInt(req.params.question_id);

    // Read the existing JSON file
    const filePath = './src/surveyAll.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading JSON file' });
        }

        let existing_data = JSON.parse(data);

        let foundSurvey = null;
        let surveyKey = null;

        // Find the survey and its key
        for (const key in existing_data) {
            if (existing_data[key].testName === survey_name) {
                foundSurvey = existing_data[key];
                surveyKey = key;
                break;
            }
        }

        if (foundSurvey && "Questions" in foundSurvey) {
            const updatedQuestions = foundSurvey.Questions.filter(q => q.id !== question_id);
            foundSurvey.Questions = updatedQuestions;
            
            // Write the updated JSON data back to the file
            fs.writeFile(filePath, JSON.stringify(existing_data, null, 4), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error writing to JSON file' });
                }
                return res.status(200).json({ message: `Question ${question_id} deleted successfully from the survey` });
            });
        } else {
            return res.status(404).json({ error: `Question ${question_id} not found in the survey` });
        }
    });
});

app.delete('/delete_answer/:survey_name/:question_id/:answer_index', (req, res) => {
    const survey_name = req.params.survey_name;
    const question_id = parseInt(req.params.question_id);
    const answer_index = parseInt(req.params.answer_index);

    // Read the existing JSON file
    const filePath = './src/surveyAll.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading JSON file' });
        }

        let existing_data = JSON.parse(data);

        let foundSurvey = null;
        let surveyKey = null;

        // Find the survey and its key
        for (const key in existing_data) {
            if (existing_data[key].testName === survey_name) {
                foundSurvey = existing_data[key];
                surveyKey = key;
                break;
            }
        }

        if (foundSurvey && "Questions" in foundSurvey) {
            const question = foundSurvey.Questions.find(q => q.id === question_id);

            if (question) {
                const answerToDelete = question.answers.findIndex(answer => answer.id === answer_index);

                if (answerToDelete !== -1) {
                    question.answers.splice(answerToDelete, 1);
                    // Write the updated JSON data back to the file
                    fs.writeFile(filePath, JSON.stringify(existing_data, null, 4), (err) => {
                        if (err) {
                            return res.status(500).json({ message: 'Error writing to JSON file' });
                        }
                        return res.status(200).json({ message: `Answer at index ${answer_index} deleted successfully from the question in the survey` });
                    });
                } else {
                    return res.status(404).json({ error: `Answer at index ${answer_index} not found in the question` });
                }
            } else {
                return res.status(404).json({ error: `Question ${question_id} not found in the survey` });
            }
        } else {
            return res.status(404).json({ error: `Survey not found` });
        }
    });
});

app.delete('/delete_suggestion/:survey_name/:suggestion_range', (req, res) => {
    const survey_name = req.params.survey_name;
    const suggestion_range = req.params.suggestion_range;

    // Read the existing JSON file
    const filePath = './src/surveyAll.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading JSON file' });
        }

        let existing_data = JSON.parse(data);

        let foundSurvey = null;
        let surveyKey = null;

        // Find the survey and its key
        for (const key in existing_data) {
            if (existing_data[key].testName === survey_name) {
                foundSurvey = existing_data[key];
                surveyKey = key;
                break;
            }
        }

        if (foundSurvey && "Suggestions" in foundSurvey && foundSurvey.Suggestions[suggestion_range] !== undefined) {
            delete foundSurvey.Suggestions[suggestion_range];
            // Write the updated JSON data back to the file
            fs.writeFile(filePath, JSON.stringify(existing_data, null, 4), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error writing to JSON file' });
                }
                return res.status(200).json({ message: `Suggestion with range ${suggestion_range} deleted successfully from the survey` });
            });
        } else {
            return res.status(404).json({ error: `Suggestion with range ${suggestion_range} not found in the survey` });
        }
    });
});

app.post('/add_question', (req, res) => {
    // Get the JSON data from the request
    const json_data = req.body;

    // Get the survey name and the question data from the JSON data
    const survey_name = json_data.survey_name;
    const question_data = json_data.question_data;

    // Read the existing JSON file
    const filePath = './src/surveyAll.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading JSON file' });
        }

        let existing_data = JSON.parse(data);

        // Find the survey with the specified name
        let survey = null;
        for (const key in existing_data) {
            if (existing_data[key].testName === survey_name) {
                survey = existing_data[key];
                break;
            }
        }

        if (!survey) {
            return res.status(404).json({ error: `Survey ${survey_name} not found` });
        }

        // Add the new question to the survey's Questions array
        question_data.id = survey.Questions.length + 1;  // Assign a new ID for the question
        survey.Questions.push(question_data);

        // Write the updated JSON data back to the file
        fs.writeFile(filePath, JSON.stringify(existing_data, null, 4), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to JSON file' });
            }
            return res.status(200).json({ message: 'Question added successfully' });
        });
    });
});

app.post('/add_answer', (req, res) => {
    // Get the JSON data from the request
    const json_data = req.body;

    // Get the survey name, question ID, and answer data from the JSON data
    const survey_name = json_data.survey_name;
    const question_id = json_data.question_id;
    const answer_data = json_data.answer_data;

    // Read the existing JSON file
    const filePath = './src/surveyAll.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading JSON file' });
        }

        let existing_data = JSON.parse(data);

        // Find the survey with the specified name
        let survey = null;
        for (const key in existing_data) {
            if (existing_data[key].testName === survey_name) {
                survey = existing_data[key];
                break;
            }
        }

        if (!survey) {
            return res.status(404).json({ error: `Survey ${survey_name} not found` });
        }

        // Find the question with the specified ID
        let question = null;
        for (const q of survey.Questions || []) {
            if (q.id === question_id) {
                question = q;
                break;
            }
        }

        if (!question) {
            return res.status(404).json({ error: `Question with ID ${question_id} not found in the survey` });
        }

        // Add the new answers to the question's answers array
        answer_data.forEach((answer, index) => {
            answer.option = String.fromCharCode(97 + question.answers.length + index);
            question.answers.push(answer);
        });

        // Write the updated JSON data back to the file
        fs.writeFile(filePath, JSON.stringify(existing_data, null, 4), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to JSON file' });
            }
            return res.status(200).json({ message: 'Answers added successfully' });
        });
    });
});

app.post('/add_suggestion', (req, res) => {
    // Get the JSON data from the request
    const json_data = req.body;

    // Get the survey name, suggestion range, and suggestion message from the JSON data
    const survey_name = json_data.survey_name;
    const suggestion_range = json_data.range;
    const suggestion_message = json_data.message;

    // Read the existing JSON file
    const filePath = './src/surveyAll.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading JSON file' });
        }

        let existing_data = JSON.parse(data);

        // Find the survey with the specified name
        let survey = null;
        for (const key in existing_data) {
            if (existing_data[key].testName === survey_name) {
                survey = existing_data[key];
                break;
            }
        }

        if (!survey) {
            return res.status(404).json({ error: `Survey ${survey_name} not found` });
        }

        // Check if the Suggestions key exists in the survey, if not, create it
        if (!survey.Suggestions) {
            survey.Suggestions = {};
        }

        // Add the new suggestion to the survey's Suggestions dictionary
        survey.Suggestions[suggestion_range] = suggestion_message;

        // Write the updated JSON data back to the file
        fs.writeFile(filePath, JSON.stringify(existing_data, null, 4), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to JSON file' });
            }
            return res.status(200).json({ message: 'Suggestion added successfully' });
        });
    });
});


const port = 5000;  // Choose a port number
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
