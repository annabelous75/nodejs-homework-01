const yargs = require("yargs");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const argv = yargs(process.argv.slice(2)).options({
  action: {
    type: "string",
    demandOption: true,
    alias: "a",
    describe: "Action type (list, get, add, remove)",
  },
  id: {
    type: "number",
    alias: "i",
    describe: "Contact id",
  },
  name: {
    type: "string",
    alias: "n",
    describe: "Contact name",
  },
  email: {
    type: "string",
    alias: "e",
    describe: "Contact email",
  },
  phone: {
    type: "string",
    alias: "p",
    describe: "Contact phone",
  },
}).argv;

invokeAction(argv);
