var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) {
    resultSet.push(startEl);
  }

  for (let index = 0; index < startEl.children.length; index++) {
    var elements = traverseDomAndCollectElements(
      matchFunc,
      startEl.children[index]
    );
    resultSet = [...resultSet, ...elements];
  }

  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";

  for (let i = 0; i < selector.length; i++) {
    if (selector[i] === ".") return "tag.class";
  }

  return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector); // Nos devuelve 'id' 'class' 'tag.class' ò 'tag'
  var matchFunction;
  if (selectorType === "id") {
    // selector = #contenedor // elemento.id = contenedor
    matchFunction = function (elemento) {
      return selector === `#${elemento.id}`;
    };
  } else if (selectorType === "class") {
    matchFunction = function (elemento) {
      // elemento = <div class "clase1 clase2 clase3"></div>
      let clases = elemento.classList; // [clase1, clase2, clase3]
      for (let i = 0; i < clases.length; i++) {
        // selector = '.clase1'  clase[i] = clase1 --> le agrego el . para hacer la comparacion
        if (selector === `.${clases[i]}`) {
          return true;
        }
      }
      return false;
    };
  } else if (selectorType === "tag.class") {
    matchFunction = function (elemento) {
      // selector "p.clase1"
      // elemento <p class="clase1"></p>
      let [tagBuscado, classBuscada] = selector.split("."); // ["p", "clase1"]
      return (
        matchFunctionMaker(tagBuscado)(elemento) &&
        matchFunctionMaker(`.${classBuscada}`)(elemento)
      );
    };
  } else if (selectorType === "tag") {
    matchFunction = function (elemento) {
      // elemento => <div class = "claseDiv"></div>
      // elemento.tagName = "DIV"
      // elemento.tagName.toLowerCase() = "div"

      return elemento.tagName.toLowerCase() === selector;
    };
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

// $(h1)
