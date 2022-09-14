import Header from "../../shared/Header";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

import "./style.css";
import AlertDismissible from "../../shared/Alert";
import { useState } from "react";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required("Password is required").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
});

export const Register = (props) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const submit = async (values) => {
    try {
      console.log(values);
      const { data } = await axios.post(
        "https://foodlab-server.herokuapp.com/auth/register",
        values
      );
      
      localStorage.setItem("user", JSON.stringify(data));

      // Respond
      setMessage("User registered successfully!");
      setType("success");

      setTimeout(() => {
        setMessage("");
        props.history.push("/recipes");
      }, 1000);
    } catch (e) {
      console.log(e);
      // Respond
      setMessage(e?.response?.data || "Something went wrong, please try again!");
      setType("danger");
    }
  };

  return (
    <div className="register-container">
      <Header />
      <Card>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Formik
            validationSchema={schema}
            onSubmit={submit}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              passwordConfirmation: "",
              terms: false,
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
                <Form.Group as={Col} md="12" controlId="validationFormik01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    aria-describedby="inputGroupPrepend"
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationFormik02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    aria-describedby="inputGroupPrepend"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationFormikemail">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="email"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationFormik03">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationFormik03">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="passwordConfirmation"
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    isInvalid={!!errors.passwordConfirmation}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.passwordConfirmation}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    name="terms"
                    label="Agree to terms and conditions"
                    onChange={handleChange}
                    isInvalid={!!errors.terms}
                    feedback={errors.terms}
                    id="validationFormik0"
                  />
                </Form.Group>
                <div className="register-footer">
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                  <Card.Text>
                    <Link className="register_cna-link" to="/login">
                      Already have an account?
                    </Link>
                  </Card.Text>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
      <AlertDismissible
        open={message}
        onClose={() => setMessage("")}
        text={message}
        variant={type}
      />
    </div>
  );
};

export default Register;
