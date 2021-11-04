import React, { useEffect, useState } from 'react';
import PostService from './API/PostService';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import Loader from './components/UI/Loader/Loader';
import MyModal from './components/UI/MyModal/MyModal';
import useFetching from './hooks/useFetching';
import { usePosts } from './hooks/usePosts';
import './styles/App.css';
import { getPageCount, getPagesArray } from './utils/pages';
import Pagination from './components/UI/pagination/Pagination';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";






function App() {

  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })


  useEffect(() => {
    fetchPosts()
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }
  const changePage = (page) => {
    setPage(page)
  }

  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Create task
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h1>Error ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
        :
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts about JS' />
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}


{/* Неуправляемый элемент/неуправляемый компонент
        <input ref={bodyInputRef} type='text' />
        <MyInput
          ref={bodyInputRef}
          type='text'
          placeholder='Post description'
        /> 
       
      
      */}
export default App;
