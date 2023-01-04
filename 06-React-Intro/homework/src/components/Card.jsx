import React from "react";

export default function Card(props) {
  // acá va tu código
  return (
    <div>
      <img src={props.img} alt="img" srcset="" />
      <button onClick={props.onClose}>X</button>
      <p>Min: {props.min}</p>
      <p>Max: {props.max}</p>
      <p>City: {props.name}</p>
    </div>
  );
}

// max: Temperatura Máxima.
// min: Temperatura Mínima.
// name: Nombre de la ciudad.
// img: nombre de la imagen que se debe mostrar.
// onClose: recibe una función que se va a ejecutar cuando el usuario haga click en el botón de cerrar.
