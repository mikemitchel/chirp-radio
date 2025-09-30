import { useState } from "react";
import Layout from "./layout";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <div>Chirp-Radio is coming here soon!!</div>
      </Layout>
    </>
  );
}

export default App;
