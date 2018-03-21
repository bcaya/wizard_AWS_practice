import React from 'react';
import {
  Form,
  Grid,
  Image,
  Container,
  Divider,
  Header,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import DropZone from 'react-dropzone'; 
import { updateUser } from '../actions/user'; 

const Fragment = React.Fragment;

const defaultImage = 'https://i.vimeocdn.com/portrait/1989569_640x640';

class Profile extends React.Component {
  state = { 
    editing: false, 
    formValues: { name: '', email: '', gamertag: '', file: '' },
  }

  componentDidMount() {
    const { user: { name, email, gamertag }} = this.props
    this.setState({ formValues: { name, email, gamertag } })
  }

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing }
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formValues: { name, email, file, gamertag }} = this.state; 
    const { user, dispatch } = this.props; 
    dispatch(updateUser(user.id, { name, email, file, gamertag}))
    this.setState({
      editing: false, 
      formValues: { 
        ...this.state.formValues, 
        file: '' 
      }
    })
  }

  profileView = () => {
    const { user } = this.props;
    return (
      <Fragment>
        <Grid.Column width={4}>
          <Image src={user.image || defaultImage} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h1">{user.name}</Header>
          <Header as="h1">{user.email}</Header>
          <Header as="h1">{user.gamertag || 'Internet Coward'}</Header>
        </Grid.Column>
      </Fragment>
    )
  }

  onDrop=(files) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        file:files[0]
      }
    })
  }

  editView = () => {
    const { formValues: { name, email, gamertag, file } } = this.state //what we are grabbig out of state 
    return (
      <Form onSubmit={this.handleSubmit}>
        <Grid.Column width={4}>
          <DropZone 
            onDrop={this.onDrop}
            multiple={false}
            >
            { file && <Image src={file.preview}/>}
          </DropZone>
        </Grid.Column>
        <Grid.Column>
          <Form.Input
            label="Name"
            name="name"
            value={name}
            required
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            name="email"
            value={email}
            type="email"
            required
            onChange={this.handleChange}
          />
          <Form.Input
            label="Gamertag"
            name="gamertag"
            value={gamertag}
            onChange={this.handleChange}
          />
          <Button>Update</Button>
        </Grid.Column>
      </Form>
    )
  }

  render() {
    const { editing } = this.state;
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            { editing ? this.editView() : this.profileView() }
            <Grid.Column>
              <Button onClick={this.toggleEdit}>
                { editing ? 'Cancel' : 'Edit' }
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )

  }

}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Profile)