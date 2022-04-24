import React, {useEffect, useState} from "react";
import CategoryRepository from "../../repository/CategoryRepository";
import BookRepository from "../../repository/BookRepository";
import {useNavigate, useParams} from "react-router-dom";

const EditBook = () => {

    const [dto, setDto] = React.useState({
        name: "",
        category: "",
        authorId: "",
        availableCopies: 0,
    })
    const [book, setBook] = useState()
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const id = useParams().id


    useEffect(() => {
        fetchData()
    }, [id])

    const fetchData = async () => {
        await CategoryRepository.getAllCategories().then(r => {
            setCategories(r.data)
            CategoryRepository.getAllAuthors().then(b => {
                setAuthors(b.data)
            })
        })
        await BookRepository.getBookById(id).then(r=>{
            setBook(r.data)
            setDto({
                name: r.data.name,
                category: r.data.category,
                authorId: r.data.author.id,
                availableCopies: r.data.availableCopies
            })
        })
        setLoading(false)
    }
    const changeValue = (e) => {
        setDto({
            ...dto,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        const form = {
            name: dto.name,
            category: dto.category,
            authorId: dto.authorId,
            copies: dto.availableCopies,
        }
        BookRepository.editBook(id,form).then(r=>{
            navigate('/books')
        })
    }

    return (
        <div className="container">
            {loading === false ?
                <div className="row">
                    <div className="col">
                        <form onSubmit={submit}>
                            <h1>Edit book</h1>
                            <span>Name:</span>
                            <input className="form-control" name="name" defaultValue={book.name} onChange={changeValue}/>
                            <span>Category:</span>
                            <select name="category" className="form-control" onChange={changeValue}>
                                <option selected/>
                                {categories.map((r) => {
                                    return <option value={r} selected={book.category === r}>{r}</option>
                                })}
                            </select>
                            <span>Author:</span>
                            <select name="authorId" className="form-control" onChange={changeValue}>
                                <option selected/>
                                {authors.map((r) => {
                                    return <option value={r.id} selected={r.id === book.author.id}>{r.name}</option>
                                })}
                            </select>
                            <span>Available copies:</span>
                            <input className="form-control" name="availableCopies" type="number" defaultValue={book.availableCopies} onChange={changeValue}/>
                            <button id="submit" type="submit" className="btn btn-primary mt-4">Submit</button>
                        </form>
                    </div>
                </div> : null}
        </div>
    )
}

export default EditBook
