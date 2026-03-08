import React from "react";

export interface TableColumn<T> {
    header: string;
    key: keyof T | 'actions';
    render?: (row: T) => React.ReactNode
}

export interface ReusableTableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void
}

export default function ReusableTable<T>({
    columns,
    data,
    totalPages,
    currentPage,
    onPageChange
}: ReusableTableProps<T>){
    return(
        <div className="table-container w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full text-left border-collapse">
                <thead>
                    <tr>
                        {
                            columns.map((col, index) => (
                                <th className="px-6  py-4 whitespace-nowrap text-xs font-semibold tracking-wider text-gray-500 uppercase" key={col.key.toString() + index}>{col.header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {
                        data.map((row, index) => (
                            <tr className="hover:bg-gray-50 transition-colors" key={index}>
                                {
                                    columns.map((col, colIndex) => (
                                        <td className="px-6 whitespace-nowrap py-4 text-sm text-gray-700 whitespace-nowrap" key={col.key.toString() + colIndex}>
                                            {col.render
                                                ? col.render(row)
                                                : (row[col.key as keyof T] as React.ReactNode)
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
    <p className="text-sm font-medium text-gray-600">Showing {currentPage} of {totalPages} pages</p>
    <div className="flex gap-2">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
        Previous
      </button>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50">
        Next
      </button>
    </div>
  </div>
        </div>
    )
}