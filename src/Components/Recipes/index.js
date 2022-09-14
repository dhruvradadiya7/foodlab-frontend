import Header from '../shared/Header'
import './style.css'

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Spinner from 'react-bootstrap/Spinner';

import { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import axios from 'axios';
import { getUserId } from '../shared/utils';


const Recipes = () => {
    // current selected filters
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    // filtered recipes
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    // user data
    const [favoritesIds, setFavoritesId] = useState('');
    const [cartIds, setCartIds] = useState('');


    const getRecipes = async (query) => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                "https://foodlab-server.herokuapp.com/recipes/fetch-all"
            );
            setRecipes(Object.values(data) || []);
        } catch (e) {
            console.log("ERROR", e)
        } finally {
            setLoading(false);
        }
    }

    const getUserData = async () => {
        const uid = getUserId();
        if (uid) {
            const { data: { cart = '', favorites = '' } } = await axios.get(`https://foodlab-server.herokuapp.com/profile/all?uid=${uid}`);
            setFavoritesId(favorites);
            setCartIds(cart);
        }
    }
    useEffect(() => {
        getRecipes();
        getUserData();
    }, [])

    // on filter updates
    useEffect(() => {
        console.log(selectedCategory, selectedIngredient, selectedArea);
        if (selectedArea || selectedCategory || selectedIngredient) {
            const updatedRecipe = recipes.filter(e => (selectedIngredient && e.ingredients.includes(selectedIngredient)) || (selectedArea && e.area.includes(selectedArea)) || (selectedCategory && e.category.includes(selectedCategory)))
            console.log(updatedRecipe);
            setFilteredRecipes(updatedRecipe);
        } else {
            setFilteredRecipes([])
        }
    }, [selectedCategory, selectedIngredient, selectedArea])

    const recipesData = (selectedIngredient || selectedCategory || selectedArea) ? filteredRecipes : recipes;
    return (
        <div className="recipes_container">
            <Header />
            <div className="recipes-header">
                <h1>Recipes</h1>
                <div className="recipes-filter_box">
                    <FloatingLabel controlId="floatingSelectGrid" label="Recipes by category">
                        <Form.Control placeholder="enter here..." type="text" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                        </Form.Control>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingSelectGrid" label="Recipes by ingredient">
                        <Form.Control placeholder="enter here..." type="text" onChange={(e) => setSelectedIngredient(e.target.value)} value={selectedIngredient}>
                        </Form.Control>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingSelectGrid" label="Recipes by area">
                        <Form.Control placeholder="enter here..." type="text" onChange={(e) => setSelectedArea(e.target.value)} value={selectedArea}>
                        </Form.Control>
                    </FloatingLabel>
                </div>
            </div>
            <div className="recipes_listing">
                {loading ?
                    <Spinner animation="grow" /> :
                    recipesData.length > 0 ? recipesData.map((recipe) =>
                        <RecipeCard title={recipe.name} img={recipe.thumbImg} id={recipe.mId} key={recipe.mId} recipe={recipe} favoriteAdded={favoritesIds.includes(recipe.mId)} cartAdded={cartIds.includes(recipe.mId)} />
                    ) : <h4 className="error-text">No recipes found for selected filters!</h4>
                }
            </div>
        </div>
    )
}

export default Recipes;