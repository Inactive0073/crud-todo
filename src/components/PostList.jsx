import React from 'react';
import PostItem from './PostItem';



const PostList = ({posts,tittle,remove}) => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                {tittle}
            </h1>
            {posts.map((post,index) =>
                <PostItem remove = {remove}  number = {index + 1}  post={post} key={post.id} />
            )}
        </div>
    );
};

export default PostList;