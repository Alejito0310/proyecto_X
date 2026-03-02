import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import PostItem from '../../pages/Home/Post/PostItem'
import { supabase } from "../../../supabase";

function SinglePost() {
    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            const {data} = await supabase.from('posts')
            .select('*, profiles(username, avatar_url)')
            .eq('id', id)
            .single()

            setPost(data)
        }
        fetchPost()
    }, [id])
  return (
    <div>
      {post && (
        <>
          <PostItem post={post} />
        </>
      )}
    </div>
  )
}

export default SinglePost
