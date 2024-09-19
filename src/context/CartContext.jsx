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
        console.log('Carrito guardado en Firebase:', newCart);
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

      console.log('Carrito actualizado:', updatedCart);
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
      console.log("Iniciando la confirmación de compra");

      const buyDetails = [];

      // Actualizar stock de productos
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
        });
      }

      console.log("Stock actualizado. Detalles de la compra:", buyDetails);

      // Verificar si el usuario está logueado
      if (user) {
        const historyRef = doc(db, 'buyHistory', user.uid);

        // Cambiar get() por getDoc()
        const historySnap = await getDoc(historyRef);

        // Verificar si el documento existe
        if (historySnap.exists()) {
          // Si el documento existe, usar updateDoc
          await updateDoc(historyRef, {
            buys: arrayUnion({
              date: new Date().toISOString(),
              items: buyDetails,
              total: buyDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)
            })
          });
        } else {
          // Si el documento no existe, usar setDoc para crearlo
          await setDoc(historyRef, {
            buys: [{
              date: new Date().toISOString(),
              items: buyDetails,
              total: buyDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)
            }]
          });
        }
      }

      console.log("Historial de compra actualizado");

      const message = prepareWhatsAppMessage();

      // Actualizar carrito del usuario
      if (user) {
        await setDoc(doc(db, 'carts', user.uid), { cart: [] });
      }

      setCart([]);
      console.log("Carrito actualizado a vacío. Mensaje de WhatsApp preparado:", message);

      // Abrir WhatsApp con el mensaje codificado
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
        console.log('No se encuentra historial de compra');
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
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, handleConfirmBuy, removeAllFromCart, buys }}>
      {children}
    </CartContext.Provider>
  );
};
