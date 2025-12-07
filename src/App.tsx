import { useEffect, useState } from "react"
import Header from "./components/Header";
import Hero from "./components/Hero";
import Content from "./components/Content";

import NoResults from "./components/NoResult";

function App() {
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');  
  const [location, setLocation] = useState<string>('Berlin, Germany');
  const [noResults, setNoResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() =>{
    const timer = setTimeout(()=> {
      setIsLoading(false);
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Add a function to handle location selection
  const handleLocationSelect = (newLocation: string, hasResults: boolean = true) => {
    setLocation(newLocation);
    setNoResults(!hasResults);
  };

  return (
    <div>
      <Header units={units} setUnits={setUnits} />
      <Hero 
        setNoResults={setNoResults} 
        onLocationSelect={handleLocationSelect} // Optional: if you want to update location
      />
      {noResults ? <NoResults /> : <Content isLoading={isLoading} />}
    </div>
  )
}

export default App;