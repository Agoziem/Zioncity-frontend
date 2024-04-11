"use client";
import { useState } from 'react';


const useUpdateMultiple = (url, initialData) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const updateData = async (updatedData) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, updateData };
};

export default useUpdateMultiple;


// import React, { useEffect } from 'react';
// import useUpdateMultiple from './hooks/useUpdateMultiple';
// const MyComponent = () => {
//     const url = 'https://api.example.com/data'; // Replace with your API endpoint
//     const initialData = []; // Replace with your initial data

//     const { data, loading, updateData } = useUpdateMultiple(url, initialData);

//     useEffect(() => {
//         // Fetch initial data or perform any other actions on component mount
//         // For example:
//         // const fetchData = async () => {
//         //   const response = await fetch(url);
//         //   const jsonData = await response.json();
//         //   updateData(jsonData);
//         // };
//         // fetchData();
//     }, []);

//     const handleUpdate = () => {
//         // Perform update action
//         // For example:
//         // const updatedData = [...data, { id: 1, name: 'New Data' }];
//         // updateData(updatedData);
//     };

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <div>
//                     <button onClick={handleUpdate}>Update Data</button>
//                     <ul>
//                         {data.map((item) => (
//                             <li key={item.id}>{item.name}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyComponent;
