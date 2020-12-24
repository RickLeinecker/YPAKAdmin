import React, { useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faVideo,
  faClipboardList,
  faPoll, // Alternative to ClipboardList
  faListAlt, // Alternative to ClipboardList
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from 'uuid'
import {
	faSave,
	faPlusSquare
} from "@fortawesome/free-regular-svg-icons";
import { useHistory } from "react-router-dom";
import TextError from "../../components/TextError";

const USER_DEMO = [
	{id: uuid(), name: "Kyle Ginter" },
	{id: uuid(), name: "Jared Ginter" },
	{id: uuid(), name: "Garrette Ginter" },
	{id: uuid(), name: "Robin Ginter" },
	{id: uuid(), name: "Cary Ginter" },
	{id: uuid(), name: "Gonen Matias" },
]

const Users = () => {
	const history = useHistory();
	const [search, setSearch] = useState("");
	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [selectedUser, setSelectedUser] = useState(undefined);

	const [firstError, setFirstError] = useState("");
	const [lastError, setLastError] = useState("");
	const [loginError, setLoginError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmError, setConfirmError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [phoneError, setPhoneError] = useState("");

	// TODO : when selecting a user
	const loadUserToForm = () => {
		
	}

	const handleSearchChange = (e) => { setSearch(e.target.value) };
	const handleFirstChange = (e) => { setSearch(e.target.value) };
	const handleLastChange = (e) => { setSearch(e.target.value) };
	const handleLoginChange = (e) => { setSearch(e.target.value) };
	const handlePasswordChange = (e) => { setSearch(e.target.value) };
	const handleConfirmChange = (e) => { setSearch(e.target.value) };
	const handleEmailChange = (e) => { setSearch(e.target.value) };
	const handlePhoneChange = (e) => { setSearch(e.target.value) };
	const handleSearch = (e) => { e.preventDefault(); console.log("Searching for ", search) };

	const handleUserSelection = (user) => { 
		// Cancel user selection
		if (user.id === selectedUser) {
			setSelectedUser(undefined);
			return;
		}

		// Select a user for admin actions
		setSelectedUser(user.id);
		console.log("Selecting User", user)
	};

	return (
		<Container className="container-centered">
		<Row className="justify-content-center">
		  <Col lg="10" md="10" sm="12" xs="12">
			<div className="container--positioned container--bordered overflow-hidden">
			  <section className="container-header border-bottom-1 text-center mb-3">
				Edit/Add User
			  </section>
			  <section className="container-body px-3">
				  <Row style={{padding: "15px"}}>
					  {/* <Col style={{background: "rgba(0,0,0,.05)"}} md={8} xl={8} xs={12} sm={12} > */}
					  <Col md={8} xl={8} xs={12} sm={12} >
						  <Form onSubmit={handleSearch}>
							<Form.Group>
								<Row>
									<Col sm={3}><Button className="btn-block" type="submit">Search</Button></Col>
									<Col><Form.Control type="text" onChange={handleSearchChange}></Form.Control></Col>
								</Row>
							</Form.Group>
						  </Form>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>First</Form.Label></Col>
								<Col><Form.Control type="text" onChange={handleFirstChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{firstError}</TextError>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Last</Form.Label></Col>
								<Col><Form.Control type="text" onChange={handleLastChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{lastError}</TextError>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Login</Form.Label></Col>
								<Col><Form.Control type="text" onChange={handleLoginChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{loginError}</TextError>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Password</Form.Label></Col>
								<Col><Form.Control type="password" onChange={handlePasswordChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{passwordError}</TextError>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Confirm</Form.Label></Col>
								<Col><Form.Control type="password" onChange={handleConfirmChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{confirmError}</TextError>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Email</Form.Label></Col>
								<Col><Form.Control type="email" onChange={handleEmailChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{emailError}</TextError>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Phone</Form.Label></Col>
								<Col><Form.Control type="text" onChange={handlePhoneChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{phoneError}</TextError>
						  </Form.Group>
					  </Col>
					  <Col className="rhs-user-page">
							<ListGroup className="rhs-user-page__user-list" variant="flush">
								{USER_DEMO.map(user => {
									return <ListGroup.Item 
											onClick={ () => handleUserSelection(user) }
											key={user.id}
											active={!!user.id && user.id === selectedUser}
											action>
												{user.name}
											</ListGroup.Item>
								})}
							</ListGroup>
							<Form.Group className="rhs-user-page__admin-check"><Form.Check className="checkbox--lg" type="checkbox" label="  Super Admin" /></Form.Group>
					  </Col>
				  </Row>
			  </section>
			  <section className="container-footer py-3 px-4">
					<Button className="control-button mr-3"><FontAwesomeIcon icon={faSave} className="no-style"/> Save</Button>
					<Button className="control-button mr-3"><FontAwesomeIcon icon={faPlusSquare} className="no-style"/> New</Button>
					<Button className="control-button" onClick={() => history.push('/landing')}><FontAwesomeIcon icon={faArrowLeft} /> Back</Button>
			  </section>
			</div>
		  </Col>
		</Row>
	  </Container>
	)
};

export default Users;