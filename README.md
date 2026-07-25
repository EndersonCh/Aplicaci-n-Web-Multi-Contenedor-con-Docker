# Parcial Comunicaciones II: Despliegue de Aplicación Web Multi-Contenedor

**Integrantes:** Jessica Ramirez y Enderson Chavez

## Descripción del Proyecto

Este proyecto consiste en el despliegue de una aplicación web similar a un blog utilizando una arquitectura multicontenedor orquestada con Docker Compose.

La arquitectura se divide en tres servicios principales:

1. **Frontend:** Interfaz de usuario desarrollada en React (Vite) y servida mediante Nginx.
2. **Backend:** API RESTful desarrollada con Node.js y Express, encargada de la lógica de negocio.
3. **Base de Datos:** Motor PostgreSQL que almacena las publicaciones del blog, configurado con un volumen nombrado para garantizar la persistencia de la información.

---

## Requisitos Previos

Para poder ejecutar este proyecto en tu máquina local, necesitas tener instaladas las siguientes herramientas:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

---

## Instrucciones de Clonación y Ejecución

**1. Clonar el repositorio:**
Abre tu terminal y ejecuta el siguiente comando para descargar el código a tu máquina local:
\`\`\`bash
git clone https://github.com/EndersonCh/Aplicaci-n-Web-Multi-Contenedor-con-Docker.git
cd Aplicaci-n-Web-Multi-Contenedor-con-Docker
\`\`\`

**2. Construir y levantar la aplicación:**
Una vez dentro de la carpeta raíz del proyecto, ejecuta el siguiente comando para que Docker descargue las imágenes, construya los contenedores y levante toda la arquitectura en segundo plano:
\`\`\`bash
docker compose up -d --build
\`\`\`

---

## URLs de Acceso

Cuando todos los contenedores estén en estado "Up", podrás acceder a la aplicación a través de tu navegador web en las siguientes direcciones:

- **Frontend (Interfaz Web del Blog):** [http://localhost:5173](http://localhost:5173)
- **Backend (API JSON):** [http://localhost:3000/api/posts](http://localhost:3000/api/posts)

---

## Variables de Entorno y Configuración

Las credenciales de acceso y configuraciones de red están gestionadas directamente a través del archivo `docker-compose.yml`. Los contenedores se comunican internamente mediante una red Docker personalizada (`parcial_network`).

Las variables inyectadas para la conexión a la base de datos son:

- `POSTGRES_USER`: admin
- `POSTGRES_PASSWORD`: clave123
- `POSTGRES_DB`: parcial_db
- `DB_HOST`: db (Resolución DNS interna de Docker)

---

## Detener la aplicación

Para detener y eliminar los contenedores, redes creadas por el proyecto (sin perder los datos de la base de datos que están en el volumen), ejecuta:
\`\`\`bash
docker compose down
\`\`\`
