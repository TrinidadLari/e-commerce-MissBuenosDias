
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { createContext, useState } from 'react';

import { db } from '../../firebase';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsArray, setProductsArray] = useState([]);
  console.log('ProductsProvider rendering');

  useEffect(() => {
    console.log("useeffect anda wuachin")
    const collectionRef = collection(db, "products");
    console.log("todo viene bien!!");
    onSnapshot(collectionRef, (data) => {
      const updateProductsArray = data?.docs?.map((product) => {
        return { ...product.data(), id: product.id };
      });
      console.log(updateProductsArray);

      setProductsArray(updateProductsArray);
    });

  }, []);

  console.log('ProductsProvider children:', children);

  <ProductsContext.Provider value={{ productsArray }}>
    {children}
  </ProductsContext.Provider>
}
