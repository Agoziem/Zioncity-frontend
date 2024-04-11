"use client";
import { useState, useEffect } from 'react';

const useFetchSingle = (url) => {
    const [data, setData] = useState(null);
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

export default useFetchSingle;

// import useFetchSingle from './hooks/useFetchSingle';
// const ExampleComponent = () => {
//     const { data, loading } = useFetchSingle('https://api.example.com/data');

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!data) {
//         return <div>No data available</div>;
//     }

//     return (
//         <div>
//             <h1>{data.title}</h1>
//             <p>{data.description}</p>
//         </div>
//     );
// };

// export default ExampleComponent;
