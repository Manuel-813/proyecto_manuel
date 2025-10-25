    /*document.getElementById("form-calculo").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que se recargue la página

    const consumo = parseFloat(document.getElementById("consumo").value);
    const cantidad = parseFloat(document.getElementById("cantidad").value);

    if (isNaN(consumo) || consumo <= 0) {
        alert("⚠ Por favor ingresa un valor válido en kWh.");
        return;
    }
    if (isNaN(cantidad) || cantidad < 0) {
        alert("⚠ Por favor ingresa una cantidad válida.");
        return;
    }

    // Promedio de generación solar de 5 paneles
    const energiaSolar = 180;
    let porcentaje = (energiaSolar / consumo) * 100;

    if (porcentaje > 100) porcentaje = 100;

    document.getElementById("resultado").innerHTML = `
        🔆 Con una instalación promedio de <strong>5 paneles solares</strong> (≈180 kWh/mes),
        tu consumo de <strong>${consumo} kWh</strong> sería cubierto en un <strong>${porcentaje.toFixed(1)}%</strong> por energía renovable.
    `;
});*/


// Escucha el envío del formulario
/*document.getElementById("form-calculo").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que se recargue la página

    // Obtiene los valores del formulario
    const consumo = parseFloat(document.getElementById("consumo").value);
    const cantidad = parseFloat(document.getElementById("cantidad").value);

    // Validaciones
    if (isNaN(consumo) || consumo <= 0) {
        alert("⚠ Por favor ingresa un valor válido en kWh.");
        return;
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("⚠ Por favor ingresa una cantidad válida de paneles.");
        return;
    }

    // Cada panel genera aproximadamente 36 kWh/mes (ya que 5 paneles generan 180)
    const energiaPorPanel = 36;

    // Energía total generada según la cantidad de paneles
    const energiaTotal = energiaPorPanel * cantidad;

    // Calcula el porcentaje de cobertura
    let porcentaje = (energiaTotal / consumo) * 100;

    // Limita el máximo al 100%
    if (porcentaje > 100) porcentaje = 100;

    // Muestra el resultado en el HTML
    document.getElementById("resultado").innerHTML = `
        🔆 Con una instalación de <strong>${cantidad}</strong> panel(es) solares 
        (≈${energiaTotal.toFixed(1)} kWh/mes), tu consumo de 
        <strong>${consumo} kWh</strong> sería cubierto en un 
        <strong>${porcentaje.toFixed(1)}%</strong> por energía renovable.
    `;
});*/

// Escucha el envío del formulario
document.getElementById("form-calculo").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita recargar la página

    // Obtiene los valores del formulario
    const consumo = parseFloat(document.getElementById("consumo").value);
    const cantidad = parseFloat(document.getElementById("cantidad").value);
    const precioKwh = parseFloat(document.getElementById("precioKwh").value) || 800; // Valor por defecto: $800 COP

    // Validaciones
    if (isNaN(consumo) || consumo <= 0) {
        alert("⚠ Por favor ingresa un valor válido en kWh.");
        return;
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("⚠ Por favor ingresa una cantidad válida de paneles.");
        return;
    }

    if (isNaN(precioKwh) || precioKwh <= 0) {
        alert("⚠ Por favor ingresa un valor válido para el precio del kWh.");
        return;
    }

    // Cada panel genera aproximadamente 36 kWh/mes (5 paneles generan 180)
    const energiaPorPanel = 36;

    // Energía total generada según la cantidad de paneles
    const energiaTotal = energiaPorPanel * cantidad;

    // Porcentaje de cobertura del consumo
    let porcentaje = (energiaTotal / consumo) * 100;
    if (porcentaje > 100) porcentaje = 100;

    // Ahorro mensual en pesos
    const ahorro = Math.min(energiaTotal, consumo) * precioKwh;

    // Muestra el resultado en el HTML
    document.getElementById("resultado").innerHTML = `
        🔆 Con una instalación de <strong>${cantidad}</strong> panel(es) solares 
        (≈${energiaTotal.toFixed(1)} kWh/mes), tu consumo de 
        <strong>${consumo} kWh</strong> sería cubierto en un 
        <strong>${porcentaje.toFixed(1)}%</strong> por energía renovable.<br><br>
        💰 Estimarías un ahorro mensual de <strong>$${ahorro.toLocaleString('es-CO')}</strong> COP.
    `;
});
