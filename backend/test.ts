class Land {
  walk() {
    console.log('Walking...');
  }
}

class Water {
  swim() {
    console.log('Swimming...');
  }
}

class Frog {}

Object.assign(Frog.prototype, Land.prototype);
Object.assign(Frog.prototype, Water.prototype);

const frog = new Frog()

frog.walk()
frog.swim()
