import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { getUserId } from '../shared/utils';
import './recipeCard.css';
import RecipeDetailCard from './RecipeDetailCard';

const RecipeCard = ({ title, img, id, recipe, cartAdded, favoriteAdded, cartCallback, favCallback }) => {
    const [cart, setCart] = useState(cartAdded);
    const [fav, setFav] = useState(favoriteAdded);
    const [showDetail, setDetailCard] = useState(false);

    useEffect(() => {
        setCart(cartAdded);
        setFav(favoriteAdded);
    }, [cartAdded, favoriteAdded]);
    /* const updateActionFromStorage = () => {
        const favItems = JSON.parse(localStorage.getItem('favItems')) || [];
        const foundFavIndex = favItems.findIndex(d => d.idMeal === id);
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const foundCartIndex = cartItems.findIndex(d => d.idMeal === id);
        setFav(foundFavIndex !== -1);
        setCart(foundCartIndex !== -1);
    }

    useEffect(() => {
        updateActionFromStorage();
    }, []) */

    const handleProfileUpdate = async (type, id) => {
        try {
            const uid = getUserId();
            await axios.post(`https://foodlab-server.herokuapp.com/profile/${type}`, { uid, id });
            if (type === 'cart') {
                setCart(!cart)
                cartCallback && cartCallback();
            }
            if (type === 'favorites') {
                setFav(!fav)
                favCallback && favCallback();
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Card className="bg-dark text-white">
            <Card.Img src={img} alt={title} />
            <Card.ImgOverlay onClick={() => setDetailCard(true)}>
                <div className="recipe_card-short-actions">
                    <i className={`bi bi-heart${fav ? '-fill' : ''} fav`} onClick={e => { e.preventDefault(); e.stopPropagation(); handleProfileUpdate('favorites', id) }}></i>
                    <i className={`bi bi-cart${cart ? '-fill' : ''} cart`} onClick={e => { e.preventDefault(); e.stopPropagation(); handleProfileUpdate('cart', id) }}></i>
                </div>
                <Card.Title>{title}</Card.Title>
                <h3 className="recipe_card-price-box">${recipe.price?.toFixed(2)}</h3>
            </Card.ImgOverlay>

            <RecipeDetailCard id={id} show={showDetail} recipe={recipe} onHide={() => setDetailCard(false)} title={title} handleProfileUpdate={handleProfileUpdate} fav={fav} cart={cart} />
        </Card>
    )
}

export default RecipeCard;