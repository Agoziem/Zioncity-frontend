"use client";
import React, {useState} from 'react';
import * as XLSX from 'xlsx';

const useJsonToExcel = () => {
  const [excelfilename, setExcelFileName] = useState('MyExcelfile'); // set the excel file name
  const [isjsonArray, setIsJsonArray] = useState(false); // Check if the data is an array of objects or a array of array
  const [loadingexcel, setLoadingExcel] = useState(false);
  
  const handleExport = (data) => {
    console.log(isjsonArray)
    setLoadingExcel(true);
    const ws = !isjsonArray ? XLSX.utils.json_to_sheet(data): XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    setLoadingExcel(false);
    XLSX.writeFile(wb,`${excelfilename}.xlsx`);
  };

 
  return {loadingexcel, handleExport};
};

export default useJsonToExcel;


// Usage Example

// const MyComponent = () => {
//   const {loading, exportToExcel, setIsJsonArray, setExcelFileName} = useJsonToExcel([]);

//   // Use `loading` to check whether loading is true or false
//   // Call `exportToExcel` whenever you want to export the data to Excel.
//   // Use `setIsJsonArray` to update whether the data is an array of objects or an array of arrays.
//   // Use `setExcelFileName` to update the excel file name.
  
//   return (
//     <div>
//       <button onClick={exportToExcel}>Export to Excel</button>
//       <input type="checkbox" checked={isjsonArray} onChange={(e) => setIsJsonArray(e.target.checked)} />
//       <input type="text" value={excelfilename} onChange={(e) => setExcelFileName(e.target.value)} />
//       {loading ? <p>Loading...</p> : <p>Export complete!</p>}
//     </div>
//   );
// };

// export default MyComponent;
