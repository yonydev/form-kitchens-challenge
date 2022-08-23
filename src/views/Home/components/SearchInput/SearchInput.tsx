/* eslint-disable no-unused-vars */
import React, { FC } from 'react';

type TSearchInput = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const SearchInput: FC<TSearchInput> = ({ onChange, value }) => {
  return (
    <div className="text-gray-600">
      <input
        value={value}
        onChange={onChange}
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        placeholder="Search"
      ></input>
    </div>
  );
};

export default SearchInput;
