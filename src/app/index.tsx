import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Index from '../pages/index/Index'
import Post from '../pages/post/Post'

import { store } from './store'
import { Provider } from 'react-redux'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const reactRoot = createRoot(
  document.getElementById('root')!,
)

let persistor = persistStore(store);

reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/post' element={<Post />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
