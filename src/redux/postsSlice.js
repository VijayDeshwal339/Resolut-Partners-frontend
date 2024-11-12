import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://resolut-backend-1.onrender.com/api/posts');
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (newPostData) => {
  const response = await axios.post('https://resolut-backend-1.onrender.com/api/posts', newPostData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  await axios.delete(`https://resolut-backend-1.onrender.com/api/posts/${postId}`);
  return postId;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, formData }) => {
  const response = await axios.put(`https://resolut-backend-1.onrender.com/api/posts/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId) => {
  const response = await axios.get(`https://resolut-backend-1.onrender.com/api/posts/${postId}`);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    selectedPost: null,
  },
  reducers: {
    resetSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
      });
  }
});

export const { resetSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;

