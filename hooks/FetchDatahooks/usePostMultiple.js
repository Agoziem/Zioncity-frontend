"use client";
import { useState } from 'react';


const usePostMultiple = (url, initialData) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const postData = async (postData) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error posting data:', error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, postData };
};

export default usePostMultiple;


// import React from 'react';
// import usePostMultiple from './hooks/usePostMultiple';
// const App = () => {
//     const url = 'https://api.example.com/posts';
//     const initialData = [];

//     const { data, loading, postData } = usePostMultiple(url, initialData);

//     const handlePostData = () => {
//         const postData = { title: 'New Post', content: 'Hello, world!' };
//         postData(postData);
//     };

//     return (
//         <div>
//             <button onClick={handlePostData} disabled={loading}>
//                 {loading ? 'Loading...' : 'Post Data'}
//             </button>
//             {data && (
//                 <ul>
//                     {data.map((post) => (
//                         <li key={post.id}>{post.title}</li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default App;
