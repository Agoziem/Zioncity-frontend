"use client";
import { useState } from 'react';


const usePostSingle = (url, initialData) => {
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

export default usePostSingle;


// import React from 'react';
// import usePostSingle from './hooks/usePostSingle';
// const App = () => {
//     const url = 'https://api.example.com/posts';
//     const initialData = { title: '', content: '' };
//     const { data, loading, postData } = usePostSingle(url, initialData);

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const postData = {
//             title: formData.get('title'),
//             content: formData.get('content'),
//         };
//         postData(postData);
//     };

//     return (
//         <div>
//             <form onSubmit={handleFormSubmit}>
//                 <input type="text" name="title" placeholder="Title" />
//                 <textarea name="content" placeholder="Content" />
//                 <button type="submit">Submit</button>
//             </form>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <div>
//                     <h2>{data.title}</h2>
//                     <p>{data.content}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default App;
