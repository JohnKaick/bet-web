import axios from 'axios'

export function getOne(id) {
    return axios.get(`http://localhost:8000/aposta/obter/${id}`)
}

export function getAll() {
    return axios.get('http://localhost:8000/aposta')
}

export function create(data) {
    return axios.put('http://localhost:8000/aposta/cadastrar', {
        nome: data.nome,
        valor: data.valor,
        lucro: data.lucro,
    })
}

export function update(data) {
    return axios.post(`http://localhost:8000/aposta/editar/${data.id}`, {
        nome: data.nome,
        valor: data.valor,
        lucro: data.lucro,
    })
}

export function remover(id) {
    return axios.delete(`http://localhost:8000/aposta/remover/${id}`)
}

export function updateResultado(data) {
    return axios.post(`http://localhost:8000/aposta/resultado/${data.id}`, {
        resultado: data.resultado,
    })
}