import {Route, Routes} from "react-router-dom";
import { Menu } from "../pages/menu/Menu";
import NotFound from "../pages/notFound/NotFound";

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Menu/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/*' element={<NotFound/>}/>
        </Routes>
    )
}