import axios from "axios";
import { useEffect, useState } from "react"
import { Card, Spinner } from "react-bootstrap";
import RecipeCard from "../Recipes/RecipeCard";
import Header from "../shared/Header";
import { getUserId } from "../shared/utils";

// Styles
import './style.css';

const OrderCard = ({ order, favoriteIds, cartIds }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        setLoading(true);
        try {
            if (order?.objectIds?.length) {
                const { data } = await axios.get(`https://foodlab-server.herokuapp.com/recipes/fetch-by-id?ids=${order?.objectIds.join(',')}`);
                setRecipes(Object.values(data));
            } else {
                setRecipes([])
            }
        } finally {
            setLoading(false);
        }
    }, [order?.objectIds])

    return (
        <Card className="profile-orders_card">
            <div className="profile-orders_card-header">
                <h3><b>Ordered for</b>: {order?.city} {order?.state} {order?.zip}</h3>
                <p>${order?.totalamount ? order.totalamount.toFixed(2) : 0}</p>
            </div>
            <div className="recipes_listing">
                {loading ?
                    <Spinner animation="grow" /> :
                    recipes.length > 0 ? recipes.map((recipe) =>
                        <RecipeCard title={recipe.name} img={recipe.thumbImg} id={recipe.mId} key={recipe.mId} recipe={recipe} favoriteAdded={favoriteIds.includes(recipe.mId)} cartAdded={cartIds.includes(recipe.mId)} />
                    ) : <h4 className="error-text">No recipes found for selected filters!</h4>
                }
            </div>
        </Card>
    )
}


const Profile = (props) => {
    const [profile, setProfile] = useState({});

    const getUserData = async () => {
        const uid = getUserId();
        const { data } = await axios.get(`https://foodlab-server.herokuapp.com/profile/all?uid=${uid}`);
        setProfile(data);
    }

    useEffect(() => {
        getUserData();
    }, []);


    const orders = profile?.orders?.length ? profile.orders.filter(e => e) : [];

    return (
        <div className="profile_container">
            <Header />
            <div className="profile-header">
                <h1>My Profile</h1>
            </div>
            <Card className="profile-info_card">
                <div className="row">
                    <div className="col">
                        <h2>Firstname :</h2>
                        <p>{profile.firstName}</p>
                    </div>
                    <div className="col">
                        <h2>Lastname :</h2>
                        <p>{profile.lastName}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h2>Email :</h2>
                        <p>{profile.email}</p>
                    </div>
                </div>
            </Card>
            <div className="profile-sub-header">
                <h1>My Orders</h1>
            </div>
            {orders.map((order, index) => <OrderCard order={order} key={index} favoriteIds={profile?.favorites} cartIds={profile?.cart} />)}
        </div>
    )

}

export default Profile;