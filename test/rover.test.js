const chai = require('chai');
const expect = require('chai').expect;
const Rover = require('../src/Rover');

describe('Rover', () => {
  describe('Move rover by specified unit', () => {
    it('Should move one unit North', () => {
      const rover = new Rover(1, 2, 'N');

      rover.move();

      expect(rover.getRoverPosition()).to.eql({
        x: 1,
        y: 3,
        direction: 'N',
      })
    })

    it('Should move one unit South', () => {
      const rover = new Rover(1, 2, 'S');

      rover.move();

      expect(rover.getRoverPosition()).to.eql({
        x: 1,
        y: 1,
        direction: 'S',
      })
    })

    it('Should move one unit East', () => {
      const rover = new Rover(1, 2, 'E');

      rover.move();

      expect(rover.getRoverPosition()).to.eql({
        x: 2,
        y: 2,
        direction: 'E',
      })
    })

    it('Should move one unit West', () => {
      const rover = new Rover(1, 2, 'W');

      rover.move();

      expect(rover.getRoverPosition()).to.eql({
        x: 0,
        y: 2,
        direction: 'W',
      })
    })

    it('Should move two units North', () => {
      const rover = new Rover(1, 2, 'N');

      rover.move();
      rover.move();

      expect(rover.getRoverPosition()).to.eql({
        x: 1,
        y: 4,
        direction: 'N',
      })
    })

  })

  describe('Turn in place', () => {
    it('Should rotate to the left', () => {
      const rover = new Rover(1, 2, 'N');

      rover.turn('L');

      expect(rover.getRoverPosition()).to.eql({
        x: 1,
        y: 2,
        direction: 'W',
      })
    })

    it('Should rotate to the right', () => {
      const rover = new Rover(1, 2, 'S');

      rover.turn('R');

      expect(rover.getRoverPosition()).to.eql({
        x: 1,
        y: 2,
        direction: 'W',
      })
    })

  })

})
