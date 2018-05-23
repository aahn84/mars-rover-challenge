class Rover {
  constructor(x, y, direction) {
    this.state = {
      x,
      y,
      direction,
    }
  }

  turn(turnDir) {
    let newDirection = Rover.turnMap()[this.state.direction][turnDir];

    this.state.direction = newDirection;
  }

  move() {
    const moveDir = Rover.moveMap()[this.state.direction];

    let nextPosition = {
      x: this.state.x,
      y: this.state.y,
    }

    nextPosition[moveDir.plane] += moveDir.distance;

    this.state.x = nextPosition.x;
    this.state.y = nextPosition.y;
  }

  getRoverPosition() {
    return this.state;
  }

  static turnMap() {
    return({
      N: { L: 'W', R: 'E' },
      S: { L: 'E', R: 'W' },
      E: { L: 'N', R: 'S' },
      W: { L: 'S', R: 'N' },
    })
  };

  static moveMap() {
    return ({
      N: { plane: 'y', distance: +1 },
      S: { plane: 'y', distance: -1 },
      E: { plane: 'x', distance: +1 },
      W: { plane: 'x', distance: -1 },
    })
  };

}

// export default Rover;
module.exports = Rover;
