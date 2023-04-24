const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => id === contactId);
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(filteredContacts), (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Contact with id ${contactId} has been removed`);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = { id: contacts.length + 1, name, email, phone };
    const updatedContacts = [...contacts, newContact];

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Contact ${name} has been added`);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
