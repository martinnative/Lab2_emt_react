import axios from "../custom-axios/axios";


const CategoryRepository = {
    getAllCategories: () => {
        return axios.get('/book/categories')
    },
    getAllAuthors: () => {
        return axios.get(`/author/all`)
    }
}

export default CategoryRepository