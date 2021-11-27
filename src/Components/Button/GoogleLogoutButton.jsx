import React from 'react';
//import GoogleButton from 'react-google-button';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';

const clientId =
'613642092414-lvnn10cq77c733cd23iqmqpmvih03j7j.apps.googleusercontent.com';

function SocialLogout() {
  let history = useHistory();

  let onSuccess = () => {
    
    // REMOVE localStorage
      localStorage.removeItem('isSocialLogin')
      //console.log('Logout made successfully');
      //alert('Logout made successfully ✌');
      history.replace("/");
      //window.location.reload();
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Log Out Google"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>

    </div>
  );
}

export default SocialLogout;