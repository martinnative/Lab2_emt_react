import React, {useEffect} from "react";
import BookRepository from "../../repository/BookRepository";
import {Link, useNavigate} from "react-router-dom";
import './book.css'
import ReactPaginate from "react-paginate";


const Book = () => {

    const [books, setBooks] = React.useState([])
    const [page, setPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(5)
    const [sizeOnPage, setSizeOnPage] = React.useState(5)

    const handleChangePage = (e) => {
        const newOffset = (e.selected * 5) % totalPages;
        setPage(newOffset);
        fetchData(newOffset)
    }

    const navigate = useNavigate()
    useEffect(() => {
        totalNumber()
        fetchData(0)
    }, [])
    const totalNumber = () => {
        BookRepository.getAllBooks().then(r => {
            setTotalPages(Math.ceil(r.data.length / 5))
        })
    }
    const fetchData = (page) => {
        BookRepository.getPaged(page, 5).then(r => {
            setBooks(r.data)
        })
    }

    const edit = (e) => {
        let id = e.target.id
        navigate('/book/edit/' + id)
    }

    const del = (e) => {
        let id = e.target.id
        BookRepository.deleteBook(id).then(r => {
            fetchData(0)
        })
    }

    const taken = (e) => {
        let id = e.target.id
        BookRepository.takeBook(id).then(r => {
            fetchData(page)
        })
    }

    const add = () => {
        navigate('/book/add')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <button className="btn btn-outline-success add_book" onClick={add}>Add Book</button>
                    <h1>Books:</h1>

                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Category</th>
                            <th scope="col">Copies</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Mark as taken</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map(b => {
                            return (
                                <tr>
                                    <th scope="row">{b.name}</th>
                                    <td>{b.author.name}</td>
                                    <td>{b.category}</td>
                                    <td>{b.availableCopies}</td>
                                    <td>
                                        <button className="btn btn-outline-success mx-2" onClick={edit} id={b.id}>Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-danger" onClick={del} id={b.id}>Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-info ms-2" onClick={taken} id={b.id}>Mark as
                                            taken
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handleChangePage}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Book