import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclose from "../hooks/useDisclose";
import { toast } from "react-toastify";

const ContactCard = ({ contacts }) => {
  const { isOpen, onClose, onOpen } = useDisclose();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.error("They’re gone… like your ex. 👋");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={contacts.id}
        className="bg-amber-200 flex justify-between items-center rounded-lg mb-2"
      >
        <div className="flex gap-1 p-2 rounded-lg">
          <HiOutlineUserCircle className="text-orange-500 text-4xl" />
          <div className="">
            <h2 className="font-medium">{contacts.name}</h2>
            <p className="text-sm">{contacts.email}</p>
          </div>
        </div>
        <div className=" flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contacts.id)}
            className="text-orange-500 cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contacts}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
