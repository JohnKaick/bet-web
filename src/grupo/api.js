import axios from 'axios'

export function getOne(id) {
    return axios.get(`http://apibet.jkapp.com.br/api/grupo/obter/${id}`)
}

export function getAll() {
    return axios.get(`http://apibet.jkapp.com.br/api/grupo`)
}

export function create(data) {
    return axios.put(`http://apibet.jkapp.com.br/api/grupo/cadastrar`, {
        nome: data.nome,       
    })
}

export function update(data) {
    return axios.post(`http://apibet.jkapp.com.br/api/grupo/editar/${data.id}`, {
        nome: data.nome,       
    })
}

export function remover(id) {
    return axios.delete(`http://apibet.jkapp.com.br/api/grupo/remover/${id}`)
}