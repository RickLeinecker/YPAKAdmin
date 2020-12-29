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

const VIDEO_DEMO = [	
	{id: uuid(), title: "Video for people" },
	{id: uuid(), title: "Students in Politics" },
	{id: uuid(), title: "Upcoming 2024 Elections" },
	{id: uuid(), title: "Previous 2016 Elections" },
	{id: uuid(), title: "Elon musk should be president" },
	{id: uuid(), title: "Facebook data-mining" },
]

const Videos = () => {
	const history = useHistory();
	const [search, setSearch] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedVideo, setSelectedVideo] = useState(undefined);

	const [titleError, setTitleError] = useState("");
	const [descriptionError, setDescriptionError] = useState("");

	// TODO : when selecting a user
	const loadUserToForm = () => {
		
	}

	const handleSearchChange = (e) => { setSearch(e.target.value) };
	const handleTitleChange = (e) => { setTitle(e.target.value) };
	const handleDescriptionChange = (e) => { setDescription(e.target.value) };
	const handleSearch = (e) => { e.preventDefault(); console.log("Searching for ", search) };

	const handleVideoSelection = (video) => { 
		// Cancel video selection
		if (video.id === selectedVideo) {
			setSelectedVideo(undefined);
			return;
		}

		// Select a user for admin actions
		setSelectedVideo(video.id);
		console.log("Selecting Video", video)
	};

	return (
		<Container className="container-centered">
		<Row className="justify-content-center">
		  <Col lg="10" md="10" sm="12" xs="12">
			<div className="container--positioned container--bordered overflow-hidden">
			  <section className="container-header border-bottom-1 text-center mb-3">
				Videos
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
								<Col sm={3} className="form-label-col"><Form.Label>Title</Form.Label></Col>
								<Col><Form.Control type="text" onChange={handleTitleChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{titleError}</TextError>
						  </Form.Group>
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label style={{alignSelf: "flex-start"}}>Description</Form.Label></Col>
								<Col><Form.Control as="textarea" rows={3} onChange={handleDescriptionChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{descriptionError}</TextError>
						  </Form.Group>
						  <Form.Group>
								<Row>
									<Col sm={3}><Button className="btn-block search-btn" type="submit">Browse</Button></Col>
									<Col><Form.Control type="text" placeholder="Select a video file"></Form.Control></Col>
								</Row>
							</Form.Group>
					  </Col>
					  <Col className="rhs-user-page">
							<ListGroup className="rhs-user-page__user-list rhs-user-page__user-list--short" variant="flush">
								{VIDEO_DEMO.map(video => {
									return <ListGroup.Item 
											onClick={ () => handleVideoSelection(video) }
											key={video.id}
											active={!!video.id && video.id === selectedVideo}
											action>
												{video.title}
											</ListGroup.Item>
								})}
							</ListGroup>
							<Form.Group className="rhs-user-page__admin-check"><Form.Check className="checkbox--lg" type="checkbox" label="  Deactivated" /></Form.Group>
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

export default Videos;