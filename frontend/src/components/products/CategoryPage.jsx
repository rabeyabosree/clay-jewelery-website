import React from 'react';
import { useSelector } from 'react-redux';

function CategoryPage() {
  const { items } = useSelector((state) => state.products);

  const categories = items.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  return (
    <div className="p-4">
      {categories.length > 0 ? (
        <div className="overflow-x-auto">
          <ul className="flex space-x-4">
            {categories.map((category, index) => (
              <li
                key={index}
                className="min-w-[150px] p-3 bg-blue-100 rounded-md text-center shrink-0"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}

export default CategoryPage;
