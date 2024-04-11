import React, { useEffect } from 'react';
import useFetchMultiple from '../hooks/useFetchMultiple';
import usePostSingle from '../hooks/usePostSingle';
import useUpdateSingle from '../hooks/useUpdateSingle';
import useDeleteSingle from '../hooks/useDeleteSingle';

const MyComponent = () => {
  // Example usage of useFetchMultiple
  const { data: posts, loading: fetchLoading, fetchData: fetchPosts } = useFetchMultiple();

  // Example usage of usePostSingle
  const { loading: postLoading, postData: createPost } = usePostSingle();

  // Example usage of useUpdateSingle
  const { loading: updateLoading, updateData: updatePost } = useUpdateSingle();

  // Example usage of useDeleteSingle
  const { loading: deleteLoading, deleteData: deletePost } = useDeleteSingle();
// 
  useEffect(() => {
    // Fetch data when component mounts
    fetchPosts('https://api.example.com/posts');
  }, [fetchPosts]);

  const handleCreatePost = () => {
    // Create a new post
    createPost('https://api.example.com/posts', { title: 'New Post', body: 'Lorem ipsum...' });
  };

  const handleUpdatePost = () => {
    // Update an existing post
    updatePost('https://api.example.com/posts/1', { title: 'Updated Post', body: 'Lorem ipsum updated...' });
  };

  const handleDeletePost = () => {
    // Delete an existing post
    deletePost('https://api.example.com/posts/1');
  };

  return (
    <div>
      {fetchLoading && <p>Loading posts...</p>}
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      <button onClick={handleCreatePost} disabled={postLoading}>Create Post</button>
      <button onClick={handleUpdatePost} disabled={updateLoading}>Update Post</button>
      <button onClick={handleDeletePost} disabled={deleteLoading}>Delete Post</button>
    </div>
  );
};

export default MyComponent;
