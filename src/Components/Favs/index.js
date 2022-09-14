import Header from '../shared/Header'
import { Spinner } from 'react-bootstrap';
import './style.css'

import RecipeCard from '../Recipes/RecipeCard';
import { useEffect, useState } from 'react';
import { getUserId } from '../shared/utils';
import axios from 'axios';


const Recipes = () => {
    const [favorites, setFavorites] = useState([]);
    const [cartIds, setCartIds] = useState([]);
    const [loading, setLoading] = useState(false);


    const getFav = async () => {
        setLoading(true)
        try {
            const uid = getUserId();
            const { data: { cart, favorites } } = await axios.get(`https://foodlab-server.herokuapp.com/profile/all?uid=${uid}`);
            setCartIds(cart);
            if (favorites) {
                const { data } = await axios.get(`https://foodlab-server.herokuapp.com/recipes/fetch-by-id?ids=${favorites}`);
                setFavorites(Object.values(data));
            } else {
                setFavorites([])
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getFav();
    }, []);
    return (
        <div className="recipes_container">
            <Header />
            <div className="recipes-header">
                <h1>My Favorites</h1>
            </div>
            {loading ? <div className="recipe_listing-loading"><Spinner animation="grow" /></div> :
                <div className="recipes_listing">
                    {favorites.length > 0 ? favorites.map((recipe) =>
                        <RecipeCard title={recipe.name} img={recipe.thumbImg} id={recipe.mId} key={recipe.mId} recipe={recipe} favoriteAdded={true} cartAdded={cartIds.includes(recipe.mId)} favCallback={() => getFav()} />
                    ) : <h4 className="error-text">No recipes added into your favorites list!</h4>}
                </div>
            }
        </div>
    )
}

export default Recipes;