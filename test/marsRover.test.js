const chai = require('chai');
const expect = require('chai').expect;
const MarsRover = require('../src/MarsRover');

describe('MarsRover', () => {
  describe('When given a position outside of bounds', () => {
    it('Should not allow new rovers outside of plateau bounds', () => {
      const marsRover = new MarsRover(5, 5)

      const roverOne = marsRover.addRover(6, 6, 'N')
      marsRover.runMission('MRM')

      const roverTwo = marsRover.addRover(0, 6, 'N')
      marsRover.runMission('MRM')

      const roverThree = marsRover.addRover(6, 0, 'N')
      marsRover.runMission('MRM')

      expect(marsRover.getFinalPositions()).to.eql([])
      expect(roverOne).to.eql(false)
      expect(roverTwo).to.eql(false)
      expect(roverThree).to.eql(false)
    })

    it('Should not move rover out of plateau bounds', () => {
      const marsRover = new MarsRover(5, 5)

      marsRover.addRover(0,0,'N')
      marsRover.runMission('MMMMMM')

      marsRover.addRover(1,5,'S')
      marsRover.runMission('MMMMMM')

      marsRover.addRover(0,2,'E')
      marsRover.runMission('MMMMMM')

      marsRover.addRover(5,1,'W')
      marsRover.runMission('MMMMMM')

      expect(marsRover.getFinalPositions()).to.eql(['0 5 N', '1 0 S', '5 2 E', '0 1 W'])
    })
  })

  describe('Output final rover positions', () => {
    it('Should print a list of a single rover position', () => {
      const marsRover = new MarsRover(5, 5)
      const roverOne = marsRover.addRover(3, 1, 'E')
      marsRover.runMission('M')

      expect(marsRover.getFinalPositions()).to.eql(['4 1 E'])
    })

    it('Should print a list of multiple rover positions', () => {
      const marsRover = new MarsRover(5, 5)
      const roverOne = marsRover.addRover(1, 2, 'N')
      marsRover.runMission('LMLMLMLMM')
      const roverTwo = marsRover.addRover(3, 3, 'E')
      marsRover.runMission('MMRMMRMRRM')

      expect(marsRover.getFinalPositions()).to.eql(['1 3 N', '5 1 E'])
    })
  })

  describe('Get existing rovers', () => {
    it('Should return true or false if rover exists in given position', () => {
      const marsRover = new MarsRover(5, 5)
      const roverOne = marsRover.addRover(1, 2, 'N')
      const found1 = marsRover.getRover(1, 2)
      const found2 = marsRover.getRover(1, 1)

      expect(found1).to.eql(true)
      expect(found2).to.eql(false)
    })

    it('Should not allow rovers to drive over one another', () => {
      const marsRover = new MarsRover(5, 5)

      marsRover.addRover(0,0,'N')
      marsRover.runMission('MRM')

      marsRover.addRover(1,0,'N')
      marsRover.runMission('MMM')

      marsRover.addRover(0,1,'E')
      marsRover.runMission('MMMLMRMRM')

      expect(marsRover.getFinalPositions()).to.eql(['1 1 E', '1 0 N', '1 2 S'])
    })
  })

})
