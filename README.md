# API de Sistema de Gestión de Alumnos

## 📖 Descripción
Student Administrator API permite la gestión de usuarios y materias dentro de un sistema de administración escolar. Proporciona funciones para registrar usuarios, inscribir estudiantes en materias, gestionar información de materias y manejar autenticación de usuarios.

---

## 🔐 **Autenticación**
- **Registrar Usuario** → Registra un nuevo usuario en la plataforma.
- **Iniciar Sesión** → Permite que un usuario inicie sesión en la aplicación.

---

## 👤 **Gestión de Usuarios**
- **Buscar Usuario por ID** → Obtiene la información de un usuario específico.
- **Obtener Lista de Usuarios** → Devuelve todos los usuarios registrados en el sistema.
- **Actualizar Información de Usuario** → Modifica los datos de un usuario existente.
- **Eliminar Usuario** → Cambia el estado del usuario para indicar que ha sido eliminado.

---

## 📚 **Gestión de Materias**
- **Agregar Materia** → Permite registrar una nueva materia en el sistema.
- **Inscribir Usuario en Materia** → Inscribe a un usuario en una materia específica.
- **Actualizar Información de Materia** → Modifica los datos de una materia existente.
- **Desinscribir Usuario de Materia** → Remueve a un usuario de una materia en la que estaba inscrito.
- **Eliminar Materia** → Elimina una materia del sistema.
- **Obtener Materias de un Usuario** → Devuelve la lista de materias en las que un usuario está inscrito.

---

## 🚀 **Uso de la API**
Para usar esta API, realiza solicitudes HTTP a las rutas especificadas utilizando herramientas como Postman o cURL. Asegúrate de enviar los datos en formato JSON cuando sea necesario.

---

## Endpoints de la API

### Autenticación

- **Registrar Usuario**
    - **URL:** `/studentAdministrator/v1/auth/register`
    - **Método:** `Post`
    - **Cuerpo:**
         ```json
            {
                "name": "string",
                "surname": "string",
                "username": "string",
                "profilePicture": "file",
                "email": "string",
                "password": "string",
                "phone": "string",
                "card": "string",
                "role": "string"
            }
        ```

###  Iniciar Sesión
- **URL:** `/studentAdministrator/v1/auth/login`
- **Método:** `POST`
- **Cuerpo:**
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```

### Autenticación

#### Registrar Usuario
- **Método:** `POST`
- **URL:** `/studentAdministrator/v1/auth/register`
- **Cuerpo (JSON):**
```json
{
    "name": "string",
    "surname": "string",
    "username": "string",
    "profilePicture": "file",
    "email": "string",
    "password": "string",
    "phone": "string",
    "card": "string",
    "role": "string"
}
```

#### Login
- **Método:** `POST`
- **URL:** `/studentAdministrator/v1/auth/login`
- **Cuerpo (JSON):**
```json
{
    "email": "string",
    "password": "string"
}
```

---

### Matters

#### Agregar Materia
- **Método:** `POST`
- **URL:** `/studentAdministrator/v1/matter/addMatter`
- **Cuerpo (JSON):**
```json
{
    "name": "string",
    "description": "string"
}
```

#### Inscribir Usuario en Materia
- **Método:** `PATCH`
- **URL:** `/studentAdministrator/v1/matter/enrollUser/:uid`
- **Parámetros:**
  - `uid`: ID de la materia a la que se desea inscribir al usuario
  - `userUid`: ID del usuario que se va a inscribir
- **Cuerpo (JSON):**
```json
{
    "userUid": "string"
}
```

#### Actualizar Información de la Materia
- **Método:** `PATCH`
- **URL:** `/studentAdministrator/v1/matter/updateInfoMatter/:uid`
- **Parámetros:**
  - `uid`: ID de la materia a actualizar
  - `KeyUserUid`: ID del usuario con permiso para editar la materia (Profesor)
- **Cuerpo (JSON):**
```json
{
    "KeyUserUid": "string",
    "newName": "string",
    "newDescription": "string"
}
```

#### Desinscribir Usuario de Materia
- **Método:** `PATCH`
- **URL:** `/studentAdministrator/v1/matter/deleteUserFromMatter/:uid`
- **Parámetros:**
  - `uid`: ID de la materia
  - `KeyUserUid`: ID del usuario con permiso para editar la materia (Profesor)
- **Cuerpo (JSON):**
```json
{
    "KeyUserUid": "string",
    "userDeleteUid": "string"
}
```

#### Eliminar Materia
- **Método:** `PATCH`
- **URL:** `/studentAdministrator/v1/matter/deleteMatter/:uid`
- **Parámetros:**
  - `uid`: ID de la materia a eliminar
  - `KeyUserUid`: ID del usuario con permiso para editar la materia (Profesor)
- **Cuerpo (JSON):**
```json
{
    "KeyUserUid": "string"
}
```

#### Obtener Materias de un Usuario
- **Método:** `GET`
- **URL:** `/studentAdministrator/v1/matter/getMatters/:uid`
- **Parámetros:**
  - `uid`: ID del usuario que desea ver sus clases

---

### Usuarios

#### Buscar Usuario por ID
- **Método:** `GET`
- **URL:** `/studentAdministrator/v1/user/findUser/:uid`
- **Parámetros:**
  - `uid`: ID del usuario a buscar

#### Obtener Todos los Usuarios
- **Método:** `GET`
- **URL:** `/studentAdministrator/v1/user/`

#### Actualizar Usuario
- **Método:** `PATCH`
- **URL:** `/studentAdministrator/v1/user/updateInfoUser/:updateUid`
- **Parámetros:**
  - `updateUid`: ID del usuario a actualizar
- **Cuerpo (JSON):**
```json
{
    "name": "string"
}
```

#### Eliminar Usuario (Cambio de Estado)
- **Método:** `PATCH`
- **URL:** `/studentAdministrator/v1/user/deleteUser/:uid`
- **Parámetros:**
  - `uid`: ID del usuario a eliminar

