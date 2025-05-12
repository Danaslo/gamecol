/*
Usando Jest vamos a usar "falsificaciones" de los modelos para ver si el compotamiento es el esperado.
*/

const { listarJuegos } = require('../../controller/ColeccionController');
const Juego = require('../../model/Juego');
const Coleccion = require('../../model/Coleccion');

// Mock de los modelos con Jest
jest.mock('../../model/Juego');
jest.mock('../../model/Coleccion');
describe('listarJuegos', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { userId: 1 }; // Vamos a simular que buscamos la colección del usuario con ID 1:
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Mock (falsificación/imitación) del modelo colección con función findOne para ver si devuelve una colección:
        Coleccion.findOne.mockResolvedValue({
            id: 1
        });

        // Mock (falsificación/imitación) del modelo Juego con función findAll para ver si devuelve una lista de juegos:
        Juego.findAll.mockResolvedValue([
            { id: 1, nombre: 'Juego 1', imagen: 'imagen1.jpg' },
            { id: 2, nombre: 'Juego 2', imagen: 'imagen2.jpg' },
        ]);
    });

    // Definición del test (En Jest it = test):
    it('Devuelve una lista de juegos', async () => {
        await listarJuegos(req, res);

        //Salida esperada del test. Como las imágenes se guardan con la url completa, se comprueba que salgan con ésta.
        expect(res.json).toHaveBeenCalledWith({
            juegos: [
                { id: 1, nombre: 'Juego 1', imagen: 'http://172.18.1.3/uploads/imagen1.jpg' },
                { id: 2, nombre: 'Juego 2', imagen: 'http://172.18.1.3/uploads/imagen2.jpg' },
            ],
        });
    });
});
