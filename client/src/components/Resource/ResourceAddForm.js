import React, { useState } from "react";
import domain from "../../config";
// import "../../css/AdminResources.css";
import { Form,Button,Col,Row } from "react-bootstrap";

const ResourceAddForm = ({ addResource, setShowAdd }) => {
  const emptyResource = {
    name: "",
    description: "",
    website: "",
  };
  const [newResource, setNewResource] = useState(emptyResource);

  const handlerAddnewResource = (event) => {
    const addResource = {
      ...newResource,
      [event.target.name]: event.target.value,
    };
    setNewResource(addResource);
  };

  const handlerAddResourceSubmit = (e) => {
    e.preventDefault();

    fetch(`${domain}/api/resources`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newResource),
    })
      .then((res) => res.json())
      .then((data) => addResource(data.resource));

    setNewResource(emptyResource);
  };

  return (
    <Form className="mt-3 mb-3 bg-secondary">
      <Row className="p-3">
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="name"
              value={newResource.name}
              onChange={handlerAddnewResource}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Website</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="website"
              value={newResource.website}
              onChange={handlerAddnewResource}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="p-3">
        <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              className="form-control"
              type="text"
              name="description"
              value={newResource.description}
              onChange={handlerAddnewResource}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="p-3">
        <Col>
          <Button
            onClick={handlerAddResourceSubmit}
            type="submit"
            className="text-center"
            size="lg"
            block
          >
            add resource
          </Button>
        </Col>
      </Row>
      <Row className="p-3">
        <Col>
          <Button
            className="text-center"
            block
            size="lg"
            onClick={() => {
              setShowAdd(false);
            }}
            variant="info"
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ResourceAddForm;
