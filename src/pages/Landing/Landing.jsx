import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faUser,
  faVideo,
  faClipboardList,
  faPoll, // Alternative to ClipboardList
  faListAlt, // Alternative to ClipboardList
} from "@fortawesome/free-solid-svg-icons";
import { authLogout } from "../../store/actions/authActions";

const Landing = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(authLogout());
  };

  const redirect = (path) => history.push(path);

  return (
	<>
	<Container className="container-centered">
	  <Row className="justify-content-center">
		<Col lg="8" md="10" sm="12" xs="12">
		  <div className="container--positioned container--bordered overflow-hidden">
			<section className="container-header border-bottom-1 text-center mb-3">
			  Select Operation
			</section>
			<section className="container-body pb-3">
				<Row style={{padding: "15px"}}>
					<Col><Button className="btn-block operation-button" onClick={()=>redirect('/users')}><FontAwesomeIcon icon={faUser} /> Users</Button></Col>
					<Col><Button className="btn-block operation-button" onClick={()=>redirect('/videos')}><FontAwesomeIcon icon={faVideo} /> Videos</Button></Col>
				</Row>
				<Row style={{padding: "20px 15px"}}>
					<Col><Button className="btn-block operation-button" onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} /> Logout</Button></Col>
					<Col><Button className="btn-block operation-button" onClick={()=>redirect('/surveys')}><FontAwesomeIcon icon={faClipboardList} /> Surveys</Button></Col>
				</Row>
			</section>
		  </div>
		</Col>
	  </Row>
	</Container>
  </>
  );
};

export default Landing;
