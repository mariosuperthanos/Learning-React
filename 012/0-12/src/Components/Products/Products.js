import ProductItem from "./ProductItem";
import Card from "../UI/Card";

const Products = ({ data }) => {
  return(
    <Card className={'card'}>
      {data.map((element,index) => (
        <ProductItem key={index} item={element} />
      ))}
    </Card>
  )
} 

export default Products;