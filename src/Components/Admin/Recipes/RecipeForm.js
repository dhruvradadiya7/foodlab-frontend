import { Link } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./style.css";
import { Row } from "react-bootstrap";

const schema = yup.object().shape({
  area: yup.string().required(),
  category: yup.string().required(),
  ingredients: yup.string().required(),
  instructions: yup.string().required(),
  mId: yup.string(),
  measure: yup.string(),
  name: yup.string().required(),
  price: yup.number().required(),
  tags: yup.string(),
  thumbImg: yup.string().required(),
  youtube: yup.string(),
});

export const RecipeForm = ({ show, handleClose, initialValue, refetchData, setMessage, setType }) => { 
  const submit = async (values) => {
    try {
      const final = {
        mId:
          values.mId === ""
            ? ((Math.random() * (99999 - 53063) + 53063) * 1).toFixed(0)
            : values.mId,
        name: values.name,
        area: values.area,
        category: values.category,
        thumbImg: values.thumbImg,
        instructions: values.instructions,
        ingredients: values.ingredients,
        measure: values.measure,
        youtube: values.youtube,
        tags: values.tags,
        source: "",
        price: values.price,
      };

      const result = await axios.post(
        "https://foodlab-server.herokuapp.com/recipes/store-recipe",
        { id: final.mId, data: final }
      );
      // Respond
      setMessage(
        values.mId === ""
          ? "Recipe stored successfully!"
          : "Recipe updated successfully!"
      );
      setType("success");
      handleClose();
      refetchData();
    } catch (e) {
      console.log(e);
      setMessage("Recipe store failed, please try again!");
      setType("danger");
    }
  };
  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={submit}
        enableReinitialize={true}
        initialValues={{
          name: initialValue?.name || "",
          ingredients: "",
          measure: "",
          instructions: "",
          price: 0,
          category: "",
          area: "",
          tags: "",
          thumbImg: "",
          youtube: "",
          mId: "",
          ...initialValue,
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
          <Modal
            show={!!show}
            onHide={handleClose}
            className="recipe-form_body"
            backdrop="static"
            keyboard={false}
          >
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <h4>
                  {typeof show === "boolean"
                    ? "Add New Recipe"
                    : `Edit Recipe #${show}`}
                </h4>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationFormik01">
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Recipe Name"
                      aria-describedby="inputGroupPrepend"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik01">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control
                      type="text"
                      name="ingredients"
                      placeholder="Ingredients"
                      aria-describedby="inputGroupPrepend"
                      value={values.ingredients}
                      onChange={handleChange}
                      isValid={touched.ingredients && !errors.ingredients}
                      isInvalid={!!errors.ingredients}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ingredients}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik01">
                    <Form.Label>Measure</Form.Label>
                    <Form.Control
                      type="text"
                      name="measure"
                      placeholder="Measure"
                      aria-describedby="inputGroupPrepend"
                      value={values.measure}
                      onChange={handleChange}
                      isValid={touched.measure && !errors.measure}
                      isInvalid={!!errors.measure}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.measure}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="validationFormik01">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="instructions"
                      rows={4}
                      type="text"
                      placeholder="Instructions"
                      aria-describedby="inputGroupPrepend"
                      value={values.instructions}
                      onChange={handleChange}
                      isValid={touched.instructions && !errors.instructions}
                      isInvalid={!!errors.instructions}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.instructions}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      placeholder="Price"
                      aria-describedby="inputGroupPrepend"
                      value={values.price}
                      onChange={handleChange}
                      isValid={touched.price && !errors.price}
                      isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      placeholder="Category"
                      aria-describedby="inputGroupPrepend"
                      value={values.category}
                      onChange={handleChange}
                      isValid={touched.category && !errors.category}
                      isInvalid={!!errors.category}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.category}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Area</Form.Label>
                    <Form.Control
                      type="text"
                      name="area"
                      placeholder="Area"
                      aria-describedby="inputGroupPrepend"
                      value={values.area}
                      onChange={handleChange}
                      isValid={touched.area && !errors.area}
                      isInvalid={!!errors.area}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.area}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="validationFormik01">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                      type="text"
                      name="tags"
                      placeholder="Tags"
                      aria-describedby="inputGroupPrepend"
                      value={values.tags}
                      onChange={handleChange}
                      isValid={touched.tags && !errors.tags}
                      isInvalid={!!errors.tags}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.tags}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik01">
                    <Form.Label>Thumbnail Image</Form.Label>
                    <Form.Control
                      type="text"
                      name="thumbImg"
                      placeholder="Thumbnail Image"
                      aria-describedby="inputGroupPrepend"
                      value={values.thumbImg}
                      onChange={handleChange}
                      isValid={touched.thumbImg && !errors.thumbImg}
                      isInvalid={!!errors.thumbImg}
                    />
                    <Form.Control.Feedback type="invalid">
                      thumbnail image is required field
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik01">
                    <Form.Label>Youtube Source</Form.Label>
                    <Form.Control
                      type="text"
                      name="youtube"
                      placeholder="Youtube URL"
                      aria-describedby="inputGroupPrepend"
                      value={values.youtube}
                      onChange={handleChange}
                      isValid={touched.youtube && !errors.youtube}
                      isInvalid={!!errors.youtube}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.youtube}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        )}
      </Formik>
    </>
  );
};
