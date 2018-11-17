import React, { Component } from 'react';
import { getAll } from './api'
import { Container, Icon, Accordion, Button, Label, Grid } from 'semantic-ui-react';
import DatePicker from './../app/date'

class App extends Component {

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            apostas: [],
            activeIndex: 0,
            dtInicio: new Date(),
            dtFinal: new Date(),
        }
    }

    componentDidMount() {
        getAll().then(apt => {
            this.setState({
                apostas: apt.data,
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

    render() {

        const { activeIndex, dtInicio, dtFinal } = this.state

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
                        <Button secondary><Icon name='plus' /> Grupo</Button>
                        <Button primary floated='right'><Icon name='plus' /> Apostas</Button>
                    </div>

                    <Accordion fluid styled style={style.margin}>
                        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                            <b> G: Mika</b>  /  <b> A: 500</b>  /  <b> L: 500</b> <b style={style.green}> Green</b>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                            <Button.Group fluid>
                                <Button color='green'>Green</Button>
                                <Button color='red'>Red</Button>
                            </Button.Group>
                        </Accordion.Content>

                        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                            <b> G: Mika</b>  /  <b> A: 500</b>  /  <b> L: 500</b> <b style={style.red}> Red</b>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 2}>
                            <Button.Group fluid>
                                <Button color='green'>Green</Button>
                                <Button color='red'>Red</Button>
                            </Button.Group>
                        </Accordion.Content>
                    </Accordion>

                    <Label size='large' color='green' style={style.margin} basic>
                        Green
                        <Label.Detail>214</Label.Detail>
                    </Label>
                    <Label size='large' color='red' style={style.margin} basic>
                        Red
                        <Label.Detail>214</Label.Detail>
                    </Label>
                    <Label size='large' color='blue' floated='right' style={style.margin} basic>
                        Total
                        <Label.Detail>214</Label.Detail>
                    </Label>
                </Container>
            </div>
        );
    }
}

const style = {
    margin: { marginTop: '15px' },
    green: { color: 'green', float: 'right' },
    red: { color: 'red', float: 'right' },
};


export default App;
