import { supabase } from '../../../supabase.js'
import Btn1, {Text1} from '../Btn1/Btn1.jsx'
import React from 'react'

function Login_Google() {

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/home'
      }
    })

    if (error) {
      console.error('Error login Google:', error.message)
    }
  }

  return (
    <>
        <Btn1 variant='google' onClick={handleGoogleLogin}>
          <Text1 img="../../img/google.png" text1="Sign in with Google"/>
        </Btn1>
    </>
  )
}

export default Login_Google
