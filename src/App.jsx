import { useEffect, useState } from 'react'
import './App.css'
import { api } from './service/api'
import { Table, InputGroup, Form, Button } from 'react-bootstrap'

function App() {
  const [veiculos, setVeiculos] = useState([])
  const [placa, setPlaca] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [ano, setAno] = useState('')

  useEffect(() => {
    buscarVeiculosTable()
  }, [])

  async function buscarVeiculosTable() {
    await api.get('/veiculo').then((response)=>{
      setVeiculos(response.data)
    })
  }

  async function cadastrarVeiculo() {
    const veiculo = {
      placa,
      marca,
      modelo,
      ano: parseInt()
    }

    await api
      .post('/veiculo', veiculo)
      .then((response)=>{
          setVeiculos([... veiculos, response.data])
          alert('Veículo cadastrado com sucesso!')
          limparForm()
        })
      .catch(()=>{
          alert('Veículo já cadastrado!')
        }) 
    }

  function limparForm() {
    setPlaca('')
    setModelo('')
    setAno('')
    setMarca('')
  }

  async function excluirVeiculo(placa) {
    await api.delete(`/veiculo/${placa}`).then(()=>{
        buscarVeiculosTable()
        alert('Veículo excluído com sucesso!')
    })
  }


  return (
    <div className="container">

      <InputGroup className="mb-3 mt-5" >
        <Form.Control
          placeholder="Placa"
          value={placa}
          onChange={(e)=>{setPlaca(e.target.value)}}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Marca"
          value={marca}
          onChange={(e)=>{setMarca(e.target.value)}}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Modelo"
          value={modelo}
          onChange={(e)=>{setModelo(e.target.value)}}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Ano"
          type='number'
          value={ano}
          onChange={(e)=>{setAno(e.target.value)}}
        />
      </InputGroup>

      <Button className='mb-4' onClick={cadastrarVeiculo}>Salvar</Button>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>

        { veiculos.map((v)=>{
          return ( 
              <tr>
                <td>{v.id}</td>
                <td>{v.placa}</td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>{v.ano}</td>
                <td>
                  <Button onClick={()=>{excluirVeiculo(v.placa)}}>X</Button>
                </td>
              </tr>
            )
          })
        }

        </tbody>
      </Table>

    </div>
  )
}

export default App
