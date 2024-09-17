import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState, createContext } from 'react';
import { db } from '../../firebase';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsData = await getDocs(productsCollection);
        const updateProducts = productsData.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });

        setProducts(updateProducts);
      } catch (err) {
        console.error("Error al obtener los productos:", err);
        setError("Hubo un problema al cargar los productos.");
      }
    };

    getProducts();
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
