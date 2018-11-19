import React, { Component } from 'react';
import { Modal, Form, Button, Input, Header, Icon } from 'semantic-ui-react';
import { create } from './api';

class ModalGrupo extends Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.close = this.close.bind(this)
        this.onOpen = this.onOpen.bind(this)
        this.onSalvar = this.onSalvar.bind(this)
        this.state = {
            open: false,
            nome: '',
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
            nome: '',
            open: true
        })
    }

    onSalvar() {
        create({
            nome: this.state.nome
        }).then(() => {
            this.close()
            this.props.getApostas()
        })
    }

    render() {
        const { open, nome } = this.state

        return (
            <Modal
                open={open}
                trigger={this.props.children}
                onOpen={this.onOpen}
                size='small'
                >
                <Icon link size='large' name='cancel' style={style.floated} onClick={this.close}/>
                <Header>Criar grupo</Header>
                <Modal.Content>
                    <Form>
                        <Form.Field
                            width={16}
                            control={Input}
                            label='Nome'
                            name='nome'
                            value={nome}
                            onChange={this.onChange}
                            />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary
                        icon="save"
                        content='Salvar'
                        onClick={this.onSalvar} />
                </Modal.Actions>
            </Modal>
        )
    }
}

const style = {
    floated: { float: 'right', margin: '10px' }
}

export default ModalGrupo