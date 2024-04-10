/* eslint-disable @typescript-eslint/no-unused-vars */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ColeccionCartas } from './coleccion.js';
import { Carta, Color, Tipo, Rareza } from './carta.js';

const coleccion = new ColeccionCartas;

/**
 * Configuración yargs para el comando 'add'.
 */
let argv = yargs(hideBin(process.argv))
  .command(
    'add',
    'Añade una carta',
    {
      usuario: { description: 'Nombre del usuario', type: 'string', demandOption: true },
      id: { description: 'ID de la carta', type: 'number', demandOption: true },
      nombre: { description: 'Nombre de la carta', type: 'string', demandOption: true },
      costeMana: { description: 'Coste de maná de la carta', type: 'number', demandOption: true },
      color: { description: 'Color de la carta', type: 'string', choices: ['Blanco', 'Azul', 'Negro', 'Rojo', 'Verde', 'Incoloro', 'Multicolor'], demandOption: true },
      tipo: { description: 'Tipo de la carta', type: 'string', choices: ['Tierra', 'Criatura', 'Encantamiento', 'Conjuro', 'Instantaneo', 'Artefacto', 'Planeswalker'], demandOption: true },
      rareza: { description: 'Rareza de la carta', type: 'string', choices: ['Comun', 'Infrecuente', 'Rara', 'Mitica'], demandOption: true },
      textoReglas: { description: 'Reglas del texto de la carta', type: 'string', demandOption: true },
      fuerzaResistencia: { description: 'Fuerza y resistencia de la carta tipo Criatura', type: 'array', coerce: (arg) => arg.map(Number) },
      marcasLealtad: { description: 'Lealtad de la carta tipo Planeswalker', type: 'number' },
      valorMercado: { description: 'Valor de mercado de la carta', type: 'number', demandOption: true },
    },
    (argv) => {
      if (argv.tipo === 'Criatura' && argv.fuerzaResistencia === undefined) {
        throw new Error('Las criaturas necesitan también un atributo Fuerza/Resistencia');
      }
      if (argv.tipo === 'Planeswalker' && argv.marcasLealtad === undefined) {
        throw new Error('Los Planeswalkers necesitan también un atributo Marcas de Lealtad');
      }
      const carta: Carta = new Carta (
        argv.id,
        argv.nombre,
        argv.costeMana,
        argv.color as Color,
        argv.tipo as Tipo,
        argv.rareza as Rareza,
        argv.textoReglas,
        argv.valorMercado,
        argv.fuerzaResistencia,
        argv.marcasLealtad,
      );
      coleccion.agregarCarta(carta, argv.usuario);
    },
  )
  .help().argv;

/**
 * Configuración yargs para el comando 'update'.
 */
argv = yargs(hideBin(process.argv))
  .command(
    'update',
    'Actualiza una carta',
    {
      usuario: { description: 'Nombre del usuario', type: 'string', demandOption: true },
      id: { description: 'ID de la carta', type: 'number', demandOption: true },
      nombre: { description: 'Nombre de la carta', type: 'string', demandOption: true },
      costeMana: { description: 'Coste de maná de la carta', type: 'number', demandOption: true },
      color: { description: 'Color de la carta', type: 'string', choices: ['Blanco', 'Azul', 'Negro', 'Rojo', 'Verde', 'Incoloro', 'Multicolor'], demandOption: true },
      tipo: { description: 'Tipo de la carta', type: 'string', choices: ['Tierra', 'Criatura', 'Encantamiento', 'Conjuro', 'Instantaneo', 'Artefacto', 'Planeswalker'], demandOption: true },
      rareza: { description: 'Rareza de la carta', type: 'string', choices: ['Comun', 'Infrecuente', 'Rara', 'Mitica'], demandOption: true },
      textoReglas: { description: 'Reglas del texto de la carta', type: 'string', demandOption: true },
      fuerzaResistencia: { description: 'Fuerza y resistencia de la carta tipo Criatura', type: 'array', coerce: (arg) => arg.map(Number) },
      marcasLealtad: { description: 'Lealtad de la carta tipo Planeswalker', type: 'number' },
      valorMercado: { description: 'Valor de mercado de la carta', type: 'number', demandOption: true },
    },
    (argv) => {
      if (argv.tipo === 'Criatura' && argv.fuerzaResistencia === undefined) {
        throw new Error('Las criaturas necesitan también un atributo Fuerza/Resistencia');
      }
      if (argv.tipo === 'Planeswalker' && argv.marcasLealtad === undefined) {
        throw new Error('Los Planeswalkers necesitan también un atributo Marcas de Lealtad');
      }
      const carta: Carta = new Carta (
        argv.id,
        argv.nombre,
        argv.costeMana,
        argv.color as Color,
        argv.tipo as Tipo,
        argv.rareza as Rareza,
        argv.textoReglas,
        argv.valorMercado,
        argv.fuerzaResistencia,
        argv.marcasLealtad,
      );
      coleccion.actualizarCarta(carta, argv.usuario);
    },
  )
  .help().argv;

/**
 * Configuración yargs para el comando 'remove'.
 */
argv = yargs(hideBin(process.argv))
  .command(
    'remove',
    'Elimina una carta',
    {
      usuario: { description: 'Nombre del usuario', type: 'string', demandOption: true },
      id: { description: 'ID de la carta', type: 'number', demandOption: true },
    },
    (argv) => {
      coleccion.eliminarCarta(argv.id, argv.usuario, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Carta eliminada de la colección de ${argv.usuario}!`);
        }
      });
    },
  )
  .help().argv;

/**
 * Configuración yargs para el comando 'list'.
 */
argv = yargs(hideBin(process.argv))
  .command(
    'list',
    'Lista las cartas de la coleccion',
    {
      usuario: { description: 'Nombre del usuario', type: 'string', demandOption: true },
    },
    (argv) => {
      coleccion.listarCartas(argv.usuario);
    },
  )
  .help().argv;

/**
 * Configuración yargs para el comando 'show'.
 */
argv = yargs(hideBin(process.argv))
  .command(
    'show',
    'Mostrar la info de una carta',
    {
      usuario: { description: 'Nombre del usuario', type: 'string', demandOption: true },
      id: { description: 'ID de la carta', type: 'number', demandOption: true },
    },
    (argv) => {
      coleccion.mostrarCarta(argv.id, argv.usuario, (error, carta) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Información de la carta:');
          console.log(carta);
        }
      });
    },
  )
  .help().argv;