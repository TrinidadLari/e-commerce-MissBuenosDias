import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setNickname(userDoc.data().nickname);
        }

        const likesCollection = collection(db, `users/${currentUser.uid}/likes`);
        const likesSnapshot = await getDocs(likesCollection);
        const userLikes = likesSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data().like;
          return acc;
        }, {});

        setLikes(userLikes);
        setUser(currentUser);
      } else {
        setUser(null);
        setNickname('');
        setLikes({});
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleLike = async (productId, currentLikeStatus) => {
    if (!user) {
      console.error('Debes estar autenticado para dar like.');
      return;
    }

    const newLikeStatus = !currentLikeStatus;

    try {
      const likeRef = doc(db, `users/${user.uid}/likes`, productId);


      await setDoc(likeRef, { like: newLikeStatus });


      setLikes((prevLikes) => ({
        ...prevLikes,
        [productId]: newLikeStatus,
      }));
    } catch (err) {
      console.error('Error al actualizar el estado de like:', err);
    }
  };


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
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      setError('Error al cerrar sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, register, loading, error, nickname, signOut, likes, toggleLike }}>
      {children}
    </AuthContext.Provider>
  );
};