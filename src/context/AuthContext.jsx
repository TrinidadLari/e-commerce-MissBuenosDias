import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("Usuario autenticado:", currentUser);
    });
    return () => unsubscribe();
  }, []);

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      console.log('Registro exitoso');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.error('Error: El correo electrónico ya está en uso.');
        setError('Este correo electrónico ya está registrado. Por favor, usa otro.');
      } else {
        console.error('Error al registrarse:', err);
        setError('Error al registrarse. Por favor, intenta nuevamente.');
      }
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, register, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};