"use client";
import { useState, useEffect } from 'react';

const useFetchMultiple = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading };
};

export default useFetchMultiple;

// Usage:

// import useFetchMultiple from './hooks/useFetchMultiple';
// const MyComponent = () => {
//     const { data, loading } = useFetchMultiple('https://api.example.com/data');

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             {data.map((item) => (
//                 <div key={item.id}>{item.name}</div>
//             ))}
//         </div>
//     );
// };

// export default MyComponent;
