import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { FiSearch, FiPlusCircle } from "react-icons/fi";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer } from "react-toastify";
import NotFoundContact from "./components/NotFoundContact";

function App() {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContact = contactLists.filter(
        (contacts) =>
          contacts.name.toLowerCase().includes(value.toLowerCase()) ||
          contacts.email.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContact);
      return filteredContact;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              type="text"
              onChange={filterContacts}
              placeholder="Search contact..."
              className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>

          <FiPlusCircle
            onClick={onOpen}
            title="Add new contact"
            className="cursor-pointer text-4xl text-white hover:text-yellow-400"
          />
        </div>
        <div className="mt-4">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contacts) => (
              <ContactCard key={contacts.id} contacts={contacts} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
