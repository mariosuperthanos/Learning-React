import classes from './Card.module.css'

const Card = ({ className, children}) => {
  return(
    <div className={classes[className]}>{children}</div>
  )
}



export default Card;