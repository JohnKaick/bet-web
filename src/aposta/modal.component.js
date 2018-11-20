import React, { Component } from 'react';
import { Modal, Form, Button, Input, Header, Icon, Select } from 'semantic-ui-react';
import { create } from './api';
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
        this.state = {
            open: false,
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
        this.setState({ 
            open: true,
            nome: '',
            data: null,
            valor: null,
            retorno: null,
            grupo: null,
            grupos: []
        })
        getGrupo().then((grs) => {
            this.setState({ 
                grupos: grs.data
            })
        })
    }

    onGrupoSelected(e, { name, value }) {
        this.setState({
            grupo: value
        })
    }

    onSalvar() {
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

    render() {
        const { open, nome, valor, retorno, grupo, data, grupos } = this.state

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