import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { doc, setDoc, getDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [buys, setBuys] = useState([]);
  const { user, nickname } = useContext(AuthContext);

  const saveCartToFirestore = async (newCart) => {
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      try {
        await setDoc(cartRef, { cart: newCart });
      } catch (err) {
        console.error('Error actualizando el carrito en Firebase:', err);
      }
    }
  };

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

      const buyDetails = [];

      for (const product of cart) {
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, {
          stock: product.stock - product.quantity
        });
        buyDetails.push({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          image: product.image,
        });
      }

      if (user) {
        const historyRef = doc(db, 'buyHistory', user.uid);

        const historySnap = await getDoc(historyRef);

        if (historySnap.exists()) {
          await updateDoc(historyRef, {
            buys: arrayUnion({
              date: new Date().toISOString(),
              items: buyDetails,
              total: buyDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)
            })
          });
        } else {
          await setDoc(historyRef, {
            buys: [{
              date: new Date().toISOString(),
              items: buyDetails,
              total: buyDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)
            }]
          });
        }
      }

      const message = prepareWhatsAppMessage();


      if (user) {
        await setDoc(doc(db, 'carts', user.uid), { cart: [] });
      }

      setCart([]);

      window.open(`https://wa.me/+5493464443683?text=${encodeURIComponent(message)}`, '_blank');

    } catch (err) {
      console.error("Error en la confirmación de la compra:", err);
    }
  };

  const prepareWhatsAppMessage = () => {
    let message = `Hola, soy ${nickname}\nTe encargo:\n`;

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

    const historyRef = doc(db, 'buyHistory', user.uid);
    const unsubscribe = onSnapshot(historyRef, (docSnap) => {
      if (docSnap.exists()) {
        setBuys(docSnap.data().buys || []);
      } else {
        setBuys([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const cartRef = doc(db, 'carts', user.uid);
    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        const cartData = docSnap.data().cart;
        setCart(cartData);
      } else {
        setCart([]);
        saveCartToFirestore([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, handleConfirmBuy, removeAllFromCart, buys }}>
      {children}
    </CartContext.Provider>
  );
};
