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

  // Agregar producto al carrito o actualizar la cantidad
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      let updatedCart;

      if (existingProduct) {
        updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity }];
      }

      saveCartToFirestore(updatedCart);
      return updatedCart;
    });
  };

  // Remover un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      saveCartToFirestore(updatedCart);
      return updatedCart;
    });
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
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};