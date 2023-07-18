import React from 'react';
import './Profile.css';

const Profile = ({ isProfileOpen, toggleModal, user }) => {
	return (
		<div className="profile-modal">
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
				<main className="pa4 black-80 w-80">
					<img src="https://www.rd.com/wp-content/uploads/2021/04/GettyImages-988013222-scaled-e1618857975729.jpg" className="h3 w3 dib" alt="avatar" />
				  	<h1>{user.name}</h1>
				  	<h4>Images Submitted: {user.entries}</h4>
				  	<p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
				  	<hr />
			        <label className="mt2 fw6 w-100" htmlFor="user-name">Name:</label>
			        <input placeholder={user.name} className="pa2 ba hover-bg-black hover-white w-100" type="text" name="user-name"  id="name" />
			        <label className="mt2 fw6 w-100" htmlFor="user-age">Age:</label>
			        <input placeholder={user.age} className="pa2 ba hover-bg-black hover-white w-100" type="number" name="user-age"  id="age" />
			        <div className="mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
			        	<button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">Save</button>
			        	<button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20" onClick={toggleModal}>Cancel</button>

			        </div>
				</main>
				<div className="modal-close" onClick={toggleModal}>&times;</div>
			</article>
		</div>
	)
}

export default Profile;
