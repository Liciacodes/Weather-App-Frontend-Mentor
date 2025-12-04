import { useState } from "react"
import Header from "./components/Header";
import  Hero from "./components/Hero";
import Content from "./components/Content";
import ErrorState from "./components/ErrorState";
import NoResults from "./components/NoResult";



function App() {

  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');  
  const [location, setLocation] = useState<string>('Berlin, Germany');
  const [noResults, setNoResults] = useState<boolean>(false);

  return (
 <div>
  <Header units={units} setUnits={setUnits} />
 {/* <ErrorState/> */}
  <Hero />
  {noResults ? <NoResults /> : <Content />}
 </div>
  )
}

export default App
