import { ToastContainer } from "react-toastify";
import AppRouting from "./app-routes/AppRoutingView";

function App() {
  return (
    <>
      <div className="body">
        <h1 className="media">Only Available On Desktop</h1>
        <div className="container main ">
          <AppRouting />
          <ToastContainer />
        </div>
      </div>

    </>
  );
}

export default App;