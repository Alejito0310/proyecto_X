import React, {useState} from 'react'
import SideBar from '../../pages/SideBar/SideBar'
import CreatePost from '../../pages/Home/Post/CreatePost'
import PostModal from '../../pages/Home/Post/PostModal'
import PostList from '../../pages/Home/Post/PostList'
import Suggested_User from '../Suggested_User/Suggested_User'
import './Layout.css'


function MainLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='app-container'> 
      <aside className="sidebar-column">
        <SideBar onPostClick={() => setIsModalOpen(true)}/>
      </aside>

      <main className='feed-column'>
        <div className="feed-header">
           <h2 style={{padding: '15px', fontSize: '20px', fontWeight: 'bold'}}>Inicio</h2>
        </div>
        <CreatePost /> 
        <PostList />
      </main>

      <aside className='widgets-column'>
        <Suggested_User />
      </aside>
      <PostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default MainLayout