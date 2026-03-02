import React from 'react'
import CreatePost from './CreatePost'
import './Posts.css'
import { RxCross2 } from "react-icons/rx"

function PostModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="pop_up_posts" onClick={onClose}>
      <div className="pop_upContent_posts" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: '10px' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <RxCross2 size={20} />
          </button>
        </div>
        
        <CreatePost onPostSuccess={onClose} />
      </div>
    </div>
  )
}

export default PostModal