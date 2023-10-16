const mongoose = require('mongoose');
const Usuario = require('./modelos/usuario'); // Asegúrate de que la ruta al modelo sea correcta

describe('Usuario Model', () => {
  beforeAll(async () => {
    // Conectar a la base de datos antes de ejecutar las pruebas
    await mongoose.connect('mongodb://localhost/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Desconectar de la base de datos después de ejecutar las pruebas
    await mongoose.disconnect();
  });

  // A continuación, puedes definir tus pruebas utilizando la función test de Jest
  test('Crea un usuario válido', async () => {
    const usuarioData = {
      name: 'John Doe',
      address: '123 Main St',
      email: 'john@example.com',
    };

    const usuario = new Usuario(usuarioData);

    const savedUsuario = await usuario.save();
    expect(savedUsuario._id).toBeDefined();
    expect(savedUsuario.name).toBe(usuarioData.name);
    // Agrega más expectativas según tus necesidades
  });

  test('Intenta crear un usuario sin un campo requerido', async () => {
    const usuarioData = {
      // Deja uno o más campos requeridos sin definir
    };

    const usuario = new Usuario(usuarioData);

    let error;
    try {
      await usuario.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    // Agrega más expectativas según tus necesidades
  });

  // Más pruebas aquí
});
