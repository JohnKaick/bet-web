import axios from 'axios'

export function getOne(id) {
    return axios.get(`http://localhost:8000/api/grupo/obter/${id}`)
}

export function getAll() {
    return axios.get('http://localhost:8000/api/grupo')
}

export function create(data) {
    return axios.put('http://localhost:8000/api/grupo/cadastrar', {
        nome: data.nome,       
    })
}

export function update(data) {
    return axios.post(`http://localhost:8000/api/grupo/editar/${data.id}`, {
        nome: data.nome,       
    })
}

export function remover(id) {
    return axios.delete(`http://localhost:8000/api/grupo/remover/${id}`)
}