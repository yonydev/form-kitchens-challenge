/* eslint-disable no-nested-ternary */
import { FC } from 'react';
import { useTable, useSortBy, Column } from 'react-table';

interface TTableProps {
  data: Array<object>;
  columns: Array<Column<object>>;
}

const Table: FC<TTableProps> = ({ data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);
  return (
    <table
      className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      {...getTableProps()}
    >
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(col => (
              <th
                scope="col"
                className="py-3 px-6"
                {...col.getHeaderProps(col.getSortByToggleProps())}
                key={col.id}
              >
                {col.render('Header')}
                <span>
                  {col.isSorted ? (col.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, idx) => {
          prepareRow(row);
          return (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              {...row.getRowProps()}
              key={idx}
            >
              {row.cells.map(cell => (
                <td
                  className="py-4 px-6"
                  {...cell.getCellProps()}
                  key={cell.value}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
