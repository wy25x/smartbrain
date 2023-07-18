import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class ProfileIcon extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			dropdownOpen: false
		}
	}

	toggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}))
	}

	render() {
		const { dropdownOpen } = this.state
		return (
			<div className="pa1 tc">
				<div className="d-flex p-5">
			      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
			        <DropdownToggle
			          tag="span"
			          data-toggle="dropdown"
			          aria-expanded={this.state.dropdownOpen}
			        >
			          	<div className="pa0 tc">
						  <img
						      src="https://www.rd.com/wp-content/uploads/2021/04/GettyImages-988013222-scaled-e1618857975729.jpg"
						      className="br-100 ba h3 w3 dib" alt="avatar" />
						</div>
			        </DropdownToggle>
			        <DropdownMenu className="b--transparent shadow-5" style={{marginTop: '-5px', backgroundColor: 'rgba(255,255,255,0.5)'}}>
			          <DropdownItem onClick={this.props.toggleModal} >View Profile</DropdownItem>
			          <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Sign Out</DropdownItem>
			        </DropdownMenu>
			      </Dropdown>
			    </div>
			</div>
		)
	}
}

export default ProfileIcon;
