import React, { useState } from "react";
import { Client } from "../../model/Client";

export const Modal: React.FC<{
  client: Client;
  onSave: (client: Client) => void;
  onClose: () => void;
}> = ({ client, onSave, onClose }) => {
  const [editedClient, setEditedClient] = useState(client);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedClient((prevClient: any) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedClient);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Редагувати дані клієнта</h2>
        <form onSubmit={handleSubmit}>
          <label>
            ПІБ:
            <input
              type="text"
              name="Name"
              value={editedClient.Name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="LastName"
              value={editedClient.LastName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="Surname"
              value={editedClient.Surname}
              onChange={handleChange}
            />
          </label>
          <label>
            РНОКПП:
            <input
              type="number"
              name="RNOKPP"
              value={editedClient.RNOKPP}
              onChange={handleChange}
            />
          </label>
          <label>
            Телефон:
            <input
              type="text"
              name="Phone"
              value={editedClient.Phone}
              onChange={handleChange}
            />
          </label>
          <label>
            E-mail:
            <input
              type="text"
              name="Email"
              value={editedClient.Email}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Зберегти зміни</button>
        </form>
      </div>
    </div>
  );
};
