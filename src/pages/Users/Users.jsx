import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
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
import firebase, { fireAuthService } from '../../store/firebase';

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
	const { auth } = useSelector((state) => state.auth);
	
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(undefined);
	const [searching, setSearching] = useState(false);
	const [saving, setSaving] = useState(false);

	const [search, setSearch] = useState("");
	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [isSuper, setIsSuper] = useState(false);

	const [firstError, setFirstError] = useState("");
	const [lastError, setLastError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmError, setConfirmError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [phoneError, setPhoneError] = useState("");
	const [formError, setFormError] = useState("");

	const _resetErrors = () => {
		setFirstError("")
		setLastError("")
		setPasswordError("")
		setConfirmError("")
		setEmailError("")
		setPhoneError("")
		setFormError("")
	}

	const _parseErrors = (error) => {
		if (!error || !error.code || typeof error.code !== "string")
			return;
		
		if (error.code.includes("email")) setEmailError(error.message)
		else if (error.code.includes("password")) setPasswordError(error.message)
	}

	const validate = (create=true) => {
		let _valid = true;

		if (create) {
			console.log("Create is true");
			if (!email) {
				setEmailError("Please provide an email address");
				_valid = false;
			}

			if (password !== confirm) {
				setConfirmError("Passwords do not match");
				_valid = false;
			}
		}

		if (!first) {
			setFirstError("Missing first name");
			_valid = false;
		}

		if (!last) {
			setLastError("Missing last name");
			_valid = false;
		}

		return _valid;
	}


	// TODO : when selecting a user
	const loadUserToForm = (user) => {
		if (!user)
			return;

		// TODO : get email from auth
		// setEmail(user.email);
		console.log(user);
		setFirst(user.first);
		setLast(user.last);
		setPhone(user.phone);
		setIsSuper(user.super);
	}

	const handleSearchChange = (e) => { setSearch(e.target.value) };
	const handleFirstChange = (e) => { setFirst(e.target.value) };
	const handleLastChange = (e) => { setLast(e.target.value) };
	const handlePasswordChange = (e) => { setPassword(e.target.value) };
	const handleConfirmChange = (e) => { setConfirm(e.target.value) };
	const handleEmailChange = (e) => { setEmail(e.target.value) };
	const handlePhoneChange = (e) => { setPhone(e.target.value) };
	const handleSuperChange = (e) => { console.log(e.target.checked); setIsSuper(e.target.checked) };
	
	const handleSearch = (e) => {
		if (e && e.preventDefault && typeof e.preventDefault === 'function')
			e.preventDefault();

		// Search
		setSearching(true);
		firebase.firestore().collection("Users").where("belongsTo", "==", auth.groupId).get()
			.then((snapshot) =>{
				setUsers(
					snapshot.docs.map(doc =>  ({ ...doc.data(), id: doc.id }) )
						.filter(doc => Object.values(doc).some(field => typeof field === 'string' && field.toLowerCase().includes(search.toLowerCase())))
				)
			})
			.finally(() => setSearching(false));
		console.log("Searching for ", search)
	};

	const handleUserSelection = (user) => { 
		// Cancel user selection
		if (user.id === selectedUser) {
			setSelectedUser(undefined);
			return;
		}

		// Select a user for admin actions
		setSelectedUser(user.id);
		
		// Load user data to form
		loadUserToForm(user);
		
		console.log("Selecting User", user)
	};

	const updateUser = (e) => {
		if (e && typeof e.preventDefault === 'function')
			e.preventDefault();

		_resetErrors();
		if (!validate(false))
			return;
		
		setSaving(true);
		firebase.firestore().collection("Users").doc(selectedUser)
			.update({
				first,
				last,
				phone,
				super: isSuper,
			})
			.then(() => {
				handleSearch();
			})
			.catch((err) => {
				console.log("update user error:", err);
				_parseErrors(err);
				setFormError(err.message);
			})
			.finally(() => setSaving(false));
	}

	const createUser = (e) => {
		if (e && typeof e.preventDefault === 'function')
			e.preventDefault();
		
		_resetErrors();
		if (!validate())
			return;

		fireAuthService.auth().createUserWithEmailAndPassword(email, password)
			.then((newCredentials) => {
				// TODO : create a doc for this user
				const uid = newCredentials.user.uid;
				firebase.firestore().collection("Users").doc(uid)
					.set({
						first,
						last,
						phone,
						belongsTo: auth.groupId,
						super: isSuper,
					})
					.then(() => {
						// TODO : clear form
						handleSearch();
					})
					.catch((err) => {
						// TODO : display error
						// TODO : revert user creation
						newCredentials.user.delete()
							.catch((e) => { console.log("Failed to revert user creation", e) })
							.finally(() => setFormError(err.message));
					})
			})
			.catch((err) => {
				console.log("create user error:", err);
				_parseErrors(err);
				setFormError(err.message);
			})
			.finally(() => setSaving(false));
	}

	useEffect(() => {
		// TODO : fetch all users of admin's group
		// firebase.firestore().collection("Users").where("belongsTo", "==", auth.groupId).get()
		// firebase.firestore().collection("Users").get()
		firebase.firestore().collection("Users").where("belongsTo", "==", "7gVQmuHRZoBwsYUZV0vv").get()
			.then((snapshot) => { setUsers(snapshot.docs.map(doc =>  ({ ...doc.data(), id: doc.id }) )); console.log(snapshot.docs.map(doc =>  ({ ...doc.data(), id: doc.id }) )) })
			.finally(() => { setSearching(false); });
		// .then((snapshot) => console.log("Fetched users:", snapshot.docs.map(doc => doc.data())));
	}, [])


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
									<Col sm={3}><Button className="btn-block search-btn" type="submit">Search</Button></Col>
									<Col><Form.Control type="text" onChange={handleSearchChange}></Form.Control></Col>
								</Row>
							</Form.Group>
						  </Form>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>First</Form.Label></Col>
								<Col><Form.Control value={first} isInvalid={firstError} type="text" onChange={handleFirstChange}></Form.Control></Col>
							  </Row>
							  <Row><Col sm={{offset: 3}}><TextError>{firstError}</TextError></Col></Row>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Last</Form.Label></Col>
								<Col><Form.Control value={last} isInvalid={lastError} type="text" onChange={handleLastChange}></Form.Control></Col>
							  </Row>
							  <Row><Col sm={{offset: 3}}><TextError>{lastError}</TextError></Col></Row>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Email</Form.Label></Col>
								<Col><Form.Control value={email} isInvalid={emailError} type="email" onChange={handleEmailChange}></Form.Control></Col>
							  </Row>
							  <Row><Col sm={{offset: 3}}><TextError>{emailError}</TextError></Col></Row>
						  </Form.Group>
						  {/* <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Login</Form.Label></Col>
								<Col><Form.Control type="text" onChange={handleLoginChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{loginError}</TextError>
						  </Form.Group> */}
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Password</Form.Label></Col>
								<Col><Form.Control isInvalid={passwordError || confirmError} type="password" onChange={handlePasswordChange}></Form.Control></Col>
							  </Row>
							  <Row><Col sm={{offset: 3}}><TextError>{passwordError}</TextError></Col></Row>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Confirm</Form.Label></Col>
								<Col><Form.Control isInvalid={confirmError} type="password" onChange={handleConfirmChange}></Form.Control></Col>
							  </Row>
							  <Row><Col sm={{offset: 3}}><TextError>{confirmError}</TextError></Col></Row>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Phone</Form.Label></Col>
								<Col><Form.Control value={phone}  type="text" onChange={handlePhoneChange}></Form.Control></Col>
							  </Row>
							  <Row><Col sm={{offset: 3}}><TextError>{phoneError}</TextError></Col></Row>
						  </Form.Group>
					  </Col>
					  <Col className="rhs-user-page">
							<ListGroup className="rhs-user-page__user-list" variant="flush" style={!users || !users.length ? {border: "none"} : undefined}>
								{users.map(user => {
									return <ListGroup.Item 
											onClick={ () => handleUserSelection(user) }
											key={user.id}
											active={!!user.id && user.id === selectedUser}
											action>
												{user.first} {user.last}
											</ListGroup.Item>
								})}
							</ListGroup>
							<Form.Group className="rhs-user-page__admin-check"><Form.Check className="checkbox--lg" type="checkbox" label="  Super Admin" checked={isSuper} onChange={handleSuperChange}/></Form.Group>
					  </Col>
				  </Row>
				  <TextError center>{formError}</TextError>
			  </section>
			  <section className="container-footer py-3 px-4">
					<Button className="control-button mr-3" disabled={!selectedUser} onClick={updateUser}><FontAwesomeIcon icon={faSave} className="no-style"/> Save</Button>
					<Button className="control-button mr-3" onClick={createUser}><FontAwesomeIcon icon={faPlusSquare} className="no-style"/> New</Button>
					<Button className="control-button" onClick={() => history.push('/landing')}><FontAwesomeIcon icon={faArrowLeft} /> Back</Button>
			  </section>
			</div>
		  </Col>
		</Row>
	  </Container>
	)
};

export default Users;