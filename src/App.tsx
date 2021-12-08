import React from "react";
import "./App.css";
import {
  useAddContactMutation,
  useContactQuery,
  useContactsQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} from "./services/contactsApi";

function App() {
  const { data, error, isLoading, isSuccess, isFetching } = useContactsQuery();

  return (
    <div className="App">
      <h1>React deux toolkit RTK query tutorial</h1>
      {isLoading && <h2>...loading</h2>}
      {isFetching && <h2>...is fetching</h2>}
      {error && <h2>...error here</h2>}
      {isSuccess && (
        <>
          {data?.map((contact) => {
            return (
              <div className="data" key={contact.id}>
                <span>{contact.name}</span>
                <span>
                  <ContactDetail id={contact.id} />
                </span>
              </div>
            );
          })}
          <AddContact />
        </>
      )}
    </div>
  );
}

export default App;

export const ContactDetail = ({ id }: { id: string }) => {
  const { data } = useContactQuery(id);
  return (
    <>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </>
  );
};

export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  // prettier-ignore
  const contact = {
    "id": "8",
    "name": "eddie",
    "email": "diaudiaua@dsada.com",
  };
  // prettier-ignore
  const contact2 = {
    "id": "8",
    "name": "Jack",
    "email": "diaudiaua@dsada.com",
  };

  const handleAddClick = async () => {
    await addContact(contact);
  };
  const handleUpdateClick = async () => {
    await updateContact(contact2);
  };
  const handleDeleteClick = async () => {
    await deleteContact(contact.id);
  };

  return (
    <>
      <button onClick={handleAddClick}>Add contact</button>
      <button onClick={handleUpdateClick}>update contact</button>
      <button onClick={handleDeleteClick}>delete contact</button>
    </>
  );
};
