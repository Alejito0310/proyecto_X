import React, {useState, useEffect} from 'react'
import { useAuth } from '../../../context/AuthContext'
import { supabase } from '../../../../supabase'
import PostItem from './PostItem'


function PostList(){

    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState("")
    const [currentUser, setCurrentUser] = useState(null)

    const handleDelete = async (postId) => {
      if (!currentUser) return;
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .eq("user_id", currentUser?.id)

      if (error) {
        console.log(error.message)
      } else {
        setPosts(prev => prev.filter(post => post.id !== postId))
      }
    }


    useEffect(() => {

      const fetchPosts = async () => {
        
      setLoading(true)
      setCurrentUser(user)

      const {data: followingData} = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.id)

      const followingIds = followingData?.map(f =>f.following_id) || [];
      const allExcludedIds = [...followingIds, user.id];
      
        const {data: postsData, error:postsError1} = await supabase
          .from('posts')
          .select('*, profiles (username, avatar_url), likes (id, user_id, post_id)')
          .in('user_id', allExcludedIds)
          .order('created_at', {ascending: false})

        const { data: suggestedPosts, error: postsError2 } = await supabase
          .from('posts')
          .select('*, profiles (username, avatar_url), likes (id, user_id, post_id)')
          .not('user_id', 'in', `(${allExcludedIds.join(',')})`)
          .limit(5)
          .order('created_at', { ascending: false });

          if(postsError1 || postsError2){
            console.log(postsError1?.message || postsError2?.message)
            setMessage("Error fetching posts")
          }else{
            setPosts([...(postsData || []), ...(suggestedPosts || [])]);
          }
          setLoading(false);
          
      }
      fetchPosts()

    }, [])

    if (loading) return <p>Cargando...</p>

  return (
    <>
      
      {posts.map(post => (
        <PostItem key={post.id} post={post} currentUser={currentUser} onDelete={handleDelete}/>
      ))}

    </>
  )
}

export default PostList