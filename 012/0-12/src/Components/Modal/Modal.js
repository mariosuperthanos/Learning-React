import React, { useContext } from 'react';
import Card from '../UI/Card'
import classes from './Modal.module.css'
import ReactDOM from 'react-dom';
import { FoodData } from '../ModalDataContext';
import Button from '../UI/Button';
import CartProduct from './CartProduct';

const Modal = ({ onClose }) => {
  const data = useContext(FoodData).foodList;

  const totalAmount = data.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const filteredList = data.filter(item => item.quantity !== 0);

  return ReactDOM.createPortal(
    <React.Fragment>
    <div className={classes.overlay} onClick={onClose}></div>
      <Card className='modal'>
        {filteredList.map((element, index) => {
          return (
            <CartProduct key={index} product={element} index={index}/>
          );
        })}
        <p>Total Amount       ${totalAmount}</p>
        <Button className='button' text='Close' onClick={onClose} />
      </Card>
    </React.Fragment>
  , document.getElementById('portal'));
}

export default Modal;