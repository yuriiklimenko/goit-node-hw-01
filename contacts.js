const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

const getContacts = async () => {
  try {
    const content = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    throw new Error(error);
  }
};

async function listContacts() {
  try {
    const contacts = await getContacts();
    if (!contacts.length) {
      console.log("Don't have any contacts");
      return;
    }
    return contacts;
  } catch (error) {
    throw new Error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts();

    const contactById = contacts.find((contact) => contact.id === contactId);
    if (contactById) {
      return contactById;
    } else {
      console.log(`No contact with id-'${contactId}`);
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (filteredContacts.length === contacts.length) {
      console.log(`There is no contact with id-${contactId}`);
    } else {
      const deletedContact = await getContactById(contactId);
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
      console.log(`Contact with id-${contactId} has been deleted`);
      return deletedContact;
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    const isContactExists = contacts.find((contact) => contact.name === name);
    if (isContactExists) {
      console.log(`A contact with the name ${name} already exists!`);
    } else {
      contacts.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contacts));
      console.log(`Contact named ${name} added`);
      return newContact;
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
