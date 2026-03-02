import React from 'react'
import Btn1, { Text1 } from '../../components/Btn1/Btn1'
import Divider from '../../components/Divider/Divider'
import { NavLink, useNavigate } from 'react-router-dom';
import Create_Account from '../../components/Create_Account/Create_Account';
import Login_Google from '../../components/Login_Google/Login_Google';
import Logo from '../../components/Logo/Logo';
import '../../App.css'

function Sign_up() {
  const Nav = useNavigate("/");

  const btnList = [
    {
      id: 1,
      img: "../../img/google.png",
      text1: "Sign up with Google",
      NavLink: () => Nav("/analyze"),
    }
  ];
  return (
    <div className='sign-up'>
      <div className='logo-container'>
        <Logo />
      </div>
      
      <div className='sign-up_right'>
        <div className='sign-up_text1'>
          <h1>What's Happening now</h1>
        </div>
        <div className='sign-up_buttons'>
          <h2 className='sign-up_text2'>Join today.</h2>
          <Login_Google />

          <Divider />
          <Btn1 variant='white' onClick={() => Nav("/create_account")}>
            <Text1 text1="Create Account" />
          </Btn1>


          <h3>Do you already have an account?</h3>
          <Btn1 variant='login' onClick={() => Nav("/login")}>
            <Text1 text1="Login" />
          </Btn1>
        </div>
      </div>
    </div>
  )
}

export default Sign_up