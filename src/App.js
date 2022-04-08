import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { PostDetailPage } from "./pages/PostDetailPage";
import { Posts } from "./pages/Posts";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/post/:title' element={<PostDetailPage/>} />
          <Route path='/posts' element={<Posts/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
