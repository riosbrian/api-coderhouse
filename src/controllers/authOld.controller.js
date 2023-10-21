import * as AuthService from '../services/auth.service.js';

export const POSTRegister = (req, res) => {
  // 1. validar si se creo el usuario
  console.log(req.user);
  if (req.user.error === true)
    return res.status(401).send({
      message: `Error al crear el usuario`,
      redirect: false,
    });
  // 2. crear token
  const token = AuthService.createToken(req.user);
  // 3. crear cookie y guardar token

  // 4. enviar respuesta al front
  res.status(200).send({
    message: 'Usuario registrado satisfactoriamente',
    redirect: true,
    url: '/products',
  });
};
