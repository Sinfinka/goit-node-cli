import * as fs from "node:fs/promises"
import path from "node:path"
import { nanoid } from "nanoid"

const contactsPath = path.resolve("db", "contacts.json")

export async function listContacts() {
    const data = await fs.readFile(contactsPath, {encoding: "utf-8"})
    return JSON.parse(data);
  }

  
  export async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (typeof contact === "undefined") return null;
    return contact;
  }
  
  export async function removeContact(contactId) {
    const contacts = await listContacts();
    const deleteContact = contacts.find((contact) => contact.id === contactId);
    if (typeof deleteContact === "undefined") return null;
    const newContactsList = contacts.filter(
        (contact) => contact.id !== deleteContact.id
      );
    fs.writeFile(contactsPath, JSON.stringify(newContactsList, undefined, 2));
    return deleteContact;
  }
  
  export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const id = nanoid();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
    return newContact;
  }
  