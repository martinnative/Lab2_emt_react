import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import {Routes, Navigate} from "react-router-dom";
import Book from "./components/Book/Book";
import Header from "./components/Header/Header";
import EditBook from "./components/EditBook/EditBook";
import AddBook from "./components/AddBook/AddBook";
import Categories from "./components/Categories/Categories";


function App() {
  return (
    <Router>
        <Header/>
      <Routes>
          <Route path={'/books'} element={<Book/>}/>
          <Route path={'/book/edit/:id'} element={<EditBook/>}/>
          <Route path={'/book/add'} element={<AddBook/>}/>
          <Route path={'/categories'} element={<Categories/>}/>

          <Route path="*" element={<Navigate to="/books"/>}/>
      </Routes>
    </Router>
  )
}

export default App;
