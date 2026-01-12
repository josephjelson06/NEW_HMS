import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./app/authContext";
import Router from "./app/router";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
