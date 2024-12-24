import styles from './Card.module.css'

const Card = ({ children, className }) => {
  // wrapper component
  return <div className={`${styles['card']} ${className}`}>{children}</div>
}

export default Card;