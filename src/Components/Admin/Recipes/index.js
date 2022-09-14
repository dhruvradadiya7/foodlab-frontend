import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import AlertDismissible from "../../shared/Alert";

import Header from "../../shared/Header";
import { RecipeForm } from "./RecipeForm";
import "./style.css";

export const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const fetchRecipes = async () => {
    try {
      const { data } = await axios.get(
        "https://foodlab-server.herokuapp.com/recipes/fetch-all"
      );
      setRecipes(data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const result = await axios.post(
        "https://foodlab-server.herokuapp.com/recipes/store-recipe",
        { id: id, data: null }
      );
      setMessage("Recipe deleted successfully!");
      setType("success");
      fetchRecipes();
    }
    catch(e){
      console.log(e);
      setMessage("Recipe delete failed, please try again!");
      setType("danger");
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="manage-recipes_container">
      <Header />
      <RecipeForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        initialValue={typeof show === "boolean" ? {} : recipes[showForm]}
        refetchData={() => fetchRecipes()}
        setMessage={setMessage}
        setType={setType}
      />
      <div className="manage-recipes_content">
        <div className="manage-recipes_header">
          <h1 className="admin-heading">Manage Recipes</h1>
          <Button variant="outline-success" onClick={() => setShowForm(true)}>
            <i className="bi bi-plus-circle" style={{ marginRight: "5px" }}></i>
            Add New Recipe
          </Button>
        </div>
        <Table striped bordered hover className="manage-recipe_table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Area</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(recipes).map((recipe) => (
              <tr key={recipe.mId}>
                <td>{recipe.mId}</td>
                <td>{recipe.name}</td>
                <td>{recipe.area}</td>
                <td>{recipe.category}</td>
                <td>${recipe.price}</td>
                <td>
                  <Button
                    variant="success"
                    style={{ marginRight: "10px" }}
                    onClick={() => setShowForm(recipe.mId)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                  <Button variant="danger" onClick={() => deleteRecipe(recipe.mId)}>
                    <i className="bi bi-trash2-fill"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <AlertDismissible
        open={message}
        onClose={() => setMessage("")}
        text={message}
        variant={type}
      />
    </div>
  );
};
