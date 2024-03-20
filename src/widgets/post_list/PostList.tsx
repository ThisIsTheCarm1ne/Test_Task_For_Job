import React, {
  useState,
  useEffect,
} from 'react';
import { PostInterface } from 'src/shared/postInterface';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { set } from '../../features/postIdStore/postIdSlice';

export default function PostList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [firstPost, setFirstPost] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  //Fetch data from the API
  async function fetchData() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/?_start=${firstPost}&_end=${firstPost+10}`);
      const data = await response.json();

      setPosts(prevItems => [...prevItems, ...data]);

      setFirstPost(firstPost+10);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  // 'Read more' button
  function handleReadMoreButtonClick(postId: number) {
    dispatch(set(postId));
    navigate('/post');
  }

  return (
  <>
    <div className='posts_list'>
      {posts.map((post) => (
        <div key={post.id} className='post'>
          <div className='post_info'>
            <h3 className='post_id'>{post.id}</h3>
            <h3 className='post_title'>{post.title}</h3>
          </div>
          {post.body.length > 150 ? (
            <div className='post_content_container'>
              <p className='post_content'>{`${post.body.slice(0, 150)}...`}</p>
              <button
                onClick={() => handleReadMoreButtonClick(post.id)}
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
        </div>
      ))}
    </div>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
  </>
  );
}
