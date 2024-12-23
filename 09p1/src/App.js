import { useState } from 'react';
import Header from './Components/Header';
import filterData from './helperFunctions/filterData.js';
import PrintData from './Components/Output/Output.js';
import AllForms from './Components/Forms/AllForms.js';

function App() {
  const [output, setOutput] = useState([]);

  const onSubmitHandler = (formsData) => {
    const filteredData = filterData(formsData);
    setOutput(filteredData);
  }
  console.log(output);

  const onResetHandler = () => {
    setOutput({});
  }
  
  return (
    <div>
      <Header />

      <AllForms onSubmitHandler={onSubmitHandler}  onResetHandler={onResetHandler}/>

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}

      {/* this table is rannded conditionally */}
      {output && Object.keys(output).length > 0 ? <PrintData data={output} /> : <p className='special'>Input some data!</p>}

      {/* <PrintData data={output} /> */}
    </div>
  );
}

export default App;
