import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProfileCard from './userRes';
//import SurveyCreator from './SurveyCreator';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/profile/:value" element={<ProfileCard />} />
            </Routes>
        </Router>
    );
}

export default App;

