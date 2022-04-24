import React, {useEffect, useState} from "react";
import CategoryRepository from "../../repository/CategoryRepository";


const Categories = () => {

    const [categories, setCategories] = useState([{name: "kat"}, {name: "kat2"}])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        CategoryRepository.getAllCategories().then(r => {
            setCategories(r.data)
        }).then(() => {
            setLoading(false)
        })
    }

    return (
        <div className="container">
            {!loading ?
                <div className="row">
                    <div className="col">
                        <h1>Categories:</h1>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                            </tr>
                            </thead>
                            <tbody>

                            {categories.map(b => {
                                return (
                                    <tr>
                                        <th scope="row">{b}</th>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </table>
                    </div>
                </div> : null}

        </div>
    )
}

export default Categories