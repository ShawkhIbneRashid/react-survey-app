from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/update_json', methods=['POST'])
def update_json():
    # Get the JSON data from the request
    
    json_data = request.get_json()
    # print('Received JSON data:', json_data)  # Debug statement
    
    # Read the existing JSON file
    with open('../src/surveyAll.json', 'r') as file:
        existing_data = json.load(file)

    # Update the JSON data
    existing_data.update(json_data)

    # Write the updated JSON data back to the file
    with open('../src/surveyAll.json', 'w') as file:
        json.dump(existing_data, file, indent=4)

    # Return a response indicating success
    return jsonify({'message': 'JSON file updated successfully'})
    
@app.route('/delete_survey/<string:survey_name>', methods=['DELETE'])
def delete_survey(survey_name):
    with open('../src/surveyAll.json', 'r') as file:
        existing_data = json.load(file)
    print(survey_name)

    # Initialize a variable to keep track of the key to be deleted
    key_to_delete = None

    # Iterate over the existing_data object
    for key, value in existing_data.items():
        # Check if the testName of the current survey matches the survey_name
        if value.get("testName") == survey_name:
            key_to_delete = key
            break

    # Check if a matching survey was found
    if key_to_delete:
        del existing_data[key_to_delete]
        with open('../src/surveyAll.json', 'w') as file:
            json.dump(existing_data, file, indent=4)
        return jsonify({'message': f'Survey {survey_name} deleted successfully'}), 200
    else:
        return jsonify({'error': f'Survey {survey_name} not found'}), 404


@app.route('/delete_question/<string:survey_name>/<int:question_id>', methods=['DELETE'])
def delete_question(survey_name, question_id):
    with open('../src/surveyAll.json', 'r') as file:
        existing_data = json.load(file)
        
    for key, value in existing_data.items():
        if value.get("testName") == survey_name:
            survey = existing_data[key]
            break
    if "Questions" in survey and any(q["id"] == question_id for q in survey["Questions"]):
        # Remove the question from the survey's Questions array
        survey["Questions"] = [q for q in survey["Questions"] if q["id"] != question_id]
        with open('../src/surveyAll.json', 'w') as file:
            json.dump(existing_data, file, indent=4)
        return jsonify({'message': f'Question {question_id} deleted successfully from the survey'}), 200
    else:
        return jsonify({'error': f'Question {question_id} not found in the survey'}), 404

@app.route('/delete_answer/<string:survey_name>/<int:question_id>/<int:answer_index>', methods=['DELETE'])
def delete_answer(survey_name, question_id, answer_index):
    with open('../src/surveyAll.json', 'r') as file:
        existing_data = json.load(file)

    for key, value in existing_data.items():
        if value.get("testName") == survey_name:
            survey = existing_data[key]
            break

    if "Questions" in survey and any(q["id"] == question_id for q in survey["Questions"]):
        question = next(q for q in survey["Questions"] if q["id"] == question_id)
    else:
        return jsonify({'error': f'Question {question_id} not found in the survey'}), 404
        #if 0 <= answer_index < len(question["answers"]):
            # Remove the answer from the question's answers array
    for i in range(len(question["answers"])):
        if (question["answers"][i])["id"]==answer_index:
            del(question["answers"][i])
    
    #del question["answers"][answer_index]
    with open('../src/surveyAll.json', 'w') as file:
        json.dump(existing_data, file, indent=4)
    return jsonify({'message': f'Answer at index {answer_index} deleted successfully from the question in the survey'}), 200

@app.route('/delete_suggestion/<string:survey_name>/<string:suggestion_range>', methods=['DELETE'])
def delete_suggestion(survey_name, suggestion_range):
    with open('../src/surveyAll.json', 'r') as file:
        existing_data = json.load(file)

    for key, value in existing_data.items():
        if value.get("testName") == survey_name:
            survey = existing_data[key]
            break

    if "Suggestions" in survey and suggestion_range in survey["Suggestions"]:
        # Remove the suggestion with the specified range from the survey's Suggestions
        del survey["Suggestions"][suggestion_range]
        with open('../src/surveyAll.json', 'w') as file:
            json.dump(existing_data, file, indent=4)
        return jsonify({'message': f'Suggestion with range {suggestion_range} deleted successfully from the survey'}), 200
    else:
        return jsonify({'error': f'Suggestion with range {suggestion_range} not found in the survey'}), 404

@app.route('/add_question', methods=['POST'])
def add_question():
    # Get the JSON data from the request
    json_data = request.get_json()

    # Get the survey name and the question data from the JSON data
    survey_name = json_data.get('survey_name')
    question_data = json_data.get('question_data')

    # Read the existing JSON file
    with open('../src/surveyAll.json', 'r') as file:
        existing_data = json.load(file)

    # Find the survey with the specified name
    survey = None
    for key, value in existing_data.items():
        if value.get("testName") == survey_name:
            survey = existing_data[key]
            break

    if not survey:
        return jsonify({'error': f'Survey {survey_name} not found'}), 404

    # Add the new question to the survey's Questions array
    question_data['id'] = len(survey['Questions']) + 1  # Assign a new ID for the question
    survey['Questions'].append(question_data)

    # Write the updated JSON data back to the file
    with open('../src/surveyAll.json', 'w') as file:
        json.dump(existing_data, file, indent=4)

    return jsonify({'message': 'Question added successfully'}), 200

@app.route('/add_answer', methods=['POST'])
def add_answer():
    # Get the JSON data from the request
    json_data = request.get_json()

    # Get the survey name, question ID, and answer data from the JSON data
    survey_name = json_data.get('survey_name')
    question_id = json_data.get('question_id')
    answer_data = json_data.get('answer_data')

    # Read the existing JSON file
    with open('../src/surveyAll.json', 'r') as file:
        existing_data = json.load(file)

    # Find the survey with the specified name
    survey = None
    for key, value in existing_data.items():
        if value.get("testName") == survey_name:
            survey = existing_data[key]
            break

    if not survey:
        return jsonify({'error': f'Survey {survey_name} not found'}), 404

    # Find the question with the specified ID
    question = None
    for q in survey.get('Questions', []):
        if q.get('id') == question_id:
            question = q
            break

    if not question:
        return jsonify({'error': f'Question with ID {question_id} not found in the survey'}), 404

    # Add the new answers to the question's answers array
    for answer in answer_data:
        answer['option'] = chr(97 + len(question['answers']))
        question['answers'].append(answer)

    # Write the updated JSON data back to the file
    with open('../src/surveyAll.json', 'w') as file:
        json.dump(existing_data, file, indent=4)

    return jsonify({'message': 'Answers added successfully'}), 200

@app.route('/add_suggestion', methods=['POST'])
def add_suggestion():
    # Get the JSON data from the request
    json_data = request.get_json()

    # Get the survey name, suggestion range, and suggestion message from the JSON data
    survey_name = json_data.get('survey_name')
    suggestion_range = json_data.get('range')
    suggestion_message = json_data.get('message')

    # Read the existing JSON file
    with open('../src/surveyAll.json', 'r') as file:
        existing_data = json.load(file)

    # Find the survey with the specified name
    survey = None
    for key, value in existing_data.items():
        if value.get("testName") == survey_name:
            survey = existing_data[key]
            break

    if not survey:
        return jsonify({'error': f'Survey {survey_name} not found'}), 404

    # Check if the Suggestions key exists in the survey, if not, create it
    if 'Suggestions' not in survey:
        survey['Suggestions'] = {}

    # Add the new suggestion to the survey's Suggestions dictionary
    survey['Suggestions'][suggestion_range] = suggestion_message

    # Write the updated JSON data back to the file
    with open('../src/surveyAll.json', 'w') as file:
        json.dump(existing_data, file, indent=4)

    return jsonify({'message': 'Suggestion added successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)