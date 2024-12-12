import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonaForm = ({ personaToEdit, onFormSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    if (personaToEdit) {
      setNombre(personaToEdit.nombre);
      setTelefono(personaToEdit.telefono);
    } else {
      setNombre("");
      setTelefono("");
    }
  }, [personaToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    // Validaciones de campos obligatorios
    if (!nombre.trim() || !telefono.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (personaToEdit) {
        // Si estamos editando una persona, hacemos un PUT
        await axios.put(`http://localhost:8080/editar/${personaToEdit.id}`, {
          nombre,
          telefono,
        });
      } else {
        await axios.post("http://localhost:8080/grabar", { nombre, telefono });
      }

      window.location.reload(); 


      onFormSubmit();
      setNombre(""); 
      setTelefono("");
    } catch (error) {
      console.error("Error al guardar persona:", error);
      setError(
        error.response?.data?.message || "Ocurrió un error al guardar los datos."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{personaToEdit ? "Editar Persona" : "Agregar Persona"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar errores */}
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <button type="submit">{personaToEdit ? "Actualizar" : "Agregar"}</button>
    </form>
  );
};

export default PersonaForm;
