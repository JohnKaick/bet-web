import axios from 'axios'

export function getOne(id) {
    return axios.get(`http://apibet.jkapp.com.br/api/aposta/obter/${id}`)
}

export function getAll() {
    return axios.get(`http://apibet.jkapp.com.br/api/aposta`)
}

export function create(data) {
    return axios.put(`http://apibet.jkapp.com.br/api/aposta/cadastrar/${data.grupo}`, {
        nome: data.nome,
        valor: data.valor,
        retorno: data.retorno,
        data: data.data,
    })
}

export function update(data) {
    return axios.post(`http://apibet.jkapp.com.br/api/aposta/editar/${data.id}`, {
        nome: data.nome,
        valor: data.valor,
        retorno: data.retorno,
        data: data.data,
    })
}

export function remover(id) {
    return axios.delete(`http://apibet.jkapp.com.br/api/aposta/remover/${id}`)
}

export function updateResultado(data) {
    return axios.post(`http://apibet.jkapp.com.br/api/aposta/resultado/${data.id}`, {
        resultado: data.resultado,
    })
}

export function getFiltro(data) {
    return axios.post(`http://apibet.jkapp.com.br/api/aposta/filtro`, {
        dtInicio: data.dtInicio,
        dtFinal: data.dtFinal
    })
}