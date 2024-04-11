"use client";
import { useState } from 'react';


const useDeleteSingle = (url) => {
    const [loading, setLoading] = useState(false);

    const deleteData = async () => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete data');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteData };
};

export default useDeleteSingle;


// Usage:

// import useDeleteSingle from './hooks/useDeleteSingle';
// const MyComponent = () => {
//     const { loading, deleteData } = useDeleteSingle('/api/data');

//     const handleDelete = async () => {
//         await deleteData();
//         // Perform any additional actions after deleting data
//     };

//     return (
//         <div>
//             <button onClick={handleDelete} disabled={loading}>
//                 {loading ? 'Deleting...' : 'Delete Data'}
//             </button>
//         </div>
//     );
// };

// export default MyComponent;
