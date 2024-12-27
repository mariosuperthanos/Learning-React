import classes from './Button.module.css'
import CartIcon from './CartIcon';

const Button = ({ className, text, val=null, onClick }) => {
  return(
    <button className={`${classes[className]}`} onClick={onClick}>
      {val !== null && <CartIcon className={classes.icon}/>}
      {text} {val !== null && <span className={classes.badge}>{val}</span>}

    </button>
  )
}

export default Button;