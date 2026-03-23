export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const CONTACTS_KEY = "shield_emergency_contacts";

export function getContacts(): EmergencyContact[] {
  const data = localStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveContacts(contacts: EmergencyContact[]) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export function addContact(contact: Omit<EmergencyContact, "id">): EmergencyContact {
  const contacts = getContacts();
  const newContact = { ...contact, id: crypto.randomUUID() };
  contacts.push(newContact);
  saveContacts(contacts);
  return newContact;
}

export function removeContact(id: string) {
  const contacts = getContacts().filter((c) => c.id !== id);
  saveContacts(contacts);
}
