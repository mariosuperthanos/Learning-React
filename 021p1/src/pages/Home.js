import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('products');
  }

  return (
  <Fragment>
    <h1>My Home Page</h1>
    <p>Go to <Link to="products">the list of products</Link></p>
    <p>
      <button onClick={navigateHandler}>Navigate</button>
    </p>
  </Fragment>
  );
}

export default HomePage;