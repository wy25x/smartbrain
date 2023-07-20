import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';

import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';
import './App.css';

const returnClarifaiRequestOptions = (imgUrl) => {
  const PAT = 'd41852397c5b4dcda798ec7215fe6c38';
  const USER_ID = 'valstrathra';       
  const APP_ID = 'smartbrain';
  const IMAGE_URL = imgUrl;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;
}

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: "https://samples.clarifai.com/metro-north.jpg",
      imageUrl: "",
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      isProfileOpen: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        age: ''
      }
    }
  }

  componentDidMount(){
    const token = window.localStorage.getItem('token');
    console.log(token)
    if (token) {
      fetch('http://localhost:3001/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (data && data.id) {
          fetch(`http://localhost:3001/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(resp => resp.json())
          .then(user => {
            if (user && user.email) {
              this.loadUser(user)
              this.onRouteChange('home')
            }
          })
          .catch(console.log)
        }
      })
      .catch(console.log)
    }
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  onRouteChange = (route) => {
    if (route === "signout"){
      return this.setState({isSignedIn: false, route: 'signin'})
    }
    else if (route === 'home'){
      this.setState({isSignedIn: true})
    }

    this.setState({route})
  }

  calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box
      const image = document.getElementById('inputimage');
      const width = Number(image.width)
      const height = Number(image.height)
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    })
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
          },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.displayFaceBoxes(this.calculateFaceLocations(response))
    })
    .catch(error => console.log('error', error));
  }
     // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)

  render() {
    const { isProfileOpen, user } = this.state;
    return (
      <div className="App">
        <ParticlesBg className="particles" type="circle" bg={true} />
        <Navigation toggleModal={this.toggleModal} isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {
          isProfileOpen 
          ?
          <Modal>
            <Profile loadUser={this.loadUser} user={user} isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} />
          </Modal>
          :
          null 
        }
        { this.state.route === 'signin' ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
        : 
        this.state.route === 'register' ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        :
        this.state.route === 'home'
        ?
        <div> 
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onSubmit={this.onButtonSubmit} onInputChange={this.onInputChange} />
          <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
        </div>
        :
        <div></div>
        }
      </div>
    );
  }
}

export default App;
