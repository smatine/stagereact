import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class AnnuaireList extends Component {

  constructor(props) {
    super(props);
    this.state = {annuaires: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('annuaires')
      .then(response => response.json())
      .then(data => this.setState({annuaires: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/annuaires/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updateAnnuaire = [...this.state.annuaires].filter(i => i.id !== id);
      this.setState({annuaires: updateAnnuaire});
    });
  }

  render() {
    const {annuaires, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const annuaireList = annuaires.map(annuaire => {
    const ebsOptimized = (annuaire.ebsOptimized) ? 'Yes':'-';

      return <tr key={annuaire.id}>
        <td style={{whiteSpace: 'nowrap'}}>{annuaire.id}</td>

		    <td>{annuaire.nom}</td>  
        <td>{annuaire.prenom}</td>
        <td>{annuaire.departement}</td>
        
        <td>  
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/instancetypes/" + annuaire.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(annuaire.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/annuaires/new">Add User</Button>
          </div>
          <h3>Annuaire</h3>
          <Table className="mt-4">
            <thead>
            <tr>
			        <th width="30%">Id</th>
              <th width="30%">Prenom</th>
              <th width="30%">Departement</th>
               
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {annuaireList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default AnnuaireList;