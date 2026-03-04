import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Posts.css'

function PostContent({post, user}) {
const navigate = useNavigate()
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `ahora`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}
  return (
    <div className='feed'>
        <img className='userPhoto' src= {post.profiles?.avatar_url || "/imagen_npc.jpg"} alt="" />

        <div className='feed-content'>
            <div className='header'>
                <button className='username-btn' onClick={() => navigate(`/profile/${post.user_id}`)}>
                    <strong>{post.profiles?.username || "Usuario desconocido"}</strong>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: '400', marginLeft: '4px' }}>
                        @{post.profiles?.username}
                    </span>
                </button>
                <span className='date'>{formatDate(post.created_at)}</span>
                <span className='exact-time'>{date.toLocaleDateString(post.created_at)}</span>
                
            </div>

            <p className='feedContent'>{post.content}</p>
            {post.image_url && (
                <img className='feedImg' src={post.image_url}alt="post" />
            )}
            
        </div>
    </div>
  )
}

export default PostContent
