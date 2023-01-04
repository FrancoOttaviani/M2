const clickHandle = () => {
  $.get("http://localhost:5000/amigos", (info) => {
    const lista = $("#lista");
    lista.empty();

    info.forEach(({ name, email }) => {
      lista.append(`<li> Nombre: ${name}  --- Email: ${email} </li>`);
    });
  });
};

const buscarAmigo = (amigo) => {
  //   const id = $("#input")[0].value;
  const inputBuscarAmigo = document.querySelector("#input").value;
  $.get(`http://localhost:5000/amigos/${inputBuscarAmigo}`, (id) => {
    // $("#amigo").empty();
    // $("#amigo").append(`El amigo con ID ${id.id} es: ${id.name}`);  // Utilizando JQuery

    document.querySelector("#amigo").innerHTML = `${id.name}`; // Utilizando QuerySelector
  });
};

const deleteFriend = () => {
  const amigoEliminadoId = $("#inputDelete")[0].value;
  $.ajax({
    url: `http://localhost:5000/amigos/${amigoEliminadoId}`,
    type: "DELETE",
    success: () => {
      clickHandle();
      $("#success").empty();
      $("#success").append(`Se elimino un amigo correctamente`);
    },
  });
};

$("#delete").click(deleteFriend);

$("#search").click(buscarAmigo);

$("#boton").click(clickHandle);
