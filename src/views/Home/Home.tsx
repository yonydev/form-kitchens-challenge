import React, { useState, useMemo } from 'react';
import type { NextPage } from 'next';

import data from '@/db/products.json';
import { TCol, TProduct } from '@/types';

import Table from './components/Table/Table';
import SearchInput from './components/SearchInput';
import EmptyState from './components/EmptyState';

const Home: NextPage = () => {
  const [foundProducts, setFoundProducts] = useState<TProduct['products'][]>(
    data.products
  );
  const [search, setSearch] = useState<string>('');
  const cols: TCol[] = useMemo(
    () => [
      {
        Header: 'Position',
        accessor: 'position',
      },
      {
        Header: 'Code',
        accessor: 'code',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    []
  );

  const filter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;

    if (searchWord !== '') {
      const results = foundProducts.filter(product => {
        return (
          product.code.toLowerCase().startsWith(searchWord.toLowerCase()) ||
          product.description.toLowerCase().includes(searchWord.toLowerCase())
        );
      });
      setFoundProducts(results);
    } else {
      setFoundProducts(data.products);
    }
    setSearch(searchWord);
  };

  const onClearSearch = () => {
    setSearch('');
    setFoundProducts(data.products);
  };

  return (
    <section className="md:container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center text-stone-500">
        Form Kitchens Products
      </h1>
      <div className="flex items-center">
        <div className="my-4">
          <SearchInput value={search} onChange={filter} />
        </div>
        {search !== '' && (
          <button
            className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
            onClick={onClearSearch}
          >
            Clear Search
          </button>
        )}
      </div>
      <div className="overflow-x-auto relative py-10">
        {foundProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <Table data={foundProducts} columns={cols} />
        )}
      </div>
    </section>
  );
};

export default Home;
