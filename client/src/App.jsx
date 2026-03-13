import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import InterviewPage from './pages/InterviewPage';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/userSlice';
import { useEffect } from 'react';
import axios from 'axios';
import InterviewHistory from './pages/InterviewHistory';
import InterviewReport from './pages/InterviewReport';
import Pricing from './pages/Pricing';

export const ServerUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000"

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/user/current-user", {
                    withCredentials: true
                })
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
                dispatch(setUserData(null))
            }
        }
        getUser()
    }, [dispatch])

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/history" element={<InterviewHistory />} />
            <Route path="/report/:id" element={<InterviewReport />} />
            <Route path="/pricing" element={<Pricing />} />
        </Routes>
    );
}

export default App;
