import { useState } from "react";

import styles from './AllForms.module.css'

const AllForms = ({onSubmitHandler, onResetHandler}) => {
  const [formsData, setFormsData] = useState({})

  const submitHandler = (e) =>{
    e.preventDefault();
    onSubmitHandler(formsData);
  }

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.id;
    setFormsData((prev) => {
      return {...prev, [name]: value}
    })
  }

  const resetState = () => {
    onResetHandler();
    setFormsData('');
  }

  return (
    <form onSubmit={(formsData && Object.keys(formsData).length > 0 )? submitHandler : (e) => e.preventDefault()} className={styles['form']}>
      <div className={styles['input-group']}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input type="number" value={formsData["current-savings"]} onChange={onChangeHandler} id="current-savings" />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input type="number" value={formsData["yearly-contribution"]} onChange={onChangeHandler} id="yearly-contribution" />
        </p>
      </div>
      <div className={styles['input-group']}>
        <p>
          <label htmlFor="expected-return">Expected Interest (%, per year)</label>
          <input type="number" value={formsData["expected-return"]}onChange={onChangeHandler} id="expected-return" />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input type="number" value={formsData['duration']} onChange={onChangeHandler} id="duration" />
        </p>
      </div>
        <p className={styles['actions']}>
          <button onClick={(formsData && Object.keys(formsData).length > 0 ) ? resetState : (e) => e.preventDefault()} type="reset" className={styles['buttonAlt']}>
            Reset
          </button>
          <button type="submit" className={styles['button']}>
            Calculate
          </button>
        </p>
    </form>
  )
}

export default AllForms;