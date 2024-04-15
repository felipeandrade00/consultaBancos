import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table } from 'react-bootstrap';
import './consultaBancos.css';
import logoRevGas from './logorevgas.jpg';


function ConsultaBancos() {
    const [codigoCompensacao, setCodigoCompensacao] = useState('');
    const [bancosConsultados, setBancosConsultados] = useState([]);

    const handleBuscarBanco = async (event) => {
        event.preventDefault();

        try {
            const resposta = await axios.get(`http://localhost:3000/listagemBancos/${codigoCompensacao}`);
            setBancosConsultados(resposta.data);
        } catch (error) {
            console.error('Erro ao consultar a API:', error);
        }
    };

    const handleChange = (event) => {
        setCodigoCompensacao(event.target.value);
    };

    return (
        
        <Container className="container-consulta-banco">
            <img src={logoRevGas} alt="Logo" className='logorevgas'/>
            
            <h1>Consulta de Bancos</h1>

            <Form onSubmit={handleBuscarBanco}>
                <Form.Group controlId="codigoCompensacao">
                    <Form.Label>Código de Compensação:</Form.Label>
                    <Form.Control
                        type="text"
                        value={codigoCompensacao}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Consultar
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código de Compensação</th>
                        <th>Nome da Instituição</th>
                    </tr>
                </thead>
                <tbody>
                    {bancosConsultados.map((banco) => (
                        <tr key={banco.codigoCompensacao}>
                            <td>{banco.codigoCompensacao}</td>
                            <td>{banco.nomeInstituicao}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}


export default ConsultaBancos;