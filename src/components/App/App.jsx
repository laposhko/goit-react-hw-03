import ContactForm from "../ContactForm/ContactForm";
import initialContacts from "../../contacts.json";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import css from "./App.module.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("contacts"));
    if (savedData !== null) {
      return savedData;
    }
    return initialContacts;
  });
  const [filter, setFilter] = useState("");
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  const handleSubmit = (values, actions) => {
    values = { ...values, id: nanoid() };
    setContacts((prevTasks) => {
      return [...prevTasks, values];
    });
    actions.resetForm();
  };
  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };
  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <SearchBox filter={filter} onFilter={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}
