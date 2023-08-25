# Project description
<p align="justify">A React app that reads multiple surveys from a JSON file and makes them available for the users to use. The admin can create multiple surveys from the Admin page and can also edit different components of the previously created surveys. The newly added survey becomes available on the homepage. The user will get an email after taking a survey and the admin will also be notified through an email. The email-sending service has been implemented using an email service provider, EmailJS. </p><p>Screenshots of the homepage, admin page, and a survey page can be seen below</p>
<p>Homepage</p> 
<a href="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/ce6484c4-0fef-4a17-b34a-5f0330d11dd7"><img src="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/ce6484c4-0fef-4a17-b34a-5f0330d11dd7" style="width: 600px; height: 400px; float: left" title="Homepage" />
<p>Admin page</p> 
<a href="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/b2004c9e-6a32-462f-8422-c3b8ce2c2fcc"><img src="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/b2004c9e-6a32-462f-8422-c3b8ce2c2fcc" style="width: 600px; height: 400px; float: left" title="Admin page" />

<a href="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/22b3e7e1-bd6d-4390-a0c3-4029a57c56c0"><img src="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/22b3e7e1-bd6d-4390-a0c3-4029a57c56c0" style="width: 600px; height: 400px; float: left" title="Admin page" />
<p>Survey page</p> 
<a href="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/bdc13264-c067-4e3f-9a86-4a8d5213d521"><img src="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/bdc13264-c067-4e3f-9a86-4a8d5213d521" style="width: 600px; height: 400px; float: left" title="Admin page" />
<p></p>
To view a live example, <a href="https://survey-ck-67305.web.app/">click here</a>
<p></p>
<b>Programming Environment:</b> Frontend Language: `React`, `CSS` and `JSX`. Backend Language: `Express.js`.

# Email Service Setup

We are going to use EmailJS to set up the email-sending service. After the user takes a survey, the user can enter the email address and will receive the response from the survey. The admin will also receive an email, which will contain the user details and the selected answers to their corresponding questions from one survey. The admin will also receive the response the user received.

- To receive the survey from EmailJS we are going to first open an email service and connect the email from which the user and admin will receive the email. Take note of the Service ID that we will use later.
<p></p>
 <a href="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/91e497c1-2262-455a-87da-1a41ce4b8d3c"><img src="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/91e497c1-2262-455a-87da-1a41ce4b8d3c" style="width: 600px; height: 400px; float: left" title="Screenshot 1" />

- Then open two email templates, one for the user and the other one for the admin. Keep track of the two template IDs.
<p></p>
 <a href="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/27954efa-101a-4741-96bd-e6caa6196e03"><img src="https://github.com/ShawkhIbneRashid/react-survey-app/assets/38233390/27954efa-101a-4741-96bd-e6caa6196e03" style="width: 600px; height: 400px; float: left" title="Screenshot 2" />
<p></p>
- From the Account tab you will find a public key. We will also need that later.
- To get a better idea of EmailJS you can take a look at this <a href="https://blog.openreplay.com/sending-emails-from-react-with-emailjs/">article</a>

#  To Run the Code

- The website is completely built on `React` and `Express` libraries of `JavaScript`. So, first install `nodejs` and `npm`. 
- After the successful installation of `nodejs` and `npm`, clone the repository into your local system using the below command:
 ```bash
   git clone https://github.com/ShawkhIbneRashid/react-survey-app.git
  ``` 
- To download required dependencies to your system, navigate to the directory where the cloned repository resides and execute the following command:
 ```node
  npm install
  ```
- Then you have to start the `Express' server. To do that run the following command
 ```node
  npm run devStart
  ```
- Replace the variables in the `.env` file. Replace them with the template IDs, Service ID, and public key.
- You can check the website using `npm start`, it will open the website locally on your browser.
