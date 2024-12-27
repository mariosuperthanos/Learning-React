import Button from "../UI/Button";
import Card from "../UI/Card";
import Form from "./Form";

const ProductItem = ({ item }) => {
  return(
    <Card className={'card'}>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>${item.price}</p>
      <Form name={item.name} price={item.price}/>
    </Card>
  )
}

export default ProductItem;