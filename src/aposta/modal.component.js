import React, { Component } from 'react';
import { Modal, Form, Button, Input, Header, Icon, Select } from 'semantic-ui-react';
import { create, getOne, update, remover } from './api';
import { getAll as getGrupo } from './../grupo/api';
import DatePicker from './../app/date';

class ModalAposta extends Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.close = this.close.bind(this)
        this.onOpen = this.onOpen.bind(this)
        this.onGrupoSelected = this.onGrupoSelected.bind(this)
        this.onSalvar = this.onSalvar.bind(this)
        this.onRemover = this.onRemover.bind(this)
        this.state = {
            open: false,
            id: null,
            nome: '',
            data: null,
            valor: null,
            retorno: null,
            grupo: null,
            grupos: []
        }
    }

    onChange(e, { name, value }) {
        this.setState({ [name]: value })
    }

    close() {
        this.setState({ open: false })
    }

    onOpen() {
        if (this.props.id) {
            getOne(this.props.id).then((apt) => {
                this.setState({ 
                    open: true,
                    id: apt.data._id,
                    nome: apt.data.nome,
                    data: apt.data.createdAt,
                    valor: apt.data.valor,
                    retorno: apt.data.retorno,
                    grupo: apt.data.grupo.nome
                })
            }).catch(() => {
                this.setState({
                    id: null,
                    open: true,
                    nome: '',
                    data: null,
                    valor: null,
                    retorno: null,
                    grupo: null,
                    grupos: []
                })
            })
        } else {
            getGrupo().then((grs) => {
                this.setState({ 
                    grupos: grs.data
                })
            }).catch(() => {
                this.setState({ 
                    grupos: []
                })
            })
            this.setState({ 
                id: null,
                open: true,
                nome: '',
                data: new Date(),
                valor: null,
                retorno: null,
                grupo: null,
            })
        }
    }

    onGrupoSelected(e, { name, value }) {
        this.setState({
            grupo: value
        })
    }

    onSalvar() {
        if (this.state.id) {
            update({
                id: this.state.id,
                nome: this.state.nome,
                data: this.state.data,
                valor: this.state.valor,
                retorno: this.state.retorno,
                grupo: this.state.grupo,
            }).then(() => {
                this.close()
                this.props.getApostas()
            })
        } else {
            create({
                nome: this.state.nome,
                data: this.state.data,
                valor: this.state.valor,
                retorno: this.state.retorno,
                grupo: this.state.grupo,
            }).then(() => {
                this.close()
                this.props.getApostas()
            })
        }
    }

    onRemover() {
        remover(this.state.id).then(() => {
            this.close()
            this.props.getApostas()
        })
    }

    render() {
        const { open, id, nome, valor, retorno, grupo, data, grupos } = this.state

        return (
            <Modal
                open={open}
                trigger={this.props.children}
                onOpen={this.onOpen}
                size='small'
                >
                <Icon link size='large' name='cancel' style={style.floated} onClick={this.close}/>
                <Header>Criar aposta</Header>
                <Modal.Content>
                    <Form>
                        { id ? (
                            <Form.Field 
                            width={16}
                            control={Input}
                            label='Grupo'
                            name='grupo'
                            value={grupo}
                            disabled
                            />
                        ) : (
                            <Form.Field 
                                width={16}
                                control={Select}
                                label='Grupo'
                                name='grupo'
                                options={grupos.map(g => {
                                    return { key: g._id, text: g.nome, value: g._id }
                                })}
                                onChange={this.onGrupoSelected}
                                />
                        )}
                        <Form.Group>
                            <Form.Field
                                width={8}
                                control={Input}
                                label='Nome'
                                name='nome'
                                value={nome}
                                onChange={this.onChange}
                                />
                            <Form.Field width={8} >
                                <label>Data</label>
                                <DatePicker name="data" value={data} onChange={this.onChange} />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field 
                                width={8}
                                control={Input}
                                label='Valor'
                                name='valor'
                                value={valor}
                                onChange={this.onChange}
                                />

                            <Form.Field 
                                width={8}
                                control={Input}
                                label='Retorno'
                                name='retorno'
                                value={retorno}
                                onChange={this.onChange}
                                />
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    { id && (
                    <Button color='red'
                        icon="trash"
                        content='Excluir'
                        floated='left'
                        onClick={this.onRemover} />
                    )}
                    <Button primary
                            icon="dollar sign"
                            content='Apostar'
                            onClick={this.onSalvar} />
                </Modal.Actions>
            </Modal>
        )
    }
}

const style = {
    floated: { float: 'right', margin: '10px' }
}

export default ModalAposta