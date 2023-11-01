import { useEffect, useState } from 'react'
import type { RootState } from '../../app/store'
import { useSelector } from 'react-redux'

export default function SinglePost() {
  const [post, setPost] = useState<any>();
  const postId = useSelector((state: RootState) => state.counter.value)

  useEffect(() => {
    // Define a function to fetch data from the API
    async function fetchData() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${postId}`);
        const data = await response.json();
        setPost(data[0]);
        console.log(postId, post);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
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
      </div>
    </div>
  )
}
