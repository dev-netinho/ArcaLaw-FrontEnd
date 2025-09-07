import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl
});


export const authService = {
  /**
   * Registra um novo advogado.
   * @param {object} advogadoData - Os dados do formulário de registro.
   * @returns {Promise<object>} A resposta da API.
   */
  registerAdvogado(advogadoData) {
    return apiClient.post('/api/auth/register/advogado', advogadoData);
  },

  /**
   * Realiza o login do usuário.
   * @param {object} credentials - { email, password }.
   * @returns {Promise<object>} A resposta da API com o token.
   */
  login(credentials) {
    return apiClient.post('/api/auth/login', credentials);
  }
  
};