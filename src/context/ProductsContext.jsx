import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState, createContext } from 'react';
import { db } from '../../firebase';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  console.log('ProductsProvider rendering');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        console.log("todo viene bien!!");
        const productsData = await getDocs(productsCollection);

        const updateProducts = productsData.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });

        console.log(updateProducts);
        setProducts(updateProducts);
      } catch (err) {
        console.error("Error al obtener los productos:", err);
        setError("Hubo un problema al cargar los productos.");
      }
    };

    getProducts();
  }, []);

  console.log('ProductsProvider children:', children);

  return (
    <ProductsContext.Provider value={{ products, error }}>
      {children}
    </ProductsContext.Provider>
  );
};