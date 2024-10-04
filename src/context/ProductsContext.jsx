import { collection, getDocs, onSnapshot } from 'firebase/firestore';
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

    return () => unsubscribe();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
