const filterData = (userInput) => {
  // Should be triggered when form is submitted
  // You might not directly want to bind it to the submit event on the form though...

  const yearlyData = []; // per-year results

  let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
  const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
  const expectedReturn = +userInput['expected-return'] / 100;
  let total = currentSavings;
  const duration = +userInput['duration'];

  let totalInterestGained = 0;

  // The below code calculates yearly results (total savings, interest etc)
  for (let i = 0; i < duration; i++) {
    total+=yearlyContribution;
    const yearlyInterest = currentSavings * expectedReturn;
    currentSavings += yearlyInterest + yearlyContribution;
    totalInterestGained += yearlyInterest;

    yearlyData.push({
      // feel free to change the shape of the data pushed to the array!
      year: i + 1,
      yearlyInterest: Math.round(yearlyInterest * 100) / 100, // Round yearly interest
      savingsEndOfYear: Math.round(currentSavings * 100) / 100, // Round total savings
      yearlyContribution: Math.round(total * 100) / 100, // Round yearly contribution
      totalInterestGained: Math.round(totalInterestGained * 100) / 100 // Round total interest gained
    });
  }
  // console.log(yearlyData);
  return yearlyData;
}

export default filterData;