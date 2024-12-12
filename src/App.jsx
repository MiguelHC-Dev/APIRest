import React, { useState } from "react";
import PersonaList from "./components/PersonaList";
import PersonaForm from "./components/PersonaForm";

const App = () => {
  const [personaToEdit, setPersonaToEdit] = useState(null);

  const handleEdit = (persona) => {
    setPersonaToEdit(persona);
  };

  const handleFormSubmit = () => {
    setPersonaToEdit(null); // Limpia el formulario
  };

  return (
    <div className="principal">
      <h1>Personas API</h1>
      <PersonaForm personaToEdit={personaToEdit} onFormSubmit={handleFormSubmit} />
      <PersonaList onEdit={handleEdit} />
    </div>
  );
};

export default App;
