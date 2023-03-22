const { Command } = require("commander");
const contactsApi = require("./contacts");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsApi.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsApi.getContactById(id);
      if (contact) {
        console.log(contact);
      }
      break;

    case "add":
      const newContact = await contactsApi.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await contactsApi.removeContact(id);
      if (deletedContact) {
        console.log(deletedContact);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
