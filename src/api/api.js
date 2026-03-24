import axios from 'axios';

const API = axios.create(
    {
        baseURL: "http://127.0.0.1:5000/api",
    }
)

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});

// AUTH
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const getUserProfile = () => API.get("/auth/profile");

// QUESTIONS
export const getQuestions = () => API.get("/questions/");
export const getQuestionById = (id) => API.get(`/questions/${id}`);
export const createQuestion = (data) => API.post("/questions/", data);
export const deleteQuestion = (id) =>
  API.delete(`/questions/${id}`);
export const updateQuestion = (id, data) => API.put(`/questions/${id}`, data);

// ANSWERS
export const createAnswer = (questionId, data) => API.post(`/questions/${questionId}/answers`, data);
export const getAnswers = (questionId) => API.get(`/questions/${questionId}/answers`);
export const deleteAnswer = (answerId) => API.delete(`/questions/answers/${answerId}`);
export const updateAnswer = (answerId, data) => API.put(`/questions/answers/${answerId}`, data);
