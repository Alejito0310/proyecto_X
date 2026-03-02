import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Likes from '../Likes/Likes';
import { FaRegTrashAlt } from "react-icons/fa";
import { supabase } from "../../../supabase";

function CommentsList({postId, refresh, currentUser}) {
const navigate = useNavigate()
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)


    const handleDeleteComment = async (commentId) =>{
        setLoading(true)
        const {error} = await supabase.from('comments')
        .delete()
        .eq('id', commentId)
        if(error){
          console.log(error)
        }else{
          setComments(prev => prev.filter(c => c.id !== commentId))
        }
        setLoading(false)
    }
    
useEffect(() => {
    const fetchComments = async () => {
        setLoading(true)
        const {data, error} = await supabase.from('comments')
        .select('id, user_id, comment, profiles (username, avatar_url)')
        .eq('post_id', postId)
        .order('created_at', { ascending: false })
        if (error){
          console.log(error)
        }
        if (!error) {
        setComments(data)
      }
      setLoading(false)
    }

    fetchComments()
  }, [postId, refresh, currentUser])

  if (loading) return <p>Loading comments...</p>
  return (
    <div>
      {comments.map(c =>(
        <div key={c.id}>
            <button onClick={() => navigate(`/profile/${c.user_id}`)}>
              <strong>{c.profiles?.username}</strong>
            </button>
            <p>{c.comment}</p>
            <Likes commentId={c.id} currentUser={currentUser} />
            {c.user_id === currentUser?.id &&(
              <button className='delete-comment-btn' onClick={() => handleDeleteComment(c.id)}>
                <FaRegTrashAlt />
              </button>
            )}
        </div>

      ))}
    </div>
  )
}

export default CommentsList
