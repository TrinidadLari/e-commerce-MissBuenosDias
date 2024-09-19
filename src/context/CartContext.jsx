import { createContext, useState, useEffect, useContext } from 'react';

import { AuthContext } from './AuthContext';
import { doc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, nickname } = useContext(AuthContext);


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

      console.log('Carrito actualizado:', updatedCart);
      saveCartToFirestore(updatedCart);
      return updatedCart;
    });
  };

  // eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      saveCartToFirestore(updatedCart);
      return updatedCart;
    });
  };

  const removeAllFromCart = () => {
    setCart([]);
    saveCartToFirestore([]);
  };


  const handleConfirmBuy = async () => {
    try {
      for (const product of cart) {
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, {
          stock: product.stock - product.quantity
        });
      }
      console.log("Compra confirmada y stock actualizado");


      const message = prepareWhatsAppMessage();


      if (user) {
        await setDoc(doc(db, 'carts', user.uid), { cart: [] });
      }
      setCart([]);


      window.open(`https://wa.me/+5493464443683?text=${encodeURIComponent(message)}`, '_blank');



    } catch (err) {
      console.error("Error actualizando el stock:", err);
    }
  };

  const prepareWhatsAppMessage = () => {
    let message = `Hola mi soy ${nickname}\nTe encargo:\n`;

    cart.forEach(product => {
      const subtotal = product.price * product.quantity;
      message += `${product.quantity}x ${product.name} - Subtotal: $${subtotal.toFixed(2)}\n`;
    });

    const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    message += `\nTotal de la compra: $${total.toFixed(2)}\n\nAcordemos forma de pago y envío.`;

    return message;
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
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, handleConfirmBuy, removeAllFromCart }}>
      {children}
    </CartContext.Provider>
  );
};