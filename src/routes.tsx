import { createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Detail from "./pages/detail"
import { Layout } from "./components/Layout"

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/detail/:cripto?",
                element: <Detail/>
            },
            {
                path: "*",
                element: <NotFound/>
            }
        ]
    }
])
