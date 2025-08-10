import Layout from './components/Layout'
import Movies from './components/Movies'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Movie from "./components/Movie.tsx";
import Credits from "./components/Credits.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Movies/>}/>
          <Route path="movie/:id" element={<Movie/>}/>
          <Route path="credits" element={<Credits/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
