# 📚 API MiniBlog

API REST desarrollada con **Node.js**, **Express** y **PostgreSQL** como parte del **Proyecto Integrador M2 de Soy Henry**.

## 📖 Contexto

Este proyecto fue desarrollado simulando el rol de **Backend Developer Junior** en **DevSpark**, una startup que está construyendo la primera versión de su servicio de contenidos **MiniBlog**.

El objetivo fue desarrollar una API REST estable y documentada que permita administrar **autores**, **publicaciones** y **comentarios**, sirviendo como base para futuras integraciones con frontend, autenticación y nuevas funcionalidades.

La API implementa:

- CRUD completo de autores.
- CRUD completo de publicaciones.
- Creación y consulta de comentarios.
- Relación entre autores, publicaciones y comentarios.
- Persistencia de datos en PostgreSQL.
- Integridad referencial mediante claves foráneas.
- Eliminación en cascada mediante `ON DELETE CASCADE`.
- Arquitectura separada en routes, controllers y services.
- Validaciones de datos.
- Consultas SQL parametrizadas.
- Manejo centralizado de errores.
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
- Railway

---

# 📋 Requisitos

- Node.js 22 o superior
- PostgreSQL
- npm

---

# 📁 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Paul-M-Corrales/ProyectoM2_PaulCorrales-
```

Ingresar al proyecto:

```bash
cd ProyectoM2_PaulCorrales-
```

Instalar dependencias:

```bash
npm install
```

---

# ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog_db
DB_USER=postgres
DB_PASSWORD=tu_password
PORT=3000
```

Configurar los valores de acuerdo con la instalación local de PostgreSQL.

---

# 🗄️ Base de datos

Crear una base de datos PostgreSQL y ejecutar el script:

```text
src/db/setup.sql
```

Luego cargar los datos iniciales:

```text
src/db/seed.sql
```

La base de datos contiene tres entidades principales:

- `authors`
- `posts`
- `comments`

Las publicaciones están asociadas a autores y los comentarios están asociados tanto a publicaciones como a autores.

Las relaciones utilizan claves foráneas y `ON DELETE CASCADE` para mantener la integridad referencial.

---

# 🏗️ Arquitectura

El proyecto separa las responsabilidades principales en distintas capas:

```text
src/
├── controllers/
│   ├── authors.controller.js
│   ├── posts.controller.js
│   └── comments.controller.js
│
├── services/
│   ├── authors.service.js
│   ├── posts.service.js
│   └── comments.service.js
│
├── routes/
│   ├── authors.routes.js
│   ├── posts.routes.js
│   └── comments.routes.js
│
├── db/
│   ├── config.js
│   ├── setup.sql
│   ├── seed.sql
│   └── migrations/
│
└── docs/
    └── openapi.yaml
```

Los **controllers** gestionan las solicitudes y respuestas HTTP, mientras que los **services** contienen la lógica de acceso a datos mediante PostgreSQL.

---

# ▶️ Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

---

# 🧪 Ejecutar los tests

```bash
npm test
```

Los tests automatizados utilizan **Vitest** y **Supertest**.

---

# 📖 Documentación

La documentación OpenAPI está disponible mediante Swagger UI.

### Local

```text
http://localhost:3000/docs
```

### Producción

```text
https://proyectom2paulcorrales-production.up.railway.app/docs
```

---

# 📌 Endpoints

## Authors

| Método | Endpoint       |
| ------ | -------------- |
| GET    | `/authors`     |
| GET    | `/authors/:id` |
| POST   | `/authors`     |
| PUT    | `/authors/:id` |
| DELETE | `/authors/:id` |

## Posts

| Método | Endpoint                  |
| ------ | ------------------------- |
| GET    | `/posts`                  |
| GET    | `/posts/:id`              |
| GET    | `/posts/author/:authorId` |
| POST   | `/posts`                  |
| PUT    | `/posts/:id`              |
| DELETE | `/posts/:id`              |

## Comments

| Método | Endpoint                 |
| ------ | ------------------------ |
| GET    | `/comments`              |
| GET    | `/comments/post/:postId` |
| POST   | `/comments`              |

---

# ⭐ Extra Credit — Comments

Como funcionalidad adicional se incorporó la entidad `comments`.

Cada comentario contiene:

- Contenido.
- Publicación asociada.
- Autor asociado.
- Fecha de creación.

La tabla utiliza claves foráneas hacia `posts` y `authors`.

```text
comments
├── id
├── content
├── post_id → posts(id)
├── author_id → authors(id)
└── created_at
```

Las relaciones utilizan:

```sql
ON DELETE CASCADE
```

De esta manera, al eliminar una publicación se eliminan automáticamente sus comentarios asociados, y al eliminar un autor también se eliminan sus comentarios.

La funcionalidad fue incorporada siguiendo la arquitectura existente mediante:

- `comments.routes.js`
- `comments.controller.js`
- `comments.service.js`

Los endpoints de comentarios también se encuentran disponibles en la documentación Swagger.

La funcionalidad está desplegada y operativa en Railway.

---

# 🚂 Deploy

La aplicación y la base de datos PostgreSQL se encuentran desplegadas en **Railway**.

### API

https://proyectom2paulcorrales-production.up.railway.app/

### Swagger

https://proyectom2paulcorrales-production.up.railway.app/docs

---

# 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó ChatGPT como herramienta de apoyo para:

- Resolver dudas sobre Express y PostgreSQL.
- Revisar consultas SQL.
- Analizar errores durante la integración con PostgreSQL.
- Resolver inconvenientes durante el deployment en Railway.
- Revisar la documentación OpenAPI.
- Analizar la separación de responsabilidades entre controllers y services.
- Implementar y verificar el Extra Credit de comentarios.
- Mejorar la documentación del proyecto.

## 📸 Capturas de consultas realizadas con IA

### Consulta 1

Agregar aquí captura de una consulta realizada durante el desarrollo.

### Consulta 2

Agregar aquí captura de una segunda consulta realizada durante el desarrollo.

---

# 👨‍💻 Autor

**Paúl Matías Corrales**

- GitHub: https://github.com/Paul-M-Corrales
- LinkedIn: https://www.linkedin.com/in/paúl-corrales-90957b237/
