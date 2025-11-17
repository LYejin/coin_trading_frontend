import Routers from "./routers/Routers";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">Hello!</div>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </>
  );
}

export default App;
