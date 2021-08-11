# Backend Test

Backend Test es una API de prueba.

## Instalation
Se necesita tener instalado [Node.js](https://nodejs.org/es/) y [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) para instalar Backend Test.

```bash
npm install
```

# Públicos
Estos endpoints no necesitan ninguna autorización.
* `POST /v1/login` - Ingresar como usuario.
```no-highlight
Request.body
{
    "email": "a4@test.com",
    "password": "3312changos"
}
Response
{
  "accessToken": "token_generico"
}
```
* `POST /v1/register` - Registra un usuario nuevo en la BD.
    * **Obligatiorio**: name, email, password
    * **Opcional**: phone
```no-highlight
Request.body
{
	"name": "Prueba1",
	"phone": 3312734514,
	"email": "test2@test.com",
	"password": "3312"
}
```

# Usuarios
En estos endpoints se necesita enviar un token en la url con el nombre **access_token**.
Ejemplo: **/v1/user/endpoint?access_token=_token_generico_**

* `PATCH /v1/user/update` - Actualiza la información del usuario.
    * **Opcional**: name, email, password, phone
```no-highlight
Request.body
{
	"name": "Prueba1",
	"phone": 3312734514,
	"email": "test2@test.com",
	"password": "3312"
}
```

* `POST /v1/user/add-balance` - Agrega saldo a una cuenta registrada.
    * **Obligatorio**: id, amount
```no-highlight
Request.body
{
	"id": "6112a4967638b3d7c44ed206",
	"amount": 10
}
```

* `GET /v1/user/parkings` - Retorna la lista de estacionamientos.
* `GET /v1/user/active-parkings` - Retorna la lista de estacionamientos con status 0.

* `POST /v1/user/pay-parking` - Paga un ticket de estacionamiento.
    * **Obligatorio**: userId, amount, parkingId
```no-highlight
Request.body
{
	"userId": "6112a4967638b3d7c44ed206",
	"amount": 10,
	"parkingId": "5c6f1ae162a5b64365190764"
}
```

* `GET /v1/user/trades` - Retorna las transacciones realizadas por el usuario.
    * **Obligatorio**: userId
```no-highlight
Request.body
{
	"userId": "6112a4967638b3d7c44ed206"
}
```

# Administrador
En estos endpoints se necesita enviar un token en la url con el nombre **access_token**.
Ejemplo: **/v1/admin/endpoint?access_token=_token_generico_**
* `POST /v1/admin/trade-report` - Este endpoint retorna un reporte en formato CSV de las transacciones realizadas entre ambas fechas.
En el caso de incluir el **parkingId** genera un reporte de ese estacionamiento entre ambas fechas.
    * **Obligatiorio**: initialDate, finalDate
    * **Opcional**: parkingId
```no-highlight
Request.body
{
	"initialDate": "2021,8,10",
	"finalDate": "2021,8,12",
	"parkingId": "59246b746e07b94a77627a20"
}
Response
{
  "accessToken": "token_generico"
}
```