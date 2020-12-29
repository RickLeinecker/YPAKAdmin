import React, { useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faSurvey,
  faClipboardList,
  faPoll, // Alternative to ClipboardList
  faListAlt,
  faPlusCircle, // Alternative to ClipboardList
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from 'uuid'
import {
	faSave,
	faPlusSquare
} from "@fortawesome/free-regular-svg-icons";
import { useHistory } from "react-router-dom";
import TextError from "../../components/TextError";
import SurveyAnswer from "../../components/SurveyAnswer";

const SURVEY_DEMO = [
	{id: uuid(), title: "Survey for people" },
	{id: uuid(), title: "Satifcation with UCF" },
	{id: uuid(), title: "Best Major 2020" },
	{id: uuid(), title: "Favorite GEN-Ed classes" },
	{id: uuid(), title: "Least Favorite GEN-Ed classes" },
]
const SURVEY_ANSWERS_DEMO = [
	{id: uuid(), value: "Best answer ever" },
	{id: uuid(), value: "Another Answer" },
	{id: uuid(), value: "Don't choose this!" },
]

const Surveys = () => {
	const history = useHistory();
	const [search, setSearch] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [tags, setTags] = useState("");
	const [answers, setAnswers] = useState(SURVEY_ANSWERS_DEMO);
	const [selectedSurvey, setSelectedSurvey] = useState(undefined);

	const [titleError, setTitleError] = useState("");
	const [answersError, setAnswersError] = useState("");
	const [descriptionError, setDescriptionError] = useState("");

	// TODO : when selecting a user
	const loadSurveyToForm = () => {
		
	}

	const handleSearchChange = (e) => { setSearch(e.target.value) };
	const handleTitleChange = (e) => { setTitle(e.target.value) };
	const handleDescriptionChange = (e) => { setDescription(e.target.value) };
	const handleTagsChange = (e) => { setTags(e.target.value) };
	const handleSearch = (e) => { e.preventDefault(); console.log("Searching for ", search) };

	const handleSurveySelection = (survey) => { 
		// Cancel survey selection
		if (survey.id === selectedSurvey) {
			setSelectedSurvey(undefined);
			return;
		}

		// Select a user for admin actions
		setSelectedSurvey(survey.id);
		console.log("Selecting Survey", survey)
	};

	const onAddAnswer = () => { setAnswers([...answers, {id: uuid(), value: ""}]) }
	const onAnswerChange = (index, value) => {
		if (!answers || index >= answers.length || index < 0)
			return;

		const _answers = [...answers].map((answer) => ({ ...answer, error: "" }));
		_answers[index].value = value;
	
		// TODO : handle duplicates?
		setAnswers(_answers);
	  };
	
	const onAnswerDelete = (index) => {
		if (!answers || index >= answers.length || index < 0)
			return;
		
		const _answers = [...answers].map((answer) => ({ ...answer, error: "" }));
		_answers.splice(index, 1);

		// TODO : handle duplicates?
		setAnswers(_answers);
	}

	return (
		<Container className="container-centered">
		<Row className="justify-content-center">
		  <Col lg="10" md="10" sm="12" xs="12">
			<div className="container--positioned container--bordered overflow-hidden">
			  <section className="container-header border-bottom-1 text-center mb-3">
				Surveys
			  </section>
			  <section className="container-body px-3">
				  <Row style={{padding: "15px"}}>
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
								<Col sm={3} className="form-label-col"><Form.Label style={{alignSelf: "flex-start"}}>Answers</Form.Label></Col>
								<Col>
									{answers.map((answer, idx) => {
										return <SurveyAnswer
											key={`answer-${answer.id}`}
											id={answer.id}
											index={idx}
											deleteable={answers.length > 2}
											onChange={(idx, value) => onAnswerChange(idx, value)}
											onDelete={(idx) => onAnswerDelete(idx)}
											value={answer.value}
										/>
									})}
								</Col>
							  </Row>
							  <Row style={{justifyContent: "flex-end", padding: "5px 15px 0 15px"}}>
									<Button variant="success" size="sm" style={{paddingRight: "16px", paddingLeft: "16px"}} onClick={onAddAnswer}>
										<FontAwesomeIcon className="no-stroke" icon={faPlusCircle} />
									</Button>
							  </Row>
							  <TextError center>{answersError}</TextError>
						  </Form.Group>
						  
						  <Form.Group>
							  <Row>
								<Col sm={3} className="form-label-col"><Form.Label>Tags</Form.Label></Col>
								<Col><Form.Control type="text" onChange={handleTagsChange}></Form.Control></Col>
							  </Row>
							  <TextError center>{descriptionError}</TextError>
						  </Form.Group>
					  </Col>
					  <Col className="rhs-user-page" style={{justifyContent: "flex-start"}}>
							<ListGroup className="rhs-user-page__user-list rhs-user-page__user-list--short" variant="flush" style={{marginBottom: "1rem"}}>
								{SURVEY_DEMO.map(survey => {
									return <ListGroup.Item 
											onClick={ () => handleSurveySelection(survey) }
											key={survey.id}
											active={!!survey.id && survey.id === selectedSurvey}
											action>
												{survey.title}
											</ListGroup.Item>
								})}
							</ListGroup>
							<Form.Group as={Row}>
								<Form.Label as="legend" column sm={2}>
									Type:
								</Form.Label>
								<Col sm={10}>
									<Form.Check
										type="radio"
										label="Multiple Choice"
										name="formHorizontalRadios"
										id="formHorizontalRadios2"
									/>
									<Form.Check
										type="radio"
										label="Single Choice"
										name="formHorizontalRadios"
										id="formHorizontalRadios3"
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label as="legend" column sm={2}>
									Send:
								</Form.Label>
								<Col sm={10} style={{display: "flex", alignItems: "center"}}>
									<Form.Check type="checkbox" label="  Immediately" />
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label as="legend" column sm={2}>
									Date:
								</Form.Label>
								<Col sm={10} style={{display: "flex", alignItems: "center"}}>
									<Form.Control type="datetime-local" id="example-datetime-local-input"/>
								</Col>
							</Form.Group>
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

export default Surveys;