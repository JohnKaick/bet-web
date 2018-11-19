import React, { Component } from 'react';
import { getAll, updateResultado } from './api'
import { Container, Icon, Accordion, Button, Label, Grid } from 'semantic-ui-react';
import DatePicker from './../app/date';
import ModalGrupo from './../grupo/modal.component';
import ModalAposta from './modal.component';

class App extends Component {

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.get = this.get.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.greenClick = this.greenClick.bind(this)
        this.redClick = this.redClick.bind(this)
        this.state = {
            activeIndex: 0,
            dtInicio: new Date(),
            dtFinal: new Date(),
            apostas: [],
            totalAposta: null,
            totalRetorno: null,
            totalLucro: null,

        }
    }

    componentDidMount() {
        getAll().then(apt => {
            let ttA = 0
            let ttR = 0
            let ttQ = 0
            let apts = apt.data

            apts.forEach(a => {
                ttA += a.valor
                if (a.resultado === 'green') {
                    ttR += a.retorno
                }
                ttQ += 1                
            });

            this.setState({
                apostas: apts,
                totalAposta: ttA,
                totalRetorno: ttR,
                totalLucro: ttR - ttA,
            })
        }).catch(err => this.setState({ apostas: [] }))
    }

    get() {
        getAll().then(apt => {
            let ttA = 0
            let ttR = 0
            let ttQ = 0
            let apts = apt.data

            apts.forEach(a => {
                ttA += a.valor
                if (a.resultado === 'green') {
                    ttR += a.retorno
                }
                ttQ += 1                
            });

            this.setState({
                apostas: apts,
                totalAposta: ttA,
                totalRetorno: ttR,
                totalLucro: ttR - ttA,
            })
        }).catch(err => this.setState({ apostas: [] }))
    }

    onChange(e, { name, value }) {
        this.setState({ [name]: value })
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }

    greenClick = (e, props) => {
        const { id } = props
        updateResultado({ resultado: 'green', id: id }).then(() => {
            this.get()
        })
    }

    redClick = (e, props) => {
        const { id } = props
        updateResultado({ resultado: 'red', id: id }).then(() => {
            this.get()
        })
    }

    render() {

        const { activeIndex, dtInicio, dtFinal, apostas, totalAposta, totalLucro, totalRetorno } = this.state

        return (
            <div>
                <Container>
                    
                    {/*
                        <div style={style.margin}>
                        <DatePicker name="Inicio" value={dtInicio} onChange={this.onChange} />
                        </div>
                        <DatePicker name="Final" value={dtFinal} onChange={this.onChange} />
                        <Button><Icon name='filter' /> Filtro</Button>   
                    */}
                         
                    
                    <div style={style.margin}>
                        <ModalGrupo getApostas={this.get}>
                            <Button secondary><Icon name='plus' /> Grupo</Button>
                        </ModalGrupo>
                        <ModalAposta getApostas={this.get}>
                            <Button primary floated='right'><Icon name='plus' /> Apostas</Button>
                        </ModalAposta>
                    </div>

                    { apostas && apostas.length > 0 ? (
                        <div>
                            <h3 style={style.margin}>Apostas:</h3>
                            <Accordion fluid styled style={style.margin}>
                                { apostas.map((a, i) => (
                                    <div>
                                        <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
                                        { a.resultado === 'green' && 
                                            <div>
                                                <b> G: {a.grupo.nome}</b>  /  <b> A: {a.valor}</b>  /  <b> R: {a.retorno}</b> <b style={style.green}> Green</b>
                                            </div>
                                        }
                                        { a.resultado === 'red' && 
                                            <div>
                                                <b> G: {a.grupo.nome}</b>  /  <b> A: {a.valor}</b>  /  <b> R: {a.retorno}</b> <b style={style.red}> Red</b>
                                            </div>
                                        }
                                        { a.resultado === '' && 
                                            <div>
                                                <b> G: {a.grupo.nome}</b>  /  <b> A: {a.valor}</b>  /  <b> R: {a.retorno}</b>
                                            </div>
                                        }
                                        </Accordion.Title>
                                        <Accordion.Content active={activeIndex === i}>
                                            <b> Data: {new Date(a.createdAt).toLocaleDateString()}</b> 
                                            <br />
                                            <b> Nome: {a.nome}</b> 
                                            <br />
                                            <b> Grupo: {a.grupo.nome}</b>  /  <b> Aposta: {a.valor}</b>  /  <b> Retorno: {a.retorno}</b>
                                            <br />
                                            <br />
                                            <Button color='red' circular icon='cancel' id={a._id} onClick={this.redClick}/>
                                            <Button color='green' circular icon='check' id={a._id} onClick={this.greenClick}/>
                                        </Accordion.Content>
                                    </div>
                                ))}
                            </Accordion>
                        </div>
                        ) : (
                            <h2 style={style.center}>Sem apostas na data de hoje</h2>
                        )}                    
                    { apostas && apostas.length > 0 ? (
                        <div>
                            <h3 style={style.margin}>Totais:</h3>
                            <Label size='large' color='teal' basic>
                                Aposta
                                <Label.Detail>{totalAposta}</Label.Detail>
                            </Label>
                            <Label size='large' color='teal' basic>
                                Retorno
                                <Label.Detail>{totalRetorno}</Label.Detail>
                            </Label>
                            <Label size='large' color='blue' floated='right' basic>
                                Lucro
                                <Label.Detail>{totalLucro}</Label.Detail>
                            </Label>
                        </div>
                    ) : (<div></div>)}
                </Container>
            </div>
        );
    }
}

const style = {
    margin: { marginTop: '15px' },
    green: { color: 'green', float: 'right' },
    red: { color: 'red', float: 'right' },
    center: { textAlign: 'center' }
};


export default App;
