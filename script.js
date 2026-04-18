// ===============================
// CARGAR DATOS AL INICIAR
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    // Cargar monto y tasa
    document.getElementById("monto").value = localStorage.getItem("monto") || "";
    document.getElementById("tasa").value = localStorage.getItem("tasa") || "";

    // Cargar historial
    const historialGuardado = JSON.parse(localStorage.getItem("historial")) || [];
    historial = historialGuardado;
    renderHistorial();

    calcular();
});

// ===============================
// VARIABLES
// ===============================
let historial = [];


// ===============================
// GUARDAR AUTOMÁTICO
// ===============================
document.getElementById("monto").addEventListener("input", () => {
    localStorage.setItem("monto", document.getElementById("monto").value);
    calcular();
});

document.getElementById("tasa").addEventListener("input", () => {
    localStorage.setItem("tasa", document.getElementById("tasa").value);
    calcular();
});


// ===============================
// FUNCIÓN DE CÁLCULO
// ===============================
function calcular() {
    const monto = parseFloat(document.getElementById("monto").value) || 0;
    const tasa = parseFloat(document.getElementById("tasa").value) || 0;

    const resultado = monto * tasa;

    document.getElementById("resultado").textContent = resultado.toFixed(2);

    localStorage.setItem("resultado", resultado);
}


// ===============================
// AGREGAR AL HISTORIAL
// ===============================
function agregar() {
    const monto = parseFloat(document.getElementById("monto").value);
    const tasa = parseFloat(document.getElementById("tasa").value);
    const resultado = monto * tasa;

    if (!monto || !tasa) {
        alert("Debes escribir monto y tasa.");
        return;
    }

    const item = {
        monto,
        tasa,
        resultado,
        fecha: new Date().toLocaleString()
    };

    historial.push(item);
    localStorage.setItem("historial", JSON.stringify(historial));

    renderHistorial();
}


// ===============================
// MOSTRAR HISTORIAL
// ===============================
function renderHistorial() {
    const contenedor = document.getElementById("historial");
    contenedor.innerHTML = "";

    historial.forEach((item, index) => {
        const fila = document.createElement("div");
        fila.className = "item";

        fila.innerHTML = `
            <p><strong>Monto:</strong> ${item.monto}</p>
            <p><strong>Tasa:</strong> ${item.tasa}</p>
            <p><strong>Resultado:</strong> ${item.resultado}</p>
            <p><small>${item.fecha}</small></p>
            <button onclick="borrar(${index})">Eliminar</button>
        `;

        contenedor.appendChild(fila);
    });
}


// ===============================
// BORRAR UN ELEMENTO
// ===============================
function borrar(index) {
    historial.splice(index, 1);
    localStorage.setItem("historial", JSON.stringify(historial));
    renderHistorial();
}


// ===============================
// BORRAR TODO
// ===============================
function borrarTodo() {
    if (confirm("¿Seguro que deseas borrar todo el historial?")) {
        historial = [];
        localStorage.removeItem("historial");
        renderHistorial();
    }
}
