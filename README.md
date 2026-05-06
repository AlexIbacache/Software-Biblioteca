# Software Biblioteca

Este es un sistema de gestión para una biblioteca desarrollado con Node.js, Express y MySQL. Permite administrar clientes, empleados, libros y reservas.

## 🚀 Requisitos

Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## 🛠️ Instalación

1. Clona este repositorio o descarga los archivos.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

## 🗄️ Configuración de la Base de Datos

1. Crea una base de datos en tu servidor MySQL.
2. Importa el archivo `biblioteca.sql` incluido en la raíz del proyecto para crear las tablas y datos iniciales.
3. Asegúrate de configurar las credenciales de conexión en el archivo `config/database.js`.

## 💻 Ejecución

Para iniciar el servidor, ejecuta:
```bash
node server.js
```
El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

## 📂 Estructura del Proyecto

- `config/`: Configuración de la conexión a la base de datos.
- `models/`: Definición de los modelos de datos.
- `routes/`: Definición de las rutas del API (clientes, empleados, libros, reservas).
- `view/`: Archivos del frontend (HTML, CSS, JS).
- `img/`: Imágenes y recursos visuales.
- `server.js`: Punto de entrada de la aplicación.
- `biblioteca.sql`: Script de creación de la base de datos.
