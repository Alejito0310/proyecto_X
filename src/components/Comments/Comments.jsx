import React, { useState, useEffect  } from 'react'
import { FaRegComment } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Btn1 from '../Btn1/Btn1'
import { supabase } from "../../../supabase";
import { useAuth } from '../../context/AuthContext';
import useCounter from '../../Counter/useCounter';
import './Comments.css'
import CommentsList from './CommentsList';
import PostContent from '../../pages/Home/Post/PostContent';


function Comments({ postId, post, currentUser }) {

  const { user } = useAuth()
  const [Open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [postComment, setPostComment] = useState({
    comment: '',
    img_url: '',
  })
  const { count, setCount } = useCounter('comments', 'post_id', postId)

  
  const handlePostCommentChange = (e) => {
    setPostComment({
      ...postComment,
      [e.target.name]: e.target.value
    })
  }
  
  const handleCreateComment = async (e) => {
    e.preventDefault();
    setLoading(true)
    setCount(prev => prev + 1)
    const {data, error} = await supabase.from('comments').insert({
      comment: postComment.comment,
      user_id: user.id,
      post_id: postId,
      img_url: postComment.img_url
    })
    setRefresh(prev => !prev)
    
    if(error){
      console.log(error)
      setCount(prev => prev - 1)
    }else{
      setOpen(false)
      setPostComment({ comment: '', img_url: '' })
    }
    setLoading(false)
  }
  
  const handleLikeComment = async () => {
    const {data} = await supabase.from('likes')
    .select('id')
    .eq('comment_id', Comment?.id)
    .eq('user_id', user?.id)
    .single()

    if(data){
      
    }
  }
  
Comment
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown',handleEsc);
}, []);

  return (
    <div className='coment'>
      <div className="interaction-item">
        <button className="action-btn comment" onClick={() => setOpen(true)}>
          <div className="icon-wrapper">
            <FaRegComment />
          </div>
        </button>
      </div>

      {Open && (
        <div onClick={() => setOpen(false)} className='pop_up'>
          <div className='pop_upContent' onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)}>
              <RxCross2 />
            </button> 
            <PostContent post={post}/>
            <CommentsList postId={postId} refresh={refresh} currentUser={user}/>
            
            <form onSubmit={handleCreateComment}>
            <textarea name="comment" id="comment" placeholder="Post your Answer" value={postComment.comment || ""} onChange={handlePostCommentChange} ></textarea>

            <input type="text"
                name="img_url"
                id="img_url"
                placeholder="image URL"
                value={postComment.img_url}
                onChange={handlePostCommentChange} />

          <Btn1 variant='create_comment' type="submit" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Comment"}
        </Btn1>
          </form>
        </div>
      </div>
      )}
    </div>
  )
}

export default Comments
