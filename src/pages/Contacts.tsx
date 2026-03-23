import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, UserCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getContacts, addContact, removeContact, type EmergencyContact } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Contacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>(getContacts());
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAdd = () => {
    if (!name || !phone) {
      toast({ title: "Missing info", description: "Name and phone are required", variant: "destructive" });
      return;
    }
    if (contacts.length >= 5) {
      toast({ title: "Limit reached", description: "Maximum 5 emergency contacts", variant: "destructive" });
      return;
    }
    addContact({ name, phone, relationship });
    setContacts(getContacts());
    setName(""); setPhone(""); setRelationship("");
    setShowAdd(false);
    toast({ title: "Contact added", description: `${name} is now an emergency contact` });
  };

  const handleRemove = (id: string, contactName: string) => {
    removeContact(id);
    setContacts(getContacts());
    toast({ title: "Contact removed", description: `${contactName} removed` });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-5 pt-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Emergency Contacts</h1>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Add up to 5 trusted contacts who will be alerted when you activate SOS.
        </p>

        {/* Contact List */}
        <div className="space-y-3 mb-6">
          <AnimatePresence>
            {contacts.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.phone} {c.relationship && `• ${c.relationship}`}</p>
                </div>
                <button
                  onClick={() => handleRemove(c.id, c.name)}
                  className="p-2 rounded-xl hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {contacts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <UserCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No emergency contacts yet</p>
            </div>
          )}
        </div>

        {/* Add Contact Form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card rounded-2xl p-4 border border-border space-y-3 mb-4 overflow-hidden"
            >
              <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input placeholder="Relationship (optional)" value={relationship} onChange={(e) => setRelationship(e.target.value)} />
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="flex-1 bg-emergency hover:bg-emergency/90 text-emergency-foreground">Save</Button>
                <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showAdd && contacts.length < 5 && (
          <Button
            onClick={() => setShowAdd(true)}
            className="w-full bg-emergency hover:bg-emergency/90 text-emergency-foreground rounded-2xl h-12"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Contact
          </Button>
        )}
      </div>
    </div>
  );
}
