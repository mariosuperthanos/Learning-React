import { useState } from "react"

const useHTTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequestes = async (config, apply) => {
    try{
      setIsLoading(true);

      if(config.test !== true){
        const response = await fetch(config.url, {
          method: config.method || 'GET',
          body: config.body ? JSON.stringify(config.body) : undefined,
          headers: {
            'Content-Type': 'application/json', 
          }
        })
  
        if(!response.ok){
          setError('Something went wrong');
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        // console.log(data);
        apply(data);
        setIsLoading(false);
      }else{
        setTimeout(() => {
          console.log("Timpul a trecut 3 secunde!");
          setIsLoading(false);
          apply();
        }, 3000); // 3000 milisecunde = 3 secunde      
      }
    } catch(err){
      console.error('An error occurred:', err.message);
    }
  }

  return {
    isLoading,
    error,
    sendRequestes
  }
}

export default useHTTP;