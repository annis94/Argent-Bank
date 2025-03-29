import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  if (token) {
    // Format correct pour le header d'authentification
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Request headers:', config.headers);
  } else {
    console.log('No token found in storage');
  }
  
  return config;
});

/**
 * Fonction de login
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns Réponse normalisée selon la doc Swagger { token: string }
 */
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/user/login', { email, password });
    console.log('Login API response (raw):', response.data);
    
    // Normalisation de la réponse selon la documentation Swagger
    let normalizedResponse;
    
    if (response.data && response.data.body && response.data.body.token) {
      // Format API mémoire - conversion au format Swagger
      normalizedResponse = { token: response.data.body.token };
      console.log('Normalized response (from memory API format):', normalizedResponse);
    } 
    else if (response.data && response.data.token) {
      // Format API original - déjà au format Swagger
      normalizedResponse = { token: response.data.token };
      console.log('Normalized response (from original API format):', normalizedResponse);
    }
    else {
      console.error('Format de réponse inattendu:', response.data);
      throw new Error('Format de réponse API invalide');
    }
    
    // Si la connexion réussit, stocker le token
    if (normalizedResponse.token) {
      sessionStorage.setItem('token', normalizedResponse.token);
      console.log('Token stored in sessionStorage');
    }
    
    // Conservation de la réponse d'origine pour compatibilité
    return {
      ...normalizedResponse,
      originalResponse: response.data
    };
  } catch (error) {
    console.error('Erreur de connexion à l\'API:', error);
    throw error;
  }
};

/**
 * Récupère le profil de l'utilisateur
 * @returns Données du profil utilisateur
 */
export const getUserProfile = async () => {
  try {
    // Vérification du token avant l'appel
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log('Token used for profile request:', token ? 'Present' : 'Missing');
    
    const response = await api.post('/user/profile');
    console.log('Profile API response (raw):', response.data);
    
    // Normalisation de la réponse
    let normalizedResponse;
    
    if (response.data && response.data.body) {
      // Format API mémoire
      normalizedResponse = {
        email: response.data.body.email,
        firstName: response.data.body.firstName,
        lastName: response.data.body.lastName,
        // Conservation de la réponse d'origine
        originalResponse: response.data
      };
    } else {
      // Format API original ou autre
      normalizedResponse = {
        ...response.data,
        // Ajouter originalResponse même si c'est déjà au bon format
        originalResponse: response.data
      };
    }
    
    console.log('Normalized profile response:', normalizedResponse);
    return normalizedResponse;
  } catch (error) {
    console.error('Erreur de connexion à l\'API:', error);
    throw error;
  }
};

/**
 * Met à jour le profil de l'utilisateur
 * @param firstName Prénom
 * @param lastName Nom
 * @returns Réponse de l'API après mise à jour
 */
export const updateUserProfile = async (firstName: string, lastName: string) => {
  try {
    const response = await api.put('/user/profile', { firstName, lastName });
    console.log('Update profile API response (raw):', response.data);
    
    // Normalisation de la réponse
    let normalizedResponse;
    
    if (response.data && response.data.body) {
      // Format API mémoire
      normalizedResponse = {
        email: response.data.body.email,
        firstName: response.data.body.firstName,
        lastName: response.data.body.lastName,
        // Conservation de la réponse d'origine
        originalResponse: response.data
      };
    } else {
      // Format API original ou autre
      normalizedResponse = {
        ...response.data,
        // Ajouter originalResponse même si c'est déjà au bon format
        originalResponse: response.data
      };
    }
    
    console.log('Normalized update profile response:', normalizedResponse);
    return normalizedResponse;
  } catch (error) {
    console.error('Erreur de connexion à l\'API:', error);
    throw error;
  }
};