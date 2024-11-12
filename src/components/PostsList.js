import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postsSlice';
import PostCard from './PostCard';

const PostsList = ({setEditId,toggleModal}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postStatus === 'succeeded') {
    content = posts.map((post) => <PostCard key={post._id} post={post} setEditId={setEditId} toggleModal={toggleModal} />);
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return <div className="posts-list">{content}</div>;
};

export default PostsList;
