const fs = require('fs');

// Create a writable stream to the sample.txt file
const writableStream = fs.createWriteStream('sample.txt');

// Compute prime numbers up to 100
const primes = [];
for (let i = 2; i <= 100; i++) {
  let isPrime = true;
  for (let j = 2; j <= Math.sqrt(i); j++) {
    if (i % j === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    primes.push(i);
  }
}

// Write the prime numbers to the writable stream
primes.forEach((prime) => {
  writableStream.write(`${prime}\n`);
});

// Close the writable stream and log a message to the console
writableStream.end(() => {
  console.log('Task completed');
});