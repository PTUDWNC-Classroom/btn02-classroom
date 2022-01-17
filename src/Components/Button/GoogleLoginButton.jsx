import React, { useContext } from "react"

import { GoogleLogin } from "react-google-login"
import { GoogleButton } from "react-google-button"
import { useHistory } from "react-router"
import { sendUserInfoSocial } from "../DataConnection/SignUpHandler"
import { styled } from "@mui/system"
import { ClassroomContext } from "../../context/ClassroomContext"
//import useLocalStorage from "../../hooks/useLocalStorage"

const StyledGoogleButton = styled(GoogleButton)`
  float: none;
  position: static;
  display: block;
  margin: auto;
  width: max-content;
`

function SocialLogin() {
  const history = useHistory()
  const { login } = useContext(ClassroomContext)
  const onSuccess = async (res) => {
    //res: response from google
    const info = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      idToken: res.tokenId,
    }

    const verifiedUser = await sendUserInfoSocial(info)
    console.log(verifiedUser)
    if (verifiedUser) {
      // SET ITEM localStorage
      try {
        window.localStorage.setItem(
          "isSocialLogin",
          JSON.stringify(verifiedUser.user)
        )
        window.localStorage.setItem("token", `Bearer  ${verifiedUser.idToken}`)
        localStorage.setItem("refreshToken", verifiedUser.refreshToken)

        // Dispatch "local-storage" event to call
        window.dispatchEvent(new Event("local-storage"))
        login(verifiedUser.user)

        alert("Đăng nhập thành công !!")
      } catch (error) {
        console.error(error)
        alert("Đăng nhập không thành công !!")
      }

      //console.log(localStorage.previousLocation);
      if (localStorage.previousLocation) {
        let url = localStorage.previousLocation
        localStorage.removeItem("previousLocation")
        history.replace(url)
      } else {
        history.replace("/")
      }
    } else {
      alert("Đăng nhập không thành công!")
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
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <StyledGoogleButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ marginTop: 16, marginBottom: 16, width: "100%" }}
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
