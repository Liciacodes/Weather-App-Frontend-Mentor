import { useState } from "react"
import Header from "./components/Header";
import  Hero from "./components/Hero";
import Content from "./components/Content";
import ErrorState from "./components/ErrorState";



function App() {

  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');  
  const [location, setLocation] = useState<string>('Berlin, Germany');


  return (
 <div>
  <Header units={units} setUnits={setUnits} />
 {/* <ErrorState/> */}
  <Hero />
  <Content />
 </div>
  )
}

export default App
