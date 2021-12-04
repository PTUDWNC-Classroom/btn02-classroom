import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./Components/App/App"
import reportWebVitals from "./reportWebVitals"
import axios from "axios"

//Default header setting for all axios requests
const token = localStorage.getItem("token")
axios.interceptors.request.use((req) => {
  req.headers.authorization = token || ""
  return req
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
