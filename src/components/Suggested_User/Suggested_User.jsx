import React, {useEffect, useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../../supabase"
import './Suggested_User.css'

function Suggested_User({currentUser}) {
    const navigate = useNavigate()
    const [suggestions, setSuggestions] = useState ([])
    const {user, loading} = useAuth()
    const [followingLoading, setFollowingLoading] = useState(null)
    useEffect(() => {
        if (!user) return
        const fetchSuggestions = async () => {
            const {data: followingData, error: followError} = await supabase
                .from('follows')
                .select('following_id')
                .eq('follower_id', user.id)
            
                const followingIds = followingData.map(f =>f.following_id ) || [];
                const allExcludedIds = [...followingIds, user.id]
                let query = supabase.from('profiles')
                .select('*')
                .neq("id", user.id);

                if (allExcludedIds.length > 0) {
                    query = query.not("id", "in", `(${allExcludedIds.join(",")})`);
                }

                const { data, error } = await query.limit(5);
                if (!error) setSuggestions(data);
            }
            fetchSuggestions()        
    }, [currentUser])

    const handleFollow = async (userFollowId) =>{
        setFollowingLoading(true)
        const {error} = await supabase
            .from('follows')
            .insert([{
                'follower_id': user.id,
                'following_id': userFollowId,
            }])
            if(!error){
                setSuggestions(prev => prev.filter(
                    user => user.id !== userFollowId
                ))
            }else{
                console.log(error)
            }
        setFollowingLoading(false)
    }

  return (
  <div className='suggested-box'>
    <h2 className='suggested-header'>Suggested Users</h2>
    <div className='suggested-list'>
      {suggestions.map(user => (
        <div className='suggested-item' key={user.id} onClick={() => navigate(`/profile/${user.id}`)}>
          
          <img 
            src={user.avatar_url || "../../../img/imagen_npc.jpg"} 
            className="suggested-avatar" 
            alt={user.username} 
          />
          

          <button className='user-info-btn' onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${user.id}`);
          }}>
            <span className='full-name'>{user.full_name || user.username}</span>
            <span className='username'>@{user.username}</span>
          </button>

          <button 
            className='follow-btn' 
            disabled={followingLoading === user.id} 
            onClick={(e) => { 
              e.stopPropagation(); 
              handleFollow(user.id); 
            }}
          >
            {followingLoading === user.id ? "..." : "Seguir"}
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default Suggested_User
