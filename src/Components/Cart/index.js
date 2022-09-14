import Header from '../shared/Header'
import './style.css'

import RecipeCard from '../Recipes/RecipeCard';
import { Card, Button, Spinner } from 'react-bootstrap';
import PaymentModal from './PaymentModal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from '../shared/utils';


const Recipes = () => {
    const [show, setShow] = useState(false);
    const [cart, setCart] = useState([]);
    const [favoritesIds, setFavoritesId] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCart = async () => {
        setLoading(true)
        try {
            const uid = getUserId();
            const { data: { cart = '', favorites = '' } } = await axios.get(`https://foodlab-server.herokuapp.com/profile/all?uid=${uid}`);
            setFavoritesId(favorites);
            if (cart) {
                const { data } = await axios.get(`https://foodlab-server.herokuapp.com/recipes/fetch-by-id?ids=${cart}`);
                setCart(Object.values(data));
            } else {
                setCart([])
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
        getCart();
    }, []);

    let totalamount = 0;
    if(cart?.length){
        cart.forEach(e => totalamount += e.price);
    }
    const objIds = cart.map(e => e.mId);
    return (
        <div className="recipes_container">
            <Header />
            <div className="recipes-header">
                <h1>My Cart</h1>
            </div>
            {loading ? <div className="recipe_listing-loading"><Spinner animation="grow" /></div> :
                <div className="recipes_listing-wrapper">
                    <div className="recipes_listing recipes-cart_listing">
                        {cart.length > 0 ? cart.map((recipe) =>
                            <RecipeCard title={recipe.name} img={recipe.thumbImg} id={recipe.mId} key={recipe.mId} recipe={recipe} cartAdded={true} favoriteAdded={favoritesIds.includes(recipe.mId)} cartCallback={() => getCart()} />
                        ) : <h4 className="error-text">No recipes added into your cart!</h4>}
                    </div>
                    <Card className="cart-checkout_card">
                        <div>
                            <h4>Cart Items</h4>
                            <div>
                                {cart.length > 0 ? (<>
                                    {cart.map(({ thumbImg, name, mId, price }) =>
                                        <div key={mId} className="cart-checkout_row">
                                            <div className="cart-checkout_row-left">
                                                <img src={thumbImg} alt={name} />
                                                <p>{name}</p>
                                            </div>
                                            <h3>${price.toFixed(2)}</h3>
                                        </div>
                                    )}
                                    <div className="cart-checkout_row total">
                                        <h2>Total price : </h2>
                                        <h3>${totalamount.toFixed(2)}</h3>
                                    </div>
                                </>) : <h4 className="error-text">No recipes found!</h4>}
                            </div>
                        </div>
                        <Button className="cart-checkout_pay-now-btn" variant="success" onClick={() => setShow(true)}>Pay Now</Button>
                    </Card>
                </div>
            }
            <PaymentModal onHide={() => setShow(false)} show={show} totalamount={totalamount} objectIds={objIds} afterCallback={getCart} />
        </div>
    )
}

export default Recipes;