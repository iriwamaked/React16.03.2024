import ky from "ky";

import "./App.css";
import {ListOfClients} from "./components/ListOfClients/ListOfClients";
import {AddNewClient} from "./components/AddNewClient/AddNewClient";

async function getAllClients() {
  try {
    const data = await ky.get("http://localhost:3001/clients").json();
    console.log(data);
  } catch (err:any) {
    console.log(err.message);
  }
}

function App() {
  return (
    <>
    
      <ListOfClients></ListOfClients>
    </>
  );
}

export default App;
