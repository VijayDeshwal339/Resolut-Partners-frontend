import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../redux/postsSlice';
import { FaHeart, FaRegComment, FaShareAlt } from 'react-icons/fa';

const PostCard = ({ post, setEditId, toggleModal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const dropdownRef = useRef(null);
  const imageUrl = `https://resolut-backend-1.onrender.com/${post.imageUrl.replace(/\\/g, '/')}`;
  const dispatch = useDispatch();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleLike = () => setLiked((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const onDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden transition-transform transform hover:scale-105 duration-200 mt-5">
      <div className="relative">
        <img className="rounded-t-lg w-full h-48 object-cover" src={imageUrl} alt={post.title} />
        
        {/* Dropdown button */}
        <button
         onClick={(e) => {
         e.stopPropagation();
         toggleDropdown();
        }}
       className="absolute top-3 right-3 bg-gray-700 dark:bg-gray-900 text-gray-100 rounded-full p-2 hover:bg-gray-600 dark:hover:bg-gray-800 transition duration-200 shadow-md"
       >
         ⋯
       </button>


        {/* Dropdown menu */}
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-10 right-2 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
          >
            <button
              onClick={() => {
                setEditId(post._id);
                toggleModal();
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete(post._id);
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="p-5">
        <h5 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white truncate">{post.title}</h5>
        <p className="mb-4 text-gray-700 dark:text-gray-400 text-sm line-clamp-3 overflow-hidden">{post.description}</p>
      </div>

      {/* Responsive Like, Comment, Share Actions */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex flex-wrap justify-around items-center text-gray-600 dark:text-gray-400">
        <button
          onClick={toggleLike}
          className={`flex items-center space-x-2 ${liked ? 'text-red-500' : ''} hover:text-red-500 transition duration-200`}
        >
          <FaHeart size={20} />
          <span className="text-sm font-medium">{liked ? 'Liked' : 'Like'}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500 transition duration-200">
          <FaRegComment size={20} />
          <span className="text-sm font-medium">Comment</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500 transition duration-200">
          <FaShareAlt size={20} />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
