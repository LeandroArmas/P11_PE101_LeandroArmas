import "mocha";
import { expect } from "chai";
import { ColeccionCartas } from "../src/coleccion.js";

describe('Test para eliminarCarta asincrono', function() {
    it('Debería eliminar correctamente una carta existente', (done) => {
        const coleccion = new ColeccionCartas();
        const usuario = 'usuario_test';
        const idCarta = 2;

        coleccion.eliminarCarta(idCarta, usuario, (error) => {
        expect(error).to.be.undefined;
        done();
        });
    });

    it('Debería devolver un error si se intenta eliminar una carta inexistente', (done) => {
        const coleccion = new ColeccionCartas();
        const usuario = 'usuario_test';
        const idCartaInexistente = 100;

        coleccion.eliminarCarta(idCartaInexistente, usuario, (error) => {
        expect(error).to.not.be.undefined;
        done();
        });
    });

    it('Debería eliminar correctamente una carta existente de otro usuario', (done) => {
        const coleccion = new ColeccionCartas();
        const usuario = 'usuario2';
        const idCarta = 2;

        coleccion.eliminarCarta(idCarta, usuario, (error) => {
        expect(error).to.be.undefined;
        done();
        });
    });

    it('Debería devolver un error si se intenta eliminar una carta inexistente de otro usuario', (done) => {
        const coleccion = new ColeccionCartas();
        const usuario = 'usuario_2';
        const idCartaInexistente = 100;

        coleccion.eliminarCarta(idCartaInexistente, usuario, (error) => {
        expect(error).to.not.be.undefined;
        done();
        });
    });
});

describe('Test para mostrarCarta asincrono', function() {
    it('Debería encontrar la carta', (done) => {
        const coleccion = new ColeccionCartas();
        const usuario = 'usuario_test';
        const idCarta = 4;

        coleccion.mostrarCarta(idCarta, usuario, (error, carta) => {
        expect(carta).to.exist;
        done();
        });
    });
    
    it('Debería mostrar correctamente la información de una carta existente', (done) => {
        const coleccion = new ColeccionCartas();
        const usuario = 'usuario_test';
        const idCarta = 4;

        coleccion.mostrarCarta(idCarta, usuario, (error, carta) => {
        expect(error).to.be.undefined;
        expect(carta).to.exist;
        done();
        });
    });

    it('Debería devolver un error si se intenta mostrar una carta inexistente', (done) => {
        const coleccion = new ColeccionCartas();
        const usuario = 'usuario_test';
        const idCartaInexistente = 100;

        coleccion.mostrarCarta(idCartaInexistente, usuario, (error, carta) => {
        expect(error).to.not.be.undefined;
        expect(carta).to.be.undefined;
        done();
        });
    });
});
