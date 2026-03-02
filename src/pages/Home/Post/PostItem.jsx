import React from 'react';
import Likes from '../../../components/Likes/Likes';
import Comments from '../../../components/Comments/Comments';
import Counter from '../../../counter/counter';
import PostContent from './PostContent';
import './Posts.css'

function PostItem({post, currentUser, onDelete}) {

  return (
    <div className='postItem-container'>
        <PostContent post={post} />

        <div className='post-interactions'>
            <div className='interaction'>
              <div className='interaction-wrapped'>
                <Counter table="comments" column="post_id" value={post.id}>
                    <Comments postId={post.id} post={post} />
                </Counter>
              </div>
              <div>
                {post.id && <Likes postId={post.id}  currentUser={currentUser} />}
              </div>
            </div>


        {currentUser && post.user_id === currentUser.id && (
        <button className='delete-btn' onClick={() => onDelete(post.id)}>
          Eliminar
        </button>
      )}
        </div>
    </div>
  )
}

export default PostItem
