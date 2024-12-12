import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonaList = ({ onEdit }) => {
  const [personas, setPersonas] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      setError(null); // Reiniciar error al intentar obtener datos
      const response = await axios.get("http://localhost:8080/personas");
      setPersonas(response.data);
    } catch (error) {
      console.error("Error al obtener personas:", error);
      setError(
        error.response?.data?.message ||
          "No se pudieron cargar las personas. Intenta nuevamente."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null); // Reiniciar error al intentar eliminar
      await axios.delete(`http://localhost:8080/delete/${id}`);
      fetchPersonas(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar persona:", error);
      setError(
        error.response?.data?.message ||
          "No se pudo eliminar la persona. Intenta nuevamente."
      );
    }
  };

  return (
    <div>
      <h2>Personas registradas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar errores */}
      <ul>
        {personas.map((persona) => (
          <li key={persona.id}>
            {persona.nombre} - {persona.telefono}
            <div id="containerButtons">
              <button onClick={() => onEdit(persona)}>Editar</button>
              <button onClick={() => handleDelete(persona.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonaList;
