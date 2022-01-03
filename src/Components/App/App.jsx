import React, { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Redirect, Switch } from "react-router"
import { styled } from "@mui/system"
import { Container } from "@mui/material"
import "./App.css"
import MenuAppBar from "../MenuAppBar"
import TabsProvider from "../../context/TabsContext"
import ClassDetails from "../../pages/ClassDetails"
import ClassJoin from "../../pages/ClassJoin"
import SignIn from "../../pages/SignIn"
import SignUp from "../../pages/SignUp"
import SocialLogout from "../Button/GoogleLogoutButton"
import SocialLogin from "../Button/GoogleLoginButton"
import Profile from "../../pages/Profile"
import ClassList from "../../pages/ClassList"
import { ClassroomContextProvider } from "../../context/ClassroomContext"
import { setToken } from "../DataConnection/axiosConfig"

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}))

// function checkLoginHomePage(newClassId) {
//   const isLogin = localStorage.getItem('isLogedin');
//   console.log(isLogin);
//   return isLogin? <Homepage newClassId={newClassId} />: <Navigate to="/log-in" replace/>;
// }

function App() {
  useEffect(() => {
    /*
    setToken function will be called when local-storage event is dispatched when user logs in
    */
    window.addEventListener("local-storage", setToken)
    return () => {
      window.removeEventListener("local-storage", setToken)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return (
    <Router>
      <ClassroomContextProvider>
        <TabsProvider>
          <MenuAppBar />
          <StyledContainer maxWidth="xl">
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  if (localStorage.isSocialLogin || localStorage.isLogin) {
                    return <ClassList />
                  } else {
                    return <Redirect to="/sign-in" />
                  }
                }}
              />
              {/* <Route exact path ="//forget-password">
              <formEmail/>
            </Route> */}
              <Route exact path="/log-in">
                <SocialLogin />
              </Route>
              <Route exact path="/log-out">
                <SocialLogout />
              </Route>
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              <Route exact path="/sign-in">
                <SignIn />
              </Route>
              <Route exact path="/classes/*">
                <ClassDetails />
              </Route>
              <Route
                exact
                path="/join-student/*"
                render={() => {
                  if (localStorage.isSocialLogin) {
                    return <ClassJoin />
                  } else if (localStorage.isLogin) {
                    return <ClassJoin />
                  } else {
                    localStorage.setItem(
                      "previousLocation",
                      window.location.pathname
                    )
                    return <Redirect to="/sign-in" />
                  }
                }}
              />
              <Route
                exact
                path="/join-Teacher/*"
                render={() => {
                  if (localStorage.isSocialLogin) {
                    return <ClassJoin />
                  } else if (localStorage.isLogin) {
                    return <ClassJoin />
                  } else {
                    localStorage.setItem(
                      "previousLocation",
                      window.location.pathname
                    )
                    return <Redirect to="/sign-in" />
                  }
                }}
              />
              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
          </StyledContainer>
        </TabsProvider>
        {/* <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes> */}
      </ClassroomContextProvider>
    </Router>
  )
}

export default App
