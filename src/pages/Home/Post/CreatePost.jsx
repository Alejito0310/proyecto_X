import React, {useState, useEffect} from 'react'
import { supabase } from '../../../../supabase'
import { useAuth } from "../../../context/AuthContext"
import './Posts.css'
import Btn1 from '../../../components/Btn1/Btn1'

function CreatePost({ onPostSuccess }) {

    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [showImageInput, setShowImageInput] = useState(false);
    const [message, setMessage] = useState("")  
    const [postContent, setPostContent] = useState({
        content: '',
        image_url: '',
    })

    const [profileAvatar, setProfileAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      const getProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single();
        
        if (data) setProfileAvatar(data.avatar_url);
      };
      getProfile();
    }
  }, [user]);

    console.log(user)
    const handlePostContentChange = (e) => {
        setPostContent({
            ...postContent,
            [e.target.name]: e.target.value
        })
    }

    const handleCreatePost = async (e) => {
        e.preventDefault()
        setLoading(true);
        setMessage("")

        if(!user){
            setMessage("You must be logged in to create a post")
            setLoading(false)
            return
        }

        const {error} = await supabase.from('posts').insert({
            content: postContent.content,
            user_id: user.id,
            image_url: postContent.image_url,
        })

        if(error){
            console.log(error.message)
        }else{
            setPostContent({
                content: '',
                image_url: '',
                if (onPostSuccess) {
                    onPostSuccess();
                }
            })
            setMessage("Post created successfully!")
        }
        setLoading(false)
    }

  return (
    <div className='create-post-container'>
        <div className="create-post-left">
            <img 
                src={profileAvatar || "/imagen_npc.jpg"} 
                alt="Perfil" 
                className="create-post-avatar" 
            />
        </div>
        <div className='create-post-right'>
            <form onSubmit={handleCreatePost}>
                <div className='textarea'>
                    <textarea name="content" id="content" placeholder="What's going on?" value={postContent.content || ""} onChange={handlePostContentChange} required></textarea>
                </div>
                {showImageInput && (<input type="text"
                    name="image_url"
                    className='create-post-image'
                    id="image_url"
                    placeholder="image URL (optinal)"
                    value={postContent.image_url}
                    onChange={handlePostContentChange} />
                )}
                
                <div className="create-post-actions">
                    <div className="icons-group">
                        <span onClick={() => setShowImageInput(prev => !prev)}
                        style={{ cursor: 'pointer', filter: showImageInput ? 'brightness(1.5)' : 'none' }}
                        title="Add Image">🖼️</span>
                        <span title="GIF">👾</span>
                        <span title="Poll">📊</span>
                        <span title="Emoji">😊</span>
                        <span title="Schedule">📅</span>
                    </div>

                    <Btn1 type="submit" disabled={loading} variant='createPost'>
                        {loading ? "Posting..." : "Post"}
                    </Btn1>
                    {message && <p>{message}</p>}
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreatePost
