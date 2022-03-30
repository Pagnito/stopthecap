import React from 'react';
import {useSelector} from 'react-redux';

let CategoryFilters = ({ updateCategoryFilters, checked }) => {
  let collections = useSelector(({ products }) => products.collections);
  let categories = collections.map((collection) => collection.node.title);
  return (
    <div className="border-none text-xs pr-3 pl-1">
      {categories.map((category) => {
        return (
          <div className="mt-4 flex items-center" key={category}>
            <input onClick={() => updateCategoryFilters(category)} checked={checked.includes(category) ? true : false} className="text-red-500 bg-red-500" type="checkbox" />
            <div className="ml-2">{category}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryFilters;