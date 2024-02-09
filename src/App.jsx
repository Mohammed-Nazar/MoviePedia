import { BrowserRouter,  Route, Routes, Link } from "react-router-dom";
import Home from "./components/home/home";
import Layout from "./components/layout/layout";
import Det from "./components/details/det";
import Error from "./components/error";

function App() {
  return (
    <div className="bg-slate-800 text-cyan-50"> 
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path="Movies/:id" element={<Det/>}/>
      <Route path="*" element={<Error/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
