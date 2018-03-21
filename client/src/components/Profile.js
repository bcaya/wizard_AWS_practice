import React from 'react'; 
import {
  Form, 
  Grid, 
  Image, 
  Container, 
  Divider, 
  Header, 
  Button 
} from 'semantic-ui-react'; 
import { Connect } from 'react-redux'; 

const defaultImage = 'https://img00.deviantart.net/e4c4/i/2010/219/e/3/toon_wallpapers_muno_by_kikechan.jpg'

class Profile extends React.Component {
  state = {
    editing: false, 
    formValues: {name: '', email:'', gamertag: '' }
  }

  componentDidMount(){
    const { user: {name, email, gamertag }} = this.props 
    this.setState({ formValues: { name, email, gamertag } } )
  }
}

toggleEdit = () => {
  this.setState( state => {
    return ({ editing: !this.state.editing })
  })
}

handleChange =(e) => {

}

handleSubmit = (e) => {

}

profileView = () => {

}
editView = () => {

}

render(){
  
}

const mapStateToProps = (state) => {
  return { user: state.user }

}

export default connect(mapStateToProps)(Profile); 