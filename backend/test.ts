interface WorkableWorker {
  work(): void;
}

interface EatableWorker {
  eat(): void;
}

interface FlyableWorker {
  fly(): void;
}

class HumanWorker implements WorkableWorker, EatableWorker {
  work(): void {
    console.log('Human working');
  }

  eat(): void {
    console.log('Human eating');
  }
}

class RobotWorker implements WorkableWorker {
  work(): void {
    console.log('Robot working');
  }
}
interface IEmailService {
  send(message: string): void;
}

class NodeMailer implements IEmailService {
  send(message: string): void {
    console.log('Email send successfully');
  }
}

class NotificationManager {
  constructor(private _emailService: IEmailService) {}

  sendNotification(message: string): void {
    this._emailService.send(message);
  }
}

class FlyBird {
  fly(): void {
    console.log('Flying...');
  }
}

class NonFlyBird {
  walk(): void {
    console.log('Walking...');
  }
}

class Penguin extends NonFlyBird {}

class Crow extends FlyBird {}

// Client Code
const emailService = new NodeMailer();
const notification = new NotificationManager(emailService);
notification.sendNotification('Order placed');

const bird: NonFlyBird = new Penguin();
const bird2: FlyBird = new Crow();

bird.walk();
bird2.fly();

// interface Worker {
//   work(): void;
//   eat(): void;
//   fly(): void;
// }

// class HumanWorker implements Worker {
//   work(): void {
//     console.log('Human working');
//   }

//   eat(): void {
//     console.log('Human eating');
//   }

//   fly(): void {
//     throw new Error('Humans cant fly...');
//   }
// }

// class RobotWorker implements Worker {
//   work(): void {
//     console.log('Robot working');
//   }

//   eat(): void {
//     throw new Error('Robots cant eat....');
//   }
// }

// class EmailService {
//   send(message: string): void {
//     console.log('Email send successfully', message);
//   }
// }

// class NotificationManager {
//   private emailService = new EmailService();

//   sendNotification(message: string): void {
//     this.emailService.send(message);
//   }
// }

// class Bird {
//   fly(): void {
//     console.log('Flying...');
//   }
// }

// class Penguin extends Bird {
//   fly(): void {
//     throw new Error('Penguins cant fly....');
//   }
// }

// // Client Code
// const notification = new NotificationManager();
// notification.sendNotification('Order placed');

// const bird: Bird = new Penguin();
// bird.fly();
