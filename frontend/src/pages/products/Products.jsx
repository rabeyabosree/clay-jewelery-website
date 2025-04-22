import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productSlice';

function Products() {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchProducts());
      }
    }, [status, dispatch]);
  return (
    <div>Products</div>
  )
}

export default Products