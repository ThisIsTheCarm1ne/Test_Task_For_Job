import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { set } from '../../features/postIdStore/postIdSlice';

import PostList from 'src/widgets/post_list/PostList';

import './Index.css';

export default function Index() {
  return (
  <>
    <h1>Index page</h1>
    <PostList />
  </>
  );
}
