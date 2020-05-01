import React from 'react';
import Nav from "../components/Nav";
import Jumbotron from "../components/Jumbotron"
import Wine from "../components/Wine"

function App() {
  return (
    <div className="App">
     <Jumbotron />     
     <Nav />
     
      <h1>Wine</h1>
      <Wine />
    </div>
  );
}

export default App;