import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchPostById, updatePost, resetSelectedPost } from '../redux/postsSlice';

const NewPostForm = ({ editId, setEditId, toggleModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef();
  const dispatch = useDispatch();
  
  const postToEdit = useSelector((state) => state.posts.selectedPost);

  useEffect(() => {
    if (editId) {
      dispatch(fetchPostById(editId));
    }
  }, [editId, dispatch]);

  useEffect(() => {
    if (postToEdit && editId) {
      setTitle(postToEdit.title || '');
      setDescription(postToEdit.description || '');
      setImagePreview(`https://resolut-backend-1.onrender.com/${postToEdit.imageUrl.replace(/\\/g, '/')}` || null);
    }
  }, [postToEdit, editId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);

    if (editId) {
      dispatch(updatePost({ id: editId, formData }));
    } else {
      dispatch(createPost(formData));
    }

    setTitle('');
    setDescription('');
    setImage(null);
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }

    dispatch(resetSelectedPost());
    toggleModal();
    setEditId('');
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={toggleModal}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            toggleModal();
            setEditId('');
            dispatch(resetSelectedPost());
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {editId ? 'Edit Post' : 'Create New Post'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post description"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              ref={imageInputRef}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Selected"
                className="w-full h-40 object-cover rounded-lg shadow-md mb-4"
              />
              <button
                onClick={handleRemoveImage}
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            {editId ? 'Update Post' : 'Add Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPostForm;
