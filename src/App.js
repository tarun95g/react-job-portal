import Wrappers from "./Contexts/Wrappers/Wrappers";
import MainRouter from "./Routes/routes";
import "./App.scss";

function App() {
  return (
    <Wrappers>
      <MainRouter />
    </Wrappers>
  );
}

export default App;
