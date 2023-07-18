import React from 'react';
import './Profile.css';

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: this.props.user.name,
			age: this.props.user.age,
			entries: this.props.user.entries
		}
	}

	onFormChange = (event) => {
		switch(event.target.name) {
			case 'user-name':
				this.setState({name: event.target.value});
				break;
			case 'user-age':
				this.setState({age: event.target.value});
				break;
			default:
				break;
		}
	} 

	onProfileUpdate = () => {
		const { name, age } = this.state;
		fetch(`http://localhost:3001/profile/${this.props.user.id}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				formInput: {
					name,
					age
				}
			})
		})
		.then(resp => {
			this.props.toggleModal();
			this.props.loadUser({...this.props.user, name, age});
		})
		.catch(console.log)
	}

	render() {
		const { name, age, entries } = this.state;
		return (
			<div className="profile-modal">
				<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
					<main className="pa4 black-80 w-80">
						<img src="https://www.rd.com/wp-content/uploads/2021/04/GettyImages-988013222-scaled-e1618857975729.jpg" className="h3 w3 dib" alt="avatar" />
					  	<h1>{name}</h1>
					  	<h4>Images Submitted: {entries}</h4>
					  	<p>{`Member since: ${new Date(this.props.user.joined).toLocaleDateString()}`}</p>
					  	<hr />
				        <label className="mt2 fw6 w-100" htmlFor="user-name">Name:</label>
				        <input onChange={this.onFormChange} placeholder={name} className="pa2 ba hover-bg-black hover-white w-100" type="text" name="user-name"  id="name" />
				        <label className="mt2 fw6 w-100" htmlFor="user-age">Age:</label>
				        <input onChange={this.onFormChange} placeholder={age} className="pa2 ba hover-bg-black hover-white w-100" type="number" name="user-age"  id="age" />
				        <div className="mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
				        	<button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20" onClick={this.onProfileUpdate} >Save</button>
				        	<button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20" onClick={this.props.toggleModal}>Cancel</button>

				        </div>
					</main>
					<div className="modal-close" onClick={this.props.toggleModal}>&times;</div>
				</article>
			</div>
		)
	}
}

export default Profile;
