import { Button, Ratio, Badge } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

import './RecipeDetailCard.css';

const RecipeDetailCard = ({ id, show, title, handleProfileUpdate, fav, cart, recipe = {}, ...props }) => {

    const tags = recipe.tags?.split(',') || [];
    const ingredients = recipe.ingredients?.split(',') || [];
    const measure = recipe.measure?.split(',') || [];
    const tutorialCode = recipe.youtube ? recipe.youtube.replace('https://www.youtube.com/watch?v=', '') : null;
    return (
        <Modal
            {...props}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="recipe-detail_modal-card"
        >
            <Modal.Body className="recipe-detail-card_body">
                <div className="recipe-detail-card_content">
                    <div className="recipe-detail-card_content-info">
                        <div className="recipe-detail-card_header">
                            <div>
                                <h4>{title}</h4>
                                {tags.length ? <div className="recipe-detail-card_tags">{tags.map(e => <Badge bg="dark" key={e}>{e}</Badge>)}</div> : ''}
                            </div>
                            <h3 className="recipe-detail-card_price">${recipe?.price}</h3>
                        </div>
                        <h6 className="recipe-detail_title">Ingredients :</h6>
                        <div className="recipe-detail-card_ingredients">
                            {ingredients.map((e, i) => <p key={e}>{e} <span className="recipe-detail-card_measure">( {measure[i]} )</span><span className="divider">,</span></p>)}
                        </div>
                        <h6 className="recipe-detail_title">Preparation :</h6>
                        <p>
                            {recipe?.instructions}
                        </p>
                        {tutorialCode && <><h6 className="recipe-detail_title">Tutorial :</h6>
                            <Ratio aspectRatio="16x9">
                                <iframe src={`https://www.youtube.com/embed/${tutorialCode}?controls=0`} X-Frame-Options="cross-origin" title="video" />
                            </Ratio>
                        </>}
                    </div>
                    <img src={recipe.thumbImg} alt={title} className="recipe-detail-card_content-img" />
                    <div className="recipe-detail_action-btn">
                        <Button variant="danger" className="action-button" onClick={e => handleProfileUpdate('favorites', id)}><i className={`bi bi-heart${fav ? '-fill' : ''}`}></i>{fav ? 'Added' : 'Add'} to favorite</Button>
                        <Button variant="success" className="action-button" onClick={e => handleProfileUpdate('cart', id)}><i className={`bi bi-cart${cart ? '-fill' : ''}`}></i>{cart ? 'Added' : 'Add'} to cart</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RecipeDetailCard;