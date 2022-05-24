import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ListCat from "./pages/ListCategory/ListCat.jsx"
import ListSousCat from "./pages/ListSousCat/ListSousCat.jsx";
import Single from "./pages/single/Single";
import SingleCat from "./pages/singleCat/singleCat"
import New from "./pages/new/New";
import NewCat  from "./pages/newCat/newCat.jsx";
import NewSousCat from "./pages/newSousCat/newSousCat.jsx";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { productInputs, userInputs,categoryInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import {AuthContext} from "./context/AuthContext"
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const {CurrentUser}=useContext(AuthContext);
console.log(CurrentUser);
const RequiredAuth=({children})=>{
  return CurrentUser ? children : <Navigate to="/login"/>
}
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route path="login" element={<Login />} />
            <Route index element={<RequiredAuth><Home /></RequiredAuth>} />
           
            <Route path="users">
              <Route index element={<RequiredAuth><List /></RequiredAuth>} />
              <Route path=":userId" element={<RequiredAuth><Single /></RequiredAuth>} />
              <Route
                path="new"
                element={<RequiredAuth><New inputs={userInputs} title="Add New User" /></RequiredAuth>}
              />
            </Route>
            <Route path="Category">
              <Route index element={<RequiredAuth><ListCat /></RequiredAuth>} />
              <Route path=":prodId" element={<RequiredAuth><Single /></RequiredAuth>} />
              <Route
                path="newCat"
                element={<RequiredAuth><NewCat inputs={productInputs} title="Add New Category" /></RequiredAuth>}
              />
            </Route>
            <Route path="SousCategory">
              <Route index element={<RequiredAuth><ListSousCat /></RequiredAuth>} />
              <Route path=":id" element={<RequiredAuth><Single /></RequiredAuth>} />
              <Route
                path="newSousCat"
                element={<RequiredAuth><NewSousCat inputs={categoryInputs} title="Add New Sous Category" /></RequiredAuth>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
