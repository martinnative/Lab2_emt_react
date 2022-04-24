import React, {useEffect, useState} from "react";
import CategoryRepository from "../../repository/CategoryRepository";
import BookRepository from "../../repository/BookRepository";
import { useNavigate } from "react-router-dom";

const AddBook = () => {

    const [dto, setDto] = React.useState({
        name: "",
        category: "",
        authorId: "",
        copies: 0,
    })

    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await CategoryRepository.getAllCategories().then(r => {
            setCategories(r.data)
            CategoryRepository.getAllAuthors().then(b => {
                setAuthors(b.data)
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
        BookRepository.addBook(dto).then(r=>{
            navigate('/books')
        })
    }


    return (
        <div className="container">
            {loading === false ?
            <div className="row">
                <div className="col">
                    <form onSubmit={submit}>
                        <h1>Add book</h1>
                        <span>Name:</span>
                        <input className="form-control" name="name" onChange={changeValue}/>
                        <span>Category:</span>
                        <select name="category" className="form-control" onChange={changeValue}>
                            <option selected/>
                            {categories.map((r) => {
                                return <option value={r}>{r}</option>
                            })}
                        </select>
                        <span>Author:</span>
                        <select name="authorId" className="form-control" onChange={changeValue}>
                            <option selected/>
                            {authors.map((r) => {
                                return <option value={r.id}>{r.name}</option>
                            })}
                        </select>
                        <span>Available copies:</span>
                        <input className="form-control" name="copies" type="number" onChange={changeValue}/>
                        <button id="submit" type="submit" className="btn btn-primary mt-4">Submit</button>
                    </form>
                </div>
            </div> : null}
        </div>
    )
}

export default AddBook
