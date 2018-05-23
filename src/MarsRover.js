const Rover = require('./Rover');

class MarsRover {
  constructor(gridX, gridY) {
    this.state = {
      gridX,
      gridY,
      roverFleet: [],
      activeRover: null,
    }
  }

  positionInBounds(x, y) {
    // confirm position exists within plateau
    if (x >= 0 &&
      y >= 0 &&
      x <= this.state.gridX &&
      y <= this.state.gridY) {
        return true;
      } else {
        return false;
      }
  }

  positionAvailable(x, y) {
    // confirm new position is not occupied by another rover
    if (this.positionInBounds(x, y) && !this.getRover(x, y)) {
      return true;
    } else {
      return false;
    }
  }

  addRover(x, y, direction) {
    // create and activate new rover at given position
    if (!this.positionAvailable(x, y) /*|| (!this.positionInBounds(x, y))*/) return false;

    const rover = new Rover(x, y, direction);
    this.state.roverFleet.push(rover);
    this.state.activeRover = rover;

    return this.state.roverFleet.length - 1;
  }

  getRover(x, y) {
    // get rover by position
    const foundRovers = this.state.roverFleet.find(rover => {
      let position = rover.getRoverPosition();
      let foundRover = position.x === x && position.y === y;

      return foundRover;
    })
    return !!foundRovers;
  }

  activateRover(index) {
    // activates rover at given position
    this.state.activeRover = this.state.roverFleet[index];

    return this.state.activeRover;
  }

  testMove() {
    // confirm next move is valid
    const moveDir = Rover.moveMap()[this.state.activeRover.state.direction];

    let nextPosition = {
      x: this.state.activeRover.state.x,
      y: this.state.activeRover.state.y,
    }

    nextPosition[moveDir.plane] += moveDir.distance;

    return ({
      nextX: nextPosition.x,
      nextY: nextPosition.y,
    })
  }

  runMission(commands) {
    if (!this.state.activeRover) {
      return false;
    }

    let split = commands.split('');
    for (let i = 0; i < split.length; i++) {
      let command = split[i];
      let activeX = this.state.activeRover.state.x;
      let activeY = this.state.activeRover.state.y;
      let nextPosition = this.testMove()

      if (command === 'M' && this.positionAvailable(nextPosition.nextX, nextPosition.nextY)) {
        this.state.activeRover.move();
      }

      if (command === 'L' || command === 'R') {
        this.state.activeRover.turn(command);
      }
    }

    return this.getFinalPositions();
  }

  getFinalPositions() {
    // returns final positions of rovers
    return this.state.roverFleet.map(rover => {
      let position = rover.getRoverPosition();

      return `${position.x} ${position.y} ${position.direction}`;
    })
  }

}

module.exports = MarsRover;
