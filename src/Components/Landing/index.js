import * as yup from 'yup';
import { Formik } from "formik";

import Header from '../shared/Header'
import './style.css'
import axios from 'axios'
import { useState } from 'react'

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

import AlertDismissible from "../shared/Alert";

const schema = yup.object().shape({
    email: yup.string().email('Must be valid email!').required('Email is required!'),
});


const Landing = () => {

    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');
    const submitMail = async ({ email }, { resetForm }) => {
        try {
            await axios.post("https://foodlab-server.herokuapp.com/others/mail-list", { email });
            setMessage("Email added into mail list successfully!");
            setType('success');
            resetForm();
        } catch (e) {
            setMessage("Something went wrong, please try again!");
            setType('danger');
        }
    }



    return (
        <div className="landing-hero_container">
            <Header />
            <div className="landing-hero row">
                <div className="landing-hero_title-box col-8">
                    <h2>Hi,</h2>
                    <h4>Browse various receipes, learn to prepare easily and order ingeridents you need at your door. <img src="https://emojipedia-us.s3.amazonaws.com:443/source/skype/289/smiling-face-with-heart-eyes_1f60d.png" srcSet="https://emojipedia-us.s3.amazonaws.com:443/source/skype/289/smiling-face-with-heart-eyes_1f60d.png 2x" alt="Smiling Face with Heart-Eyes" title="Smiling Face with Heart-Eyes" width="72" height="72"></img></h4>
                    <div className="landing-hero_join-mail">
                        <h3>Join our mailist for new receipe updates</h3>
                        <Formik
                            validationSchema={schema}
                            onSubmit={submitMail}
                            initialValues={{
                                email: "",
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                touched,
                                errors,
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group as={Col} md="12" controlId="validationFormikemail">
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                type="text"
                                                placeholder="Your email"
                                                aria-describedby="inputGroupPrepend"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                isValid={touched.email && !errors.email}
                                                isInvalid={!!errors.email}
                                            />
                                            <Button variant="dark" type="submit">
                                                Join Now
                                            </Button>
                                            <Form.Control.Feedback type="valid">
                                                Looks good!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <AlertDismissible
                        open={message}
                        onClose={() => setMessage("")}
                        text={message}
                        variant={type}
                    />
                </div>
            </div>
        </div>
    )
}
export default Landing;