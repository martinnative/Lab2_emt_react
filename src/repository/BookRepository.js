import axios from "../custom-axios/axios";

const BookRepository = {
    getAllBooks: () => {
        return axios.get('/book/all')
    },

    deleteBook: (id) => {
        return axios.post(`/book/delete/${id}`)
    },

    editBook: (id, dto) => {
        return axios.post(`/book/edit/${id}`,dto)
    },

    addBook: (dto) => {
        return axios.post(`/book/add`,dto)
    },

    takeBook: (id) => {
        return axios.post(`/book/take/${id}`)
    },

    getBookById: (id) => {
        return axios.get(`/book/get/${id}`)
    },

    getPaged: (page, size) => {
        return axios.get(`/book/all/page/${page}/${size}`)
    }

}
export default BookRepository