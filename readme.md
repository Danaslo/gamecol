## Descripción del Proyecto

**GamerCave** es una plataforma en línea de **compraventa de videojuegos**, donde los usuarios pueden gestionar su propia colección de juegos, ponerlos a la venta o simplemente consultarlos. Además, pueden explorar un mercado para ver qué juegos están disponibles, seguir los que les interesen y contactar directamente con los vendedores.

Con **GamerCave**, los usuarios tienen la posibilidad de:
- **Registrar sus juegos** en una colección personal.
- **Poner en venta** aquellos juegos que ya no deseen.
- **Consultar el mercado** de juegos disponibles.
- **Seguir** los juegos que les interesen para estar al tanto de cualquier cambio.
- **Contactar con los vendedores** para realizar compras.

La plataforma busca ofrecer una experiencia sencilla y segura para comprar y vender videojuegos entre usuarios.

## Tecnologías Utilizadas

### Frontend
- **Angular 19**: Framework de JavaScript para el desarrollo de aplicaciones web. Angular facilita la creación de aplicaciones de manera eficiente y escalable.
- **Bootstrap**: Librería para el desarrollo web que proporciona componentes y estilos prediseñados para crear interfaces atractivas y funcionales de manera rápida.

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor que proporciona una base escalable para el backend de la aplicación.
- **Express**: Framework para Node.js utilizado para manejar las peticiones HTTP y proteger la aplicación contra ataques CSRF (Cross-Site Request Forgery).
- **Sequelize**: ORM (Object-Relational Mapping) para Node.js que facilita el manejo de bases de datos SQL y protege contra ataques de **SQL Injection**.
- **Multer**: Middleware para la carga de archivos, utilizado en este proyecto para manejar la subida y almacenamiento de imágenes.
- **Bcrypt**: Librería para el encriptado de contraseñas, asegurando que las contraseñas de los usuarios estén protegidas y no sean accesibles en texto claro.
- **Helmet**: Middleware para asegurar las cabeceras HTTP, protegiendo la aplicación contra vulnerabilidades comunes como **XSS** (Cross-Site Scripting) y **clickjacking**.
- **Morgan**: Middleware que permite registrar las peticiones HTTP realizadas al servidor, lo que ayuda en la depuración y monitoreo.
- **Express-rate-limit**: Middleware que limita la cantidad de peticiones por IP, protegiendo la aplicación de **ataques DDoS** y **fuerza bruta**.
- **CORS**: Middleware para habilitar el **Cross-Origin Resource Sharing**, permitiendo que el backend acepte solicitudes desde dominios diferentes al propio.
- **JWT**: Tecnología para la **autenticación y autorización** de usuarios. Utiliza tokens firmados para permitir la validación de la identidad del usuario en futuras solicitudes sin necesidad de mantener sesiones.

## Estructura del Proyecto

### `compose/`
Carpeta donde se guarda el archivo de arranque de los contenedores Docker.

### `frontend/`
Carpeta donde se almacena todo lo referente a la **página web**. Se compone de:

- **`src/`**: Contenido de la aplicación.
  - **`app/`**: Almacenamiento de componentes y lógica de la aplicación.
    - **`componentes/`**: Componentes del sistema.
    - **`services/`**: Servicios consumidos por el sistema.
  - **`assets/`**: Aquí se almacenan las imágenes y recursos utilizados por la web.

### `server/`
Se almacena el **servidor**.

- **`config/`**: Se guarda la configuración de **Sequelize** para la conexión a la base de datos.
- **`controller/`**: Aquí están los **controladores** del servidor.
- **`model/`**: Almacena los diferentes **modelos** del servidor.
- **`router/`**: Guarda el acceso a las **rutas** del servidor.
- **`servicios/`**: Guarda los **servicios** del servidor, en este caso, el servicio de **Multer** para la carga de imágenes.

## Instalación

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

(https://github.com/Danaslo/gamecol)

### 2. Situar la carpeta en la raíz

Asegúrate de que la carpeta Proyecto2 está al nivel de la raíz. Para lograrlo puedes usar el siguiente comando (teniendo la terminal desde donde se encuentre dicha carpeta):

cp Proyecto2 /
chmod -R 777 /Proyecto2

### 3. Ejecución

Para arrancar el programa bastará con ejecutar el script **GamerCave.sh** contenido en la carpeta raíz. Para ello debemos introducir:

./GamerCave.sh.

### 4. Detener la aplicación

Si, por algún motivo, quisieramos detener la aplicación bastará con introducir el siguiente comando:

docker compose down

Y con ésto detendremos la aplicación y todos los procesos de la misma.