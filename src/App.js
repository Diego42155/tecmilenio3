import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material"; // Usamos Material-UI para los componentes de la UI

export default function EnfermeriaApp() {
  const [cita, setCita] = useState({ nombre: "", matricula: "", motivo: "" });
  const [pregunta, setPregunta] = useState("");
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [preguntaExitosa, setPreguntaExitosa] = useState(false);

  // Función para manejar la reserva de cita
  const handleReserva = async () => {
    if (cita.nombre && cita.matricula && cita.motivo) {
      try {
        // Aquí se envían los datos de la cita
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbx_YPaXUQn42IFjXTcIQ_jCVjQ0NIZzJcgX2Wr8c9Vnk9sI2UOwMhjgdMk6ojG4l2w/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tipo: "cita", ...cita }), // Agregar un campo tipo para distinguir las citas
          }
        );
        setReservaExitosa(true);
        setCita({ nombre: "", matricula: "", motivo: "" });
      } catch (error) {
        console.error("Error al enviar la cita:", error);
      }
    }
  };

  // Función para manejar las preguntas
  const handlePregunta = async () => {
    if (pregunta) {
      try {
        // Aquí se envían las preguntas
        const response = await fetch({
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tipo: "pregunta", pregunta }), // Se marca como tipo "pregunta"
        });
        setPreguntaExitosa(true);
        setPregunta("");
      } catch (error) {
        console.error("Error al enviar la pregunta:", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}
      >
        App de Enfermería - Universidad Tecmilenio
      </h1>

      {/* Sección de cita */}
      <Card style={{ marginBottom: "20px" }}>
        <CardContent style={{ padding: "20px" }}>
          <h2>Agendar Cita</h2>
          <TextField
            label="Tu nombre"
            variant="outlined"
            fullWidth
            value={cita.nombre}
            onChange={(e) => setCita({ ...cita, nombre: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Tu matrícula"
            variant="outlined"
            fullWidth
            value={cita.matricula}
            onChange={(e) => setCita({ ...cita, matricula: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          <TextareaAutosize
            minRows={3}
            placeholder="Motivo de la cita"
            value={cita.motivo}
            onChange={(e) => setCita({ ...cita, motivo: e.target.value })}
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleReserva}
            style={{ width: "100%" }}
          >
            Agendar
          </Button>
          {reservaExitosa && (
            <p style={{ color: "green", marginTop: "10px" }}>
              Cita reservada con éxito.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Sección de medicamentos */}
      <Card style={{ marginBottom: "20px" }}>
        <CardContent style={{ padding: "20px" }}>
          <h2>Medicamentos Comunes</h2>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>Diclofenaco en gel - Inflamación y dolor muscular</li>
            <li>Pepto Bismol - Malestar estomacal y diarrea</li>
            <li>Difenidol - Náuseas y vértigo</li>
            <li>Ketorolaco - Dolor moderado a severo</li>
            <li>Diclofenaco tabletas - Dolor e inflamación</li>
            <li>Clorfenamina compuesta - Alergias y congestión</li>
            <li>Ibuprofeno (400, 600, 800 mg) - Fiebre, dolor e inflamación</li>
            <li>Naproxeno - Dolor e inflamación</li>
            <li>Búscopina compuesta - Cólicos y espasmos abdominales</li>
            <li>Metamizol sódico - Fiebre y dolor intenso</li>
            <li>Aspirina - Dolor leve y fiebre</li>
            <li>Cafiapirina - Dolor de cabeza y fiebre</li>
            <li>Metoclopramida - Náuseas, vómito y reflujo</li>
            <li>Paracetamol - Dolor leve y fiebre</li>
            <li>Salbutamol - Asma y dificultad respiratoria</li>
            <li>Omeprazol - Reflujo y acidez estomacal</li>
            <li>Galaver - Antibiótico (uso bajo indicación médica)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Sección de preguntas */}
      <Card>
        <CardContent style={{ padding: "20px" }}>
          <h2>Haz tu Pregunta</h2>
          <TextareaAutosize
            minRows={3}
            placeholder="Escribe tu pregunta aquí"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePregunta}
            style={{ width: "100%" }}
          >
            Enviar Pregunta
          </Button>
          {preguntaExitosa && (
            <p style={{ color: "green", marginTop: "10px" }}>
              Pregunta enviada con éxito.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
