import { FaRegHeart, FaHeart } from "react-icons/fa6";
import React, {useState, useEffect} from 'react'
import { supabase } from "../../../supabase";
import './likes.css'

function Likes({postId, commentId, currentUser}) {
    
    const column = postId ? "post_id" : "comment_id"
    const value = postId || commentId;

    const [count, setCount] = useState(0)
    const [loadingLike, setLoadingLike] = useState(false)
    const [liked, setLiked] = useState(false)   

    const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num;
}

    useEffect(() => {
        if (!currentUser || !value) return;

        const fetchLikes = async () => {
        const { count } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq(column, value);

        setCount(count || 0);

        const { data } = await supabase
            .from("likes")
            .select("id")
            .eq(column, value)
            .eq("user_id", currentUser.id)
            .maybeSingle();

      setLiked(!!data);
    };

    fetchLikes();
  }, [value, currentUser]);

    const handleToggleLike = async (e) => {
        e.stopPropagation();
        if (loadingLike || !currentUser) return;
        setLoadingLike(true);
        try{
            if (liked){
                const {error} = await supabase.from('likes')
                .delete()
                .eq(column, value)
                .eq('user_id', currentUser.id);

                if (!error) {
                    setLiked(false);
                    setCount(prev => Math.max(0, prev - 1)); 
                } else {
                    console.error("Error al quitar like:", error.message);
                }
                
            }else{
                const {error} = await supabase.from('likes')
                .insert({
                    [column]: value,
                    user_id: currentUser.id
                })
                if (!error) {
                    setLiked(true);
                    setCount(prev => prev + 1);
                } else {
                    console.error("Error al dar like:", error.message);
                    if (error.code === '23505') setLiked(true); 
                }
            }
        } finally {
      setLoadingLike(false);
    }
    }

        return (
            <div className="interaction-item">
            <button 
                className={`action-btn like ${liked ? 'is-liked' : ''}`} 
                disabled={loadingLike} 
                onClick={handleToggleLike}
            >
                <div className="icon-wrapper">
                    {liked ? <FaHeart className="filled-heart" /> : <FaRegHeart />}
                </div>
                <span className="count-text">{formatNumber(count)}</span>
            </button>
        </div>
        )

}

export default Likes
