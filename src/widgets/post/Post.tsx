import {
  useEffect,
  useState
} from 'react'
import { PostInterface } from 'src/shared/postInterface';

import type { RootState } from '../../app/store'
import { useSelector } from 'react-redux'

export default function SinglePost() {
  const [post, setPost] = useState<PostInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postId = useSelector((state: RootState) => state.counter.value)

  // Define a function to fetch data from the API
  async function fetchData() {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${postId}`);
      const data = await response.json();
      setPost(data[0]);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <div className='post_container'>
      <div className='post'>
        <div className='post_info'>
          <h3 className='post_id'>{post?.id}</h3>
          <h3 className='post_title'>{post?.title}</h3>
        </div>
        <p>{post?.body}</p>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  )
}
