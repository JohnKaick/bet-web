import React, { Component } from 'react';
import { getAll, updateResultado, getFiltro } from './api'
import { Container, Icon, Accordion, Button, Responsive, Grid, Statistic } from 'semantic-ui-react';
import DatePicker from './../app/date';
import ModalGrupo from './../grupo/modal.component';
import ModalAposta from './modal.component';

class App extends Component {

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.get = this.get.bind(this)
        this.onFiltro = this.onFiltro.bind(this)
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

    onFiltro() {
        getFiltro({
            dtInicio: this.state.dtInicio,
            dtFinal: this.state.dtFinal,
        }).then(apt => {
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
                    
                    <div style={style.margin}>
                        <ModalAposta getApostas={this.get}>
                            <Button primary floated='right'><Icon name='plus' /> Apostas</Button>
                        </ModalAposta>
                        <ModalGrupo getApostas={this.get}>
                            <Button primary><Icon name='plus' /> Grupo</Button>
                        </ModalGrupo>
                    </div>

                    <Responsive {...Responsive.onlyMobile}>
                        <div style={style.margin}>
                            <label>Data Início:</label>
                            <DatePicker name="dtInicio" value={dtInicio} onChange={this.onChange} />
                        </div>
                        <div style={style.margin}>
                            <label>Data final:</label>
                            <DatePicker name="dtFinal" value={dtFinal} onChange={this.onChange} />     
                        </div>
                        <div style={style.margin}>
                            <Button fluid onClick={this.onFiltro}><Icon name='filter' /> Filtro</Button>
                        </div>
                    </Responsive>
                    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                        <Grid>
                            <Grid.Column computer={5} style={style.margin}>
                                <label>Data Início:</label>
                                <DatePicker name="dtInicio" value={dtInicio} onChange={this.onChange} />
                            </Grid.Column>
                            <Grid.Column computer={5} style={style.margin}>
                                <label>Data final:</label>
                                <DatePicker name="dtFinal" value={dtFinal} onChange={this.onChange} />                            
                            </Grid.Column>
                            <Grid.Column tablet={4} computer={3} style={style.margin}>
                                <label>.</label>
                                <Button fluid onClick={this.onFiltro}><Icon name='filter' /> Filtro</Button>
                            </Grid.Column>
                        </Grid>             
                    </Responsive>

                    { apostas && apostas.length > 0 && (
                        <div>                                
                            <h3 style={style.margin}>Estatística:</h3>
                            <Statistic size='tiny'>
                                <Statistic.Value>{totalAposta}</Statistic.Value>
                                <Statistic.Label>Apostas</Statistic.Label>
                            </Statistic>
                            <Statistic size='tiny'>
                                <Statistic.Value>{totalRetorno}</Statistic.Value>
                                <Statistic.Label>Retorno</Statistic.Label>
                            </Statistic>
                            { totalLucro > 0 ? (
                            <Statistic size='tiny' color='blue'>
                                <Statistic.Value>{totalLucro}</Statistic.Value>
                                <Statistic.Label>Lucro</Statistic.Label>
                            </Statistic>
                            ) : (
                            <Statistic size='tiny' color='red'>
                                <Statistic.Value>{totalLucro}</Statistic.Value>
                                <Statistic.Label>Lucro</Statistic.Label>
                            </Statistic>
                            )}
                        </div>
                    )}
                    
                    { apostas && apostas.length > 0 ? (
                        <div>
                            <h3 style={style.margin}>Apostas:</h3>
                            <Accordion fluid styled style={style.margin}>
                                { apostas.map((a, i) => (
                                    <div>
                                        <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
                                        { a.resultado === 'green' && 
                                            <div>
                                                <b> G: {a.grupo.nome}</b> / <b> A: {a.valor}</b> / <b> R: {a.retorno}</b> <b style={style.green}> Green</b>
                                            </div>
                                        }
                                        { a.resultado === 'red' && 
                                            <div>
                                                <b> G: {a.grupo.nome}</b> / <b> A: {a.valor}</b> / <b> R: {a.retorno}</b> <b style={style.red}> Red</b>
                                            </div>
                                        }
                                        { a.resultado === '' && 
                                            <div>
                                                <b> G: {a.grupo.nome}</b> / <b> A: {a.valor}</b> / <b> R: {a.retorno}</b>
                                            </div>
                                        }
                                        </Accordion.Title>
                                        <Accordion.Content active={activeIndex === i}>
                                            <ModalAposta id={a._id} getApostas={this.get}>
                                                <Button color='blue' floated='right' circular icon='pencil'/>
                                            </ModalAposta>
                                            <b> Data: {new Date(a.createdAt).toLocaleDateString('pt-br')}</b> 
                                            <br />
                                            <b> Nome: {a.nome}</b> 
                                            <br />
                                            <Button color='red' floated='right' circular icon='cancel' id={a._id} onClick={this.redClick}/>
                                            <Button color='green' floated='right' circular icon='check' id={a._id} onClick={this.greenClick}/>
                                            <b> Grupo: {a.grupo.nome}</b>
                                            <br />
                                            <b> Aposta: {a.valor}</b> / <b> Retorno: {a.retorno}</b>
                                        </Accordion.Content>
                                    </div>
                                ))}
                            </Accordion>
                        </div>
                        ) : (
                            <h2 style={style.center}>Sem apostas na data de hoje</h2>
                        )}                    
                </Container>
            </div>
        );
    }
}

const style = {
    margin: { marginTop: '15px' },
    right: { float: 'right' },
    green: { color: 'green', float: 'right' },
    red: { color: 'red', float: 'right' },
    center: { textAlign: 'center' }
};


export default App;
