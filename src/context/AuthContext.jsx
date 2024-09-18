import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setNickname(userDoc.data().nickname);
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setNickname('');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async (email, password, nickname) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        nickname: nickname,
        createdAt: new Date()
      });

      setError(null);
      console.log('Registro y almacenamiento en Firestore exitoso');



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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError(null);
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setNickname('');
      console.log('Cierre de sesión exitoso');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      setError('Error al cerrar sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, register, loading, error, nickname, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};