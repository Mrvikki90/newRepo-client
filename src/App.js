import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Routes/Routes";
import { ChakraBaseProvider } from "@chakra-ui/react";

function App() {
  return (
    <BrowserRouter>
      <ChakraBaseProvider>
        <div>
          <Router />
        </div>
      </ChakraBaseProvider>
    </BrowserRouter>
  );
}

export default App;
