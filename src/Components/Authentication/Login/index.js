import Header from "../../shared/Header";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

import "./style.css";
import { useState } from "react";
import AlertDismissible from "../../shared/Alert";
import { isAdmin } from "../../shared/utils";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const Login = (props) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const submit = async (values) => {
    try {
      const { data } = await axios.post(
        "https://foodlab-server.herokuapp.com/auth/login",
        values
      );
      localStorage.setItem("user", JSON.stringify(data));

      // Respond
      setMessage("User logged-in successfully!");
      setType("success");
      setTimeout(() => {
        setMessage("");
        props.history.push(isAdmin() ? "/admin/recipes" : "/recipes");
      }, 1000);
    } catch (e) {
      console.log(e);
      // Respond
      setMessage(e?.response?.data || "Something went wrong, please try again!");
      setType("danger");
    }
  };

  return (
    <div className="login-container">
      <Header />
      <Card>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Formik
            validationSchema={schema}
            onSubmit={submit}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationFormikemail"
                  >
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="email"
                        aria-describedby="inputGroupPrepend"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
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
                </Row>
                <div className="login-footer">
                  <Button variant="success" type="submit">
                    Login
                  </Button>
                  <Card.Text>
                    <Link className="login_cna-link" to="/register">
                      Create new account
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

export default Login;
