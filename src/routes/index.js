import { createBrowserRouter, Router } from "react-router-dom";
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import ContactUs from '../pages/ContactUs'

const router = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'signup',
                element:<SignUp/>
            },
            {
                path:'ContactUs',
                element:<ContactUs/>
            }
        ]
    }
])

export default router
