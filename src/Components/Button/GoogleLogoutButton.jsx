import React from "react"
//import GoogleButton from 'react-google-button';
import { GoogleLogout } from "react-google-login"
import { useHistory } from "react-router-dom"

function SocialLogout() {
  let history = useHistory()

  let onSuccess = () => {
    // REMOVE localStorage
    localStorage.removeItem("isSocialLogin")
    localStorage.removeItem("token")
    //console.log('Logout made successfully');
    //alert('Logout made successfully ✌');
    history.replace("/")
    //window.location.reload();
  }

  return (
    <div>
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log out Google"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  )
}

export default SocialLogout
