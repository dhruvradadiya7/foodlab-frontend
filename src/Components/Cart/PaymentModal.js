import { useEffect, useState } from "react";
import { Spinner, Button, Ratio, Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import AlertDismissible from "../shared/Alert";
import axios from "axios";
import { getUserId } from "../shared/utils";


const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
});


const PaymentModal = (props) => {

  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const submit = async (values) => {
    const uid = getUserId();
    const { totalamount, objectIds, afterCallback } = props;
    try {
      const result = await axios.post(
        "https://foodlab-server.herokuapp.com/profile/store-payment",
        { uid, values: { ...values, totalamount, objectIds } }
      );
      setMessage("Order made successfully!");
      setType("success");
      if (afterCallback) {
        afterCallback();
      }
    } catch (e) {
      console.log("Payment error", e);
      setMessage("Something went wrong, please try again!");
      setType("danger");
    } finally {
      setTimeout(() => {
        props.onHide()
      }, 2000)
    }
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pay Now
        </Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        onSubmit={submit}
        initialValues={{
          firstName: '',
          lastName: '',
          city: '',
          state: '',
          zip: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationFormik01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Lastname"
                    aria-describedby="inputGroupPrepend"
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormik02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Lastname"
                    aria-describedby="inputGroupPrepend"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationFormik03">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    isInvalid={!!errors.city}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik04">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    isInvalid={!!errors.state}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik05">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip"
                    name="zip"
                    value={values.zip}
                    onChange={handleChange}
                    isInvalid={!!errors.zip}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.zip}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
      <AlertDismissible open={!!message} onClose={() => setMessage('')} text={message} variant={type} />
    </Modal>
  );
}

export default PaymentModal;