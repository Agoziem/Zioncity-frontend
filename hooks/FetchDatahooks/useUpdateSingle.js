"use client";
import { useState } from 'react';


const useUpdateSingle = (url, initialData) => {
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

export default useUpdateSingle;

// Usage Example
// import React from 'react';
// import useUpdateSingle from './hooks/useUpdateSingle';
// const MyComponent = () => {
//     const url = 'https://api.example.com/data'; // Replace with your API endpoint
//     const initialData = { name: 'John Doe', age: 30 }; // Replace with your initial data

//     const { data, loading, updateData } = useUpdateSingle(url, initialData);

//     const handleUpdate = () => {
//         const updatedData = { name: 'Jane Doe', age: 35 }; // Replace with your updated data
//         updateData(updatedData);
//     };

//     return (
//         <div>
//             <h1>Data: {JSON.stringify(data)}</h1>
//             <button onClick={handleUpdate} disabled={loading}>
//                 {loading ? 'Updating...' : 'Update Data'}
//             </button>
//         </div>
//     );
// };

// export default MyComponent;
