import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { set } from '../../features/postIdStore/postIdSlice';

export default function PostList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [posts, setPosts] = useState<any[]>([]);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);

  const loadMoreRef = useRef<any>(null);

  //Fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  //Infinite scroll
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        loadMoreRef.current.offsetTop
      ) {
        // If the user has scrolled to the end, load more posts
        setPostsPerPage((prevVisiblePosts) => prevVisiblePosts + postsPerPage);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [postsPerPage]);

  // 'Read more' button
  function handleButtonClick(postId: number) {
    dispatch(set(postId));
    navigate('/post');
  }

  return (
  <>
    <ul className='posts_list'>
      {posts.slice(0, postsPerPage).map((post) => (
        <li key={post.id} className='post'>
          <div className='post_info'>
            <h3 className='post_id'>{post.id}</h3>
            <h3 className='post_title'>{post.title}</h3>
          </div>
            {post.body.length > 150 ? (
              <div className='post_content_container'>
                <p className='post_content'>{`${post.body.slice(0, 150)}...`}</p>
                <button
                  onClick={() => handleButtonClick(post.id)}
                  className='read_more_btn'
                >
                  Read more
                </button>
              </div>
            ) : (
              <div className='post_content_container'>
                <p className='post_content'>{post.body}</p>
              </div>
            )}
        </li>
      ))}
    </ul>
    <div ref={loadMoreRef}></div>
  </>
  );
}
