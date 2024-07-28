const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const readContacts = await fs.readFile(contactsPath, "utf-8");
  return readContacts;
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contactObj = JSON.parse(contactsList);
  const findContact = contactObj.find((elem) => elem.id === contactId);
  if (!findContact) return null;
  return findContact;
};

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const contactObj = JSON.parse(contactsList);
  const idxForDel = contactObj.findIndex((elem) => elem.id === contactId);
  const newContactList = contactObj.splice(idxForDel, 1);
  const objToString = JSON.stringify(contactObj);
  await fs.writeFile(contactsPath, objToString);
  if (idxForDel === -1) {
    return null;
  }
  return newContactList;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const contactObj = JSON.parse(contactsList);
  const newContactId = uuidv4();
  const newContact = {
    id: newContactId,
    name,
    email,
    phone,
  };
  contactObj.push(newContact);
  const objToString = JSON.stringify(contactObj);
  await fs.writeFile(contactsPath, objToString);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
