//class を全て書き換えてhookを使用したfunctionにする
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function ProductCategoryRow(props) {
  const category = props.category;
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow(props) {
  const product = props.product;
  const name = product.stocked ?
    product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable(props) {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;
  const rows = [];
  let lastCategory = null;
  props.products.forEach((product) => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    );
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar(props) {

  // function handleFilterTextChange(e) {
  //   props.onFilterTextChange(e.target.value);
  // }

  function handleInStockChange(e) {
    props.onInStockChange(e.target.checked);
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={props.filterText}
        onChange={props.onFilterTextChange}
      />
      <p>
        <input
          type="checkbox"
          checked={props.inStockOnly}
          onChange={handleInStockChange}
        />
        {' '}
          Only show products in stock
        </p>
    </form>
  );
}

function FilterableProductTable(props) {
  const [filterText, setFilterText] = useState('');
  useEffect(() => {
    setFilterText(filterText);
  }, [filterText]);

  const [inStockOnly, setInStockOnly] = useState(false);
  function handleInStockChange(inStockOnly) {
    setInStockOnly(inStockOnly);
  }

  return (
      <div>
        <SearchBar
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={() => setFilterText(filterText)}
          onInStockChange={handleInStockChange}
        />
        <ProductTable
          products={props.products}
          filterText={filterText}
          inStockOnly={inStockOnly}
        />
      </div>
    );
}


const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);