import "tailwindcss";
import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([{
    path: "/",
    element: <MainLayout/>,
    errorElement:<ErrorPage/>,
    children:[
        {index:true,element:<Home/>},
        {path:"Home",element:<Home/>},
        {path:"About",element:<AboutPage/>}
    ]
}]);

function App() {
    return (
       <RouterProvider router={router}/>
    );
}

export default App;
