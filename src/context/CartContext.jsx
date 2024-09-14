import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);


  const saveCartToFirestore = async (newCart) => {
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      try {
        await setDoc(cartRef, { cart: newCart });
        console.log('Carrito guardado en Firebase:', newCart);
      } catch (err) {
        console.error('Error actualizando el carrito en Firebase:', err);
      }
    }
  };


  useEffect(() => {
    if (!user) return;

    const cartRef = doc(db, 'carts', user.uid);
    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        const cartData = docSnap.data().cart;
        setCart(cartData);
        console.log('Carrito cargado desde Firebase:', cartData);
      } else {
        console.log('No se encontró el carrito, creando uno nuevo.');
        setCart([]);
        saveCartToFirestore([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart }}>
      {children}
    </CartContext.Provider>
  );
};