# API de Sistema de Gestión de Alumnos

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

