import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState, createContext } from 'react';
import { db } from '../../firebase';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productsCollection = collection(db, "products");


    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const updateProducts = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setProducts(updateProducts);
    }, (err) => {
      console.error("Error al obtener los productos:", err);
      setError("Hubo un problema al cargar los productos.");
    });

    return () => unsubscribe();
  }, []);

  const toggleLike = async (productId, currentLikeStatus) => {
    try {
      const newLikeStatus = !currentLikeStatus;
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, { like: newLikeStatus });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, like: newLikeStatus } : product
        )
      );
    } catch (err) {
      console.error("Error al actualizar el estado de like:", err);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, error, toggleLike }}>
      {children}
    </ProductsContext.Provider>
  );
};