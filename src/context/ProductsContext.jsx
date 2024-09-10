
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { createContext, useState } from 'react';

import { db } from '../../firebase';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  console.log('ProductsProvider rendering');

  useEffect(() => {
    const getProducts = async () => {
      const productsCollection = collection(db, "products");
      console.log("todo viene bien!!");
      const productsData = await getDocs(productsCollection);

      const updateProducts = productsData.docs.map((product) => {
        return { ...product.data(), id: product.id };
      });


      console.log(updateProducts);

      setProducts(updateProducts);
    };
    getProducts();
  }, []);

  console.log('ProductsProvider children:', children);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};


