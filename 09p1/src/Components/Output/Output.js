import Tabel from "./tabel";

import styles from './Output.module.css'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 
})

const PrintData = ({ data }) => {
  return (
    <table className={styles['result']}>
      <Tabel />
      <tbody>
        {data.map((element) => (
          <tr key={element.year}>
            <td>{element.year}</td>
            <td>{formatter.format(element.savingsEndOfYear)}</td>
            <td>{formatter.format(element.yearlyInterest)}</td>
            <td>{formatter.format(element.totalInterestGained)}</td>
            <td>{formatter.format(element.yearlyContribution)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PrintData;
