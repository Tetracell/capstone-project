//Dependencies
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewRequestForm.css";

//Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// API
const API = process.env.REACT_APP_BACKEND_API_KEY;

const NewRequestForm = ({ applicationUser }) => {
  let navigate = useNavigate();

  // CREATE OR ADD A NEW REQUEST
  const makeRequest = (newRequest) => {
    axios
      .post(`${API}/requests`, {
        ...newRequest,
        elder_id: applicationUser.uuid,
      })
      .then(
        () => {
          navigate("/user-dashboard");
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const [request, setRequest] = useState({
    elder_id: "",
    title: "",
    req_date: "",
    description: "",
    location: "",
    time: "",
    image: "",
  });

  // text change method
  const textChange = (e) => {
    setRequest({ ...request, [e.target.id]: e.target.value });
  };

  // submit method
  const handleSubmit = (e) => {
    e.preventDefault();
    makeRequest(request);
  };

  return (
    <div className="new-req">
      <div className="request-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="I need..."
              id="title"
              value={request.title}
              onChange={textChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Request Date</Form.Label>
            <Form.Control
              type="date"
              id="req_date"
              value={request.req_date}
              onChange={textChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="description"
              placeholder="Tell us what you need..."
              value={request.description}
              onChange={textChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              id="location"
              placeholder="location"
              value={request.location}
              onChange={textChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              id="time"
              placeholder="2pm"
              value={request.time}
              onChange={textChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              id="image"
              value={request.image}
              onChange={textChange}
            />
          </Form.Group>
          <div className="form-button">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewRequestForm;
