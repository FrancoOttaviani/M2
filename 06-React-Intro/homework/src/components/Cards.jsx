import React from "react";
import Card from "./Card";

export default function Cards(props) {
  // acá va tu código
  // tip, podés usar un map
  return (
    <div>
      {props.cities.map((city) => (
        <Card
          min={city.main.temp_min}
          max={city.main.temp_max}
          name={city.name}
        />
      ))}
    </div>
  );
}

{
  /* <img src={props.img} alt="img" srcset="" />
<button onClick={props.onClose}>X</button>
<p>Min: {props.min}</p>
<p>Max: {props.max}</p>
<p>City: {props.name}</p> */
}
