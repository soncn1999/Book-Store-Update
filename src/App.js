import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Homepage from './containers/Homepage';
import ContentBook from "./containers/ContentBook";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/get-book-by-id/:id" element={<ContentBook />} />
      <Route path="/get-book-by-category-id/:categoryId" element={<Homepage />} />
    </Routes>
  );
}

export default App;
