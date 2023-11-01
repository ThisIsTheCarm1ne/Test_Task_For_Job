import { useNavigate } from 'react-router-dom';

import './Post.css';

import SinglePost from 'src/widgets/post/Post'; 

export default function Post() {
  const navigate = useNavigate();

  return (
  <>
    <h1>Post page</h1>
    <button
      onClick={() => navigate('/')}
      className='btn_back'
    >
    Back
    </button>
    <SinglePost />
  </>
  )
}
