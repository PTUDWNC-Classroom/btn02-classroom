import React from "react"

import { GoogleLogin } from "react-google-login"
import { GoogleButton } from "react-google-button"
import { useHistory } from "react-router"
import { sendUserInfoSocial } from "../DataConnection/SignUpHandler"
import { styled } from "@mui/system"

const clientId =
  "613642092414-lvnn10cq77c733cd23iqmqpmvih03j7j.apps.googleusercontent.com"

const StyledGoogleButton = styled(GoogleButton)`
  float: none;
  position: static;
  display: block;
  margin: auto;
  width: max-content;
`

function SocialLogin() {
  //console.log("sociallogin");
  const history = useHistory()
  const onSuccess = async (res) => {
    //console.log(res.profileObj);
    const user = {
      name: res.profileObj.name,
      email: res.profileObj.email,
    }

    const _id = await sendUserInfoSocial(user)
    //console.log("id")
    //console.log(_id);
    if (_id !== false) {
      const userInfo = {
        _id: _id,
        username: res.profileObj.name,
        email: res.profileObj.email,
      }
      // SET ITEM localStorage
      localStorage.setItem("isSocialLogin", JSON.stringify(userInfo))
      alert("Đăng nhập thành công !")

      //console.log(localStorage.previousLocation);
      if (localStorage.previousLocation) {
        let url = localStorage.previousLocation
        localStorage.removeItem("previousLocation")
        history.replace(url)
      } else {
        history.replace("/")
      }
    } else {
      alert("Email đã được sử dụng !")
    }

    //window.location.reload();
  }

  const onFailure = (res) => {
    // REMOVE localStorage
    localStorage.removeItem("isSocialLogin")
    //console.log('Login failed: res:', res.profileObj === undefined);
    // alert(
    //     `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  }

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <StyledGoogleButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ margin: "auto", marginTop: 16, marginBottom: 16 }}
          >
            Sign in with Google
          </StyledGoogleButton>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  )
}

export default SocialLogin
