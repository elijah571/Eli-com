import Home from "./Components/Home/Home";
import Items from "./Components/Products/Items";

const App = () => {
  return (
    <>
      <Home>
        <main> {<Items />} </main>
      </Home>
    </>
  );
};

export default App;
