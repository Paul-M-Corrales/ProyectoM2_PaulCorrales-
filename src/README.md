# 📚 API MiniBlog

API REST desarrollada con **Node.js**, **Express** y **PostgreSQL** como parte del **Proyecto Integrador M2 de Soy Henry**.

## 📖 Contexto

Este proyecto fue desarrollado simulando el rol de **Backend Developer Junior** en **DevSpark**, una startup que está construyendo la primera versión de su servicio de contenidos **MiniBlog**.

El objetivo fue desarrollar una API REST estable y documentada que permita administrar **autores** y **publicaciones**, sirviendo como base para futuras integraciones con frontend, autenticación y nuevas funcionalidades.

La API implementa:

- CRUD completo de autores y publicaciones.
- Persistencia de datos en PostgreSQL.
- Validaciones de datos.
- Consultas SQL parametrizadas.
- Tests automatizados.
- Documentación OpenAPI con Swagger.
- Deploy en Railway.

---

# 🌐 Demo

### API

https://proyectom2paulcorrales-production.up.railway.app/

### Swagger

https://proyectom2paulcorrales-production.up.railway.app/docs

---

# 🚀 Tecnologías

- Node.js 22
- Express 5
- PostgreSQL
- pg
- Vitest
- Supertest
- Swagger UI Express
- OpenAPI 3.1

---

# 📋 Requisitos

- Node.js 22 o superior
- PostgreSQL
- npm

---

# 📁 Instalación

Clonar el repositorio

````bash
git clone https://github.com/Paul-M-Corrales/ProyectoM2_PaulCorrales-

Ingresar al proyecto

```bash
cd ProyectoM2_PaulCorrales
````

Instalar dependencias

```bash
npm install
```

---

# ⚙️ Variables de entorno

Crear un archivo `.env`

```env
DATABASE_URL=postgresql://usuario:password@host:5432/database
PORT=3000
```

---

# 🗄️ Base de datos

Crear una base de datos PostgreSQL y ejecutar el script de creación:

```sql
setup.sql
```

Luego cargar los datos iniciales:

```sql
seed.sql
```

---

# ▶️ Ejecutar el proyecto

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

---

# 🧪 Ejecutar los tests

```bash
npm test
```

---

# 📖 Documentación

La documentación OpenAPI está disponible mediante Swagger UI.

Local:

```
http://localhost:3000/docs
```

Producción:

```
https://proyectom2paulcorrales-production.up.railway.app/docs
```

---

# 📌 Endpoints

## Authors

| Método | Endpoint     |
| ------ | ------------ |
| GET    | /authors     |
| GET    | /authors/:id |
| POST   | /authors     |
| PUT    | /authors/:id |
| DELETE | /authors/:id |

## Posts

| Método | Endpoint                |
| ------ | ----------------------- |
| GET    | /posts                  |
| GET    | /posts/:id              |
| GET    | /posts/author/:authorId |
| POST   | /posts                  |
| PUT    | /posts/:id              |
| DELETE | /posts/:id              |

---

# 🚂 Deploy

La aplicación se encuentra desplegada en Railway.

API

https://proyectom2paulcorrales-production.up.railway.app/

Swagger

https://proyectom2paulcorrales-production.up.railway.app/docs

---

# 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó ChatGPT como herramienta de apoyo para:

- Resolver dudas sobre Express y PostgreSQL.
- Revisar consultas SQL.
- Detectar errores durante la integración con PostgreSQL.
- Resolver inconvenientes durante el deployment en Railway.
- Revisar la documentación OpenAPI.
- Mejorar la documentación del proyecto (README).

## 📸 Capturas de consultas realizadas con IA

### Consulta 1

![Consulta IA 1](docs/AI/IA-1.png)

### Consulta 2

![Consulta IA 2](docs/AI/IA-2.png)

---

# 👨‍💻 Autor

**Paúl Matías Corrales**

- GitHub: https://github.com/Paul-M-Corrales
- LinkedIn: https://www.linkedin.com/in/paúl-corrales-90957b237/
