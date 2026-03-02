import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { supabase } from '../../../supabase.js'
import useCounter from '../../Counter/useCounter.jsx'
import PostItem from '../Home/Post/PostItem.jsx'
import './Profiles.css'

function Profile() {
    const navigate = useNavigate()
    const { id: profileId } = useParams()
    
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [profileData, setProfileData] = useState(null)
    const [posts, setPosts] = useState([])
    const [followed, setFollowed] = useState(false)


    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser()
            setCurrentUser(data.user)
        }
        getUser()
        
    }, [])
    useEffect(() => {
        const fetchData = async () => {
        if (!profileId) return;
        setLoading(true);

        const { data: pData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', profileId)
            .maybeSingle();

        if (pData) {
            let isFollowingAccion = false;
            if (currentUser) {
                const { data: followCheck } = await supabase
                    .from('follows')
                    .select('*')
                    .match({ follower_id: currentUser.id, following_id: profileId })
                    .maybeSingle();
                
                if (followCheck) isFollowingAccion = true;
            }

            setProfileData({
                ...pData,
                isFollowing: isFollowingAccion
            });
        }

        const { data: pPosts } = await supabase
            .from('posts')
            .select('*, profiles(username, avatar_url)')
            .eq('user_id', profileId)
            .order('created_at', { ascending: false });
        
        if (pPosts) setPosts(pPosts);
        setLoading(false);
    }

    fetchData();
}, [profileId, currentUser]);

    const handleFollow = async () => {
    try {
        if (!currentUser) return alert("Debes iniciar sesión");

        const isCurrentlyFollowing = profileData.isFollowing;

        if (isCurrentlyFollowing) {
            const { error } = await supabase
                .from('follows')
                .delete()
                .match({ follower_id: currentUser.id, following_id: profileId });

            if (error) throw error;
            setProfileData(prev => ({ ...prev, isFollowing: false }));
        } else {
            const { error } = await supabase
                .from('follows')
                .insert([{ follower_id: currentUser.id, following_id: profileId }]);

            if (error) throw error;
            setProfileData(prev => ({ ...prev, isFollowing: true }));
        }
    } catch (error) {
        console.error("Error en follow/unfollow:", error.message);
    }
};

    const handleDeletePost = async (postId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este post?");
        if (!confirmDelete) return;

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId)
            .eq('user_id', currentUser?.id);

        if (error) {
            console.error("Error al eliminar:", error.message);
        } else {
            setPosts(prev => prev.filter(post => post.id !== postId));
        }
    }

    const isOwnProfile = profileId === currentUser?.id
    const { count: countFollowers } = useCounter('follows', 'following_id', profileId)
    const { count: countFollowings } = useCounter('follows', 'follower_id', profileId)

    if (!profileData) return <div className='loading'>Cargando...</div>
    return (
        <div className='profile-page'>
            <div className='profile-header-nav'>
                <button onClick={() => navigate('/home')} className="back-btn"><FaArrowLeft /></button>
                <div>
                    <h2>{profileData.username}</h2>
                    <span className="post-count-sub">{posts.length} Posts</span>
                </div>
            </div>

            <div className='profile-banner'></div>

            <div className='profile-info-section'>
                <div className='profile-top-row'>
                    <img className='profile-avatar-large' src={profileData.avatar_url || "/imagen_npc.jpg"} alt="avatar" />
                    {isOwnProfile ? (
                        <button onClick={() => navigate(`/profile/${profileId}/edit`)} className="edit-profile-btn">Editar perfil</button>
                    ) : (
                        <button 
                            onClick={handleFollow} 
                            className={`follow-btn ${profileData.isFollowing ? 'following' : ''}`}>
                            {profileData.isFollowing ? 'Siguiendo' : 'Seguir'}
                        </button>
                    )}
                </div>

                <div className='profile-details'>
                    <h1>{profileData.full_name}</h1>
                    <p className='handle'>@{profileData.username}</p>
                    <p className='bio'>{profileData.bio}</p>
                    
                    <div className='stats-row'>
                        <p><strong>{countFollowings || 0}</strong> Siguiendo</p>
                        <p><strong>{countFollowers || 0}</strong> Seguidores</p>
                    </div>
                </div>
            </div>

            <div className='profile-tabs'>
                <div className='tab active'>Posts</div>
                <div className='tab'>Respuestas</div>
                <div className='tab'>Fotos</div>
                <div className='tab'>Me gusta</div>
            </div>
            <div className='profile-posts-feed'>
                {posts.map(post => (
                    <PostItem 
                        key={post.id} 
                        post={post} 
                        currentUser={currentUser} 
                        onDelete={handleDeletePost}
                    />
                ))}
            </div>
        </div>
    )
}

export default Profile