import { useState, useEffect } from "react";
import ky from "ky";
import { Client } from "../../model/Client";
import { Modal } from "../Modal/Modal";

import { AddNewClient } from "../AddNewClient/AddNewClient";


export function ListOfClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data: Client[] = await ky
          .get("http://localhost:3001/clients")
          .json();
        console.log(data);
        if (Array.isArray(data)) {
          setClients(data); 
        }
      } catch (err) {
        if (err instanceof Error && err.message) {
          setError(err.message);
        } else {
          setError("An unknown error occurred"); 
        }
      }
    };
    fetchClients();
    
  }, []);

  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  async function UpdateClients(){
    const updatedClients: Client[] = await ky
        .get("http://localhost:3001/clients")
        .json();
      setClients(updatedClients);
  }

  const handleSaveChanges = async (updatedClient: Client) => {
    console.log(updatedClient);
    console.log(`Sending PATCH request to: http://localhost:3001/clients/${updatedClient.id}`);
    try {
      const url=`http://localhost:3001/clients/${updatedClient.id}`;
      await ky.patch(url, {
        json: updatedClient,
      });
      console.log("Дані успішно оновлено на сервері.");
      UpdateClients();
      handleModalClose();
    } catch (error) {
      console.error("Помилка під час оновлення даних:", error);
    }
  };

 
  return (
    <div>
      <h2>Список клієнтів</h2>
      {error && <p>{error}</p>}
      <AddNewClient success={UpdateClients}></AddNewClient>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>ПIБ</th>
            <th>РНОКПП</th>
            <th>Телефон</th>
            <th>E-mail</th>
            <th>Редагування</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>
                {client.Name} {client.LastName} {client.Surname}
              </td>
              <td>{client.RNOKPP}</td>
              <td>{client.Phone}</td>
              <td>{client.Email}</td>
              <td>
                <button onClick={() => handleEditClick(client)}>
                  Редагувати
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedClient && (
        <Modal
          client={selectedClient}
          onSave={handleSaveChanges}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

// export default Home;
