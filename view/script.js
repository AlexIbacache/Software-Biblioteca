const API = "http://localhost:3000";

function crearCliente() {

    fetch(API + "/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre: document.getElementById("nombre").value,
            rut: document.getElementById("rut").value,
            correo: document.getElementById("correo").value,
            telefono: document.getElementById("telefono").value
        })
    })
        .then(res => res.json())
        .then(data => {
            alert(data);
            cargarClientes();
        });

}

function crearEmpleado() {

    fetch(API + "/empleados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre: document.getElementById("nombre").value,
            rut: document.getElementById("rut").value,
            cargo: document.getElementById("cargo").value,
            correo: document.getElementById("correo").value
        })
    })
        .then(res => res.json())
        .then(data => {
            alert(data);
            cargarEmpleados();
        });

}

function crearLibro() {

    fetch(API + "/libros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            titulo: document.getElementById("titulo").value,
            autor: document.getElementById("autor").value,
            editorial: document.getElementById("editorial").value,
            anio: document.getElementById("anio").value,
            cantidad: document.getElementById("cantidad").value
        })
    })
        .then(res => res.json())
        .then(data => {
            alert(data);
            cargarLibros();
        });

}

function crearReserva() {

    fetch(API + "/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cliente_id: document.getElementById("cliente_id").value,
            libro_id: document.getElementById("libro_id").value,
            fecha_reserva: document.getElementById("fecha_reserva").value
        })
    })
        .then(res => res.json())
        .then(data => {
            alert(data);
            cargarReservas();
        });

}

function cargarClientes() {

    fetch(API + "/clientes")
        .then(res => res.json())
        .then(data => {

            const tabla = document.getElementById("tablaClientes");

            if (!tabla) return;

            tabla.innerHTML = "";

            data.forEach(cliente => {

                tabla.innerHTML += `
                <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.rut}</td>
                <td>${cliente.correo}</td>
                <td>${cliente.telefono}</td>
                </tr>
                `;

            });

        });

}

function cargarEmpleados() {

    fetch(API + "/empleados")
        .then(res => res.json())
        .then(data => {

            const tabla = document.getElementById("tablaEmpleados");

            if (!tabla) return;

            tabla.innerHTML = "";

            data.forEach(emp => {

                tabla.innerHTML += `
                <tr>
                <td>${emp.id}</td>
                <td>${emp.nombre}</td>
                <td>${emp.rut}</td>
                <td>${emp.cargo}</td>
                <td>${emp.correo}</td>
                </tr>
                `;

            });

        });

}

function cargarLibros() {

    fetch(API + "/libros")
        .then(res => res.json())
        .then(data => {

            const tabla = document.getElementById("tablaLibros");

            if (!tabla) return;

            tabla.innerHTML = "";

            data.forEach(libro => {

                tabla.innerHTML += `
                <tr>
                <td>${libro.id}</td>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.editorial}</td>
                <td>${libro.anio}</td>
                <td>${libro.cantidad}</td>
                </tr>
                `;

            });

        });

}

function cargarReservas() {

    fetch(API + "/reservas")
        .then(res => res.json())
        .then(data => {

            const tabla = document.getElementById("tablaReservas");

            if (!tabla) return;

            tabla.innerHTML = "";

            data.forEach(res => {

                tabla.innerHTML += `
                <tr>
                <td>${res.id}</td>
                <td>${res.cliente_id}</td>
                <td>${res.libro_id}</td>
                <td>${res.fecha_reserva}</td>
                <td>${res.fecha_devolucion || "Pendiente"}</td>
                </tr>
                `;

            });

        });

}

window.onload = function () {

    cargarClientes();
    cargarEmpleados();
    cargarLibros();
    cargarReservas();
    cargarOpcionesReservas();

}

function cargarOpcionesReservas() {
    const selectCliente = document.getElementById("cliente_id");
    const selectLibro = document.getElementById("libro_id");

    if (selectCliente && selectLibro) {
        fetch(API + "/clientes")
            .then(res => res.json())
            .then(data => {
                selectCliente.innerHTML = '<option value="">Seleccione Cliente...</option>';
                data.forEach(cliente => {
                    selectCliente.innerHTML += `<option value="${cliente.id}">${cliente.id} - ${cliente.nombre}</option>`;
                });
            });

        fetch(API + "/libros")
            .then(res => res.json())
            .then(data => {
                selectLibro.innerHTML = '<option value="">Seleccione Libro...</option>';
                data.forEach(libro => {
                    selectLibro.innerHTML += `<option value="${libro.id}">${libro.id} - ${libro.titulo}</option>`;
                });
            });
    }
}

// Función para formatear automáticamente el RUT con puntos y guion
function formatearRUT(input) {
    // Eliminar todo lo que no sea número o la letra k/K
    let valor = input.value.replace(/[^0-9kK]/g, '').toUpperCase();
    
    if (valor.length === 0) {
        input.value = '';
        return;
    }

    // Dividir en cuerpo y dígito verificador
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1);

    if (valor.length === 1) {
        input.value = valor;
        return;
    }

    // Poner puntos de a miles al cuerpo
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Asignar el valor formateado
    input.value = cuerpo + "-" + dv;
}