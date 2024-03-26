import React, { useState } from "react";
import { Client } from "../../model/Client";

interface AddClientModalProps {
  onSave: (client: Client) => void;
  onClose: () => void;
}

export const AddNewClientModal: React.FC<AddClientModalProps> = ({ onSave, onClose }) => {
  const [newClient, setNewClient] = useState<Client>({
    
    Name: "",
    LastName: "",
    Surname: "",
    RNOKPP: undefined,
    Phone: undefined,
    Email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newClient);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Додати нового клієнта</h2>
        <form onSubmit={handleSubmit}>
          <label>
            ПІБ:
            <input type="text" name="Name" value={newClient.Name} onChange={handleChange} />
            <input type="text" name="LastName" value={newClient.LastName} onChange={handleChange} />
            <input type="text" name="Surname" value={newClient.Surname} onChange={handleChange} />
          </label>
          <label>
            РНОКПП:
            <input type="number" name="RNOKPP" value={newClient.RNOKPP} onChange={handleChange} />
          </label>
          <label>
            Телефон:
            <input type="text" name="Phone" value={newClient.Phone} onChange={handleChange} />
          </label>
          <label>
            E-mail:
            <input type="text" name="Email" value={newClient.Email} onChange={handleChange} />
          </label>
          <button type="submit">Додати клієнта</button>
        </form>
      </div>
    </div>
  );
};