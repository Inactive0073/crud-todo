import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';




const PostForm = ({create}) => {
    const [post, setPost] = useState({ tittle: '', body: '' })

    const addNewPost = (e) => {
        e.preventDefault()
    
        const newPost = {
            ...post, id: Date.now ()
        }
        create(newPost)
        setPost({ tittle: '', body: '' });
    
      }

    return (
        <form>
            {/* Управляемый компонент */}
            <MyInput
                value={post.tittle}
                onChange={e => setPost({ ...post, tittle: e.target.value })}
                type='text'
                placeholder='Post name'
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
                type='text'
                placeholder='Post description '
            />

            <MyButton onClick={addNewPost}>Create Post</MyButton>
        </form>
    )
}
export default PostForm;