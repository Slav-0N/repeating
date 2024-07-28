const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// listContacts();
// getContactById("Z5sbDlS7pCzNsnAHLtDJd");
// removeContact("C9sjBfCo4UJCWjzBnOtxl");
// addContact("pipi", "aaa@bb", "+555555555555");

// const { program } = require("commander");
// program
//   .option("-a, --action <type>", "choose action")
//   .option("-i, --id <type>", "user id")
//   .option("-n, --name <type>", "user name")
//   .option("-e, --email <type>", "user email")
//   .option("-p, --phone <type>", "user phone");

// program.parse();

// const options = program.opts();

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
console.log(argv);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listing = await listContacts();
      console.log(listing);
      break;

    case "get":
      const elim = await getContactById(id);
      console.log(elim);
      break;

    case "add":
      const newCon = await addContact(name, email, phone);
      console.log(newCon);
      break;

    case "remove":
      const removedElement = await removeContact(id);
      console.log(removedElement);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
