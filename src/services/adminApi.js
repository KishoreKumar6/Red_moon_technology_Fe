import api from './api'; export const loginAdmin=(data)=>api.post('/auth/login',data); export const getMe=()=>api.get('/auth/me');
