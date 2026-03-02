import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiHome7Fill, RiHome7Line, RiUser3Fill, RiUser3Line } from "react-icons/ri";
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../supabase';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import Logo from '../../components/Logo/Logo';
import Btn1 from '../../components/Btn1/Btn1';

function Sidebar({onPostClick}) {
  const { user } = useAuth();
  const navigate = useNavigate()

    const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/sign_up', { replace: true })
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Logo />
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          {({ isActive }) => (
            <>
              {isActive ? <RiHome7Fill size={26} /> : <RiHome7Line size={26} />}
              <span>Inicio</span>
            </>
          )}
        </NavLink>

        <NavLink to={`/profile/${user?.id}`} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          {({ isActive }) => (
            <>
              {isActive ? <RiUser3Fill size={26} /> : <RiUser3Line size={26} />}
              <span>Perfil</span>
            </>
          )}
        </NavLink>
      </nav>

      <Btn1 variant='post_sidebar' onClick={onPostClick}>Postear</Btn1>

      <Btn1 onClick={handleLogout} variant="logout">
        Cerrar sesión
      </Btn1>
    </div>
  );
}

export default Sidebar;