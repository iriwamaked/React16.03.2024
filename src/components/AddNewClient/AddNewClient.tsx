import { useState, useEffect } from "react";
import ky from "ky";
import { Client } from "../../model/Client";
import { AddNewClientModal } from "../Modal/AddNewClientModal";
import { Events } from "../event";

export function AddNewClient({success:boolean}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);

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
        console.error("Error fetching clients:", err);
      }
    };
    fetchClients();
  }, []);

  const handleAddNewClient = () => {
    setIsModalOpen(true);
    console.log("Кнопка додавання нового клієнта спрацювала");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    console.log("Модальне вікно закрите");
  };

  const addNewClient = async (newClientData: Client) => {
    try {
      // Отримуємо всіх клієнтів
      const allClients: Client[] = await ky
        .get("http://localhost:3001/clients")
        .json();
  
      // Отримуємо всі числові ідентифікатори, виключаючи не визначені
      const numericIds: number[] = allClients
        .map(client => client.id)
        .filter(id => typeof id === 'number') as number[]; // Використовуємо 'as number[]' для перетворення типу 'number | undefined' на 'number'
        console.log(numericIds);
      // Знаходимо максимальний числовий ідентифікатор клієнта
      const maxClientId = Math.max(...numericIds);

  
      // Визначаємо числовий ідентифікатор для нового клієнта
      const newClientId = maxClientId !== -Infinity ? maxClientId + 1 : 1;
  
      // Встановлюємо новому клієнту числовий ідентифікатор
      newClientData.id = newClientId;
  
      // Відправляємо POST-запит для додавання нового клієнта
      await ky.post("http://localhost:3001/clients", { json: newClientData });
      
      console.log("Нового клієнта успішно додано на сервер.");
      
    //   // Оновлюємо список клієнтів на сторінці
     
    } catch (error) {
      console.error("Помилка під час додавання нового клієнта:", error);
    }
  };

  return (
    <div>
      <button onClick={handleAddNewClient}>Додати нового клієнта</button>
      {isModalOpen && (
        <AddNewClientModal onSave={addNewClient} onClose={handleModalClose} />
      )}
    </div>
  );
}