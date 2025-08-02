import React from "react";

const NotFoundContact = () => {
  return (
    <div className="flex justify-center h-[60vh] items-center flex-col gap-2">
      <div>
        {/* <img src="./Contact.png" alt="Contact" /> */}
        <h1 className="text-8xl">🤦‍♂️</h1>
      </div>
      <h3 className="text-gray-300 text-center text-2xl font-semibold">
        No contact found!
      </h3>
    </div>
  );
};

export default NotFoundContact;
