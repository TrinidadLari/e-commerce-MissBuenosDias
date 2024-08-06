
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { createContext, useState } from 'react';

import { db } from '../../firebase';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
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



  return (
    <div>ProductsContext</div>
  )
}
