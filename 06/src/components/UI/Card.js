import './Card.css';

// Card is a wrapper function wrap the JSX into a big div with a specific classname passed via props
function Card({ children, className }) {
  const classes = 'card ' + className;

  return (
    <div className={classes}>{children}</div>
  )
}

export default Card;