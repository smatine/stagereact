import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import AppNavbar from './AppNavbar';

class AnnuaireEdit extends Component {

  emptyItem = {
    nom:'', 
    prenom:'', 
    departement:'', 
    touched: {
      nom: false, 
      prenom: false,
      departement: false
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const annuaire = await (await fetch(`/annuaires/${this.props.match.params.id}`)).json();
      annuaire.touched = {
        nom: false, 
        prenom: false,
        departement: false
      };
      this.setState({item: annuaire});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});

    if(name === 'ebsOptimized')
    {
      item.ebsOptimized = (target.checked) ? true: false;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    
    item.touched = { 
      nom: true, 
      prenom: true,
      departement: true
    };
    const errors = this.validate(item.nom, item.prenom, item.departement);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    if(isDisabled) {
        this.forceUpdate();
        return;
    }
    

    await fetch((item.id) ? '/annuaires/'+(item.id) : '/annuaire', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });

    
    this.props.history.push('/annuaires');
  }

  handleBlur = (field) => (evt) => {

    let item = {...this.state.item};
    item.touched= { ...this.state.item.touched, [field]: true};
    this.setState({item});

  }
  
  validate(nom, prenom, departement) {

    const errors = {
      nom: '', 
      prenom: '',
      departement: ''
    };
    
    if(this.state.item.touched.nom && nom.length === 0){
      errors.nom = 'nom should not be null';
      return errors;
    } else if(this.state.item.touched.prenom && prenom.length === 0){
      errors.prenom = 'prenom should not be null';
      return errors;
    } else if(this.state.item.touched.departement && departement.length === 0){
      errors.departement = 'departement should not be null';
      return errors;
    }
    
    
    return errors;
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Annuaire' : 'Add Annuaire'}</h2>;
    
    const errors = this.validate(item.nom, item.prenom, item.departement);
    const isDisabled = Object.keys(errors).some(x => errors[x]);


    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          
          <FormGroup>
            <Label for="nom">Nom (*)</Label>
            <Input type="text" name="nom" id="nom" value={item.nom || ''} placeholder="Enter nom" 
                   onChange={this.handleChange} onBlur={this.handleBlur('nom')} autoComplete="nom" 
                   valid={errors.nom === ''}
                   invalid={errors.nom !== ''}
                   />
            <FormFeedback>{errors.nom}</FormFeedback>
         </FormGroup>

         <FormGroup>
            <Label for="prenom">Prenom (*)</Label>
            <Input type="text" name="prenom" id="prenom" value={item.prenom || ''} placeholder="Enter prenom" 
                   onChange={this.handleChange} onBlur={this.handleBlur('prenom')} autoComplete="prenom" 
                   valid={errors.prenom === ''}
                   invalid={errors.prenom !== ''}
                   />
            <FormFeedback>{errors.prenom}</FormFeedback>
         </FormGroup>

         <FormGroup>
            <Label for="nom">Departement (*)</Label>
            <Input type="text" name="departement" id="departement" value={item.departement || ''} placeholder="Enter departement" 
                   onChange={this.handleChange} onBlur={this.handleBlur('family')} autoComplete="departement" 
                   valid={errors.departement === ''}
                   invalid={errors.departement !== ''}
                   />
            <FormFeedback>{errors.departement}</FormFeedback>
         </FormGroup>
         

          <FormGroup>   
            <Button color="primary" type="submit" disabled={isDisabled}>Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/annuaires">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(AnnuaireEdit);