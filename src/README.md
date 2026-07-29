# 📚 Authors & Posts API

API REST desarrollada con Node.js, Express y PostgreSQL.

Permite administrar autores y publicaciones mediante operaciones CRUD.

---

## 🌐 Demo

**API:**

https://TU-URL-DE-RAILWAY.up.railway.app

**Swagger:**

https://TU-URL-DE-RAILWAY.up.railway.app/docs

---

## 🚀 Tecnologías

- Node.js
- Express 5
- PostgreSQL
- pg
- Vitest
- Supertest
- Swagger UI
- OpenAPI 3.1

---

## 📁 Instalación

Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto

```bash
cd M2
```

Instalar dependencias

```bash
npm install
```

---

## ⚙️ Variables de entorno

Crear un archivo `.env`

```env
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

---

## 🗄️ Base de datos

Crear la base de datos y ejecutar:

```sql
setup.sql
```

Luego cargar los datos iniciales:

```sql
seed.sql
```

---

## ▶️ Ejecutar

Modo desarrollo

```bash
npm run dev
```

Producción

```bash
npm start
```

---

## 🧪 Ejecutar Tests

```bash
npm test
```

---

## 📖 Documentación

Swagger UI disponible en:

```
http://localhost:3000/docs
```

---

## 📌 Endpoints

### Authors

- GET /authors
- GET /authors/:id
- POST /authors
- PUT /authors/:id
- DELETE /authors/:id

### Posts

- GET /posts
- GET /posts/:id
- GET /posts/author/:authorId
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id

---

## 🚂 Deploy

Aplicación preparada para desplegarse en Railway.

---

## 👨‍💻 Autor

Paúl Matías Corrales
