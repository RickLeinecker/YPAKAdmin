import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Row } from 'react-bootstrap';


const SurveyAnswer = ({ id, index, value, onChange, onDelete, placeholder = "Enter an answer value", deleteable = false, hasError = undefined }) => {
	const style = index === 0 ? { marginTop: '0' } : {};
	return (<>
		<Row style={style} className="answer-wrapper">
			<Col>
				<Form.Control
					className="answer-input"
					type="text"
					placeholder={placeholder}
					name={`answer-${id}`}
					onChange={(e) => onChange(index, e.target.value)}
					value={value}>
				</Form.Control>
				{deleteable ?
					<span className='answer-remove' onClick={() => onDelete(index)}>
						<FontAwesomeIcon icon={faMinusCircle} />
					</span>
					: undefined}
			</Col>
		</Row>
		</>
	)
}

export default SurveyAnswer;