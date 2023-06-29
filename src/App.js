import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Routes/Routes";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <div>
          <Router />
        </div>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
