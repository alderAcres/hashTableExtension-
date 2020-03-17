/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW

function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE);

  //if there's a value at index then handle collision
  //if not then create a new object to store the pair
  if(!this.storage[index]) {
    this.storage[index] = {
      [key] : value
    }
  } else {
    this.storage[index][key] = value;
  }

  //if the insertion op will take the occupied % to more than 75%
  //then double the storage size
  //and rehash everything in the bucket and reassign storage to a new bucket with rehashed key-value pairs

  if(this.isOverThresholdOf(75)) {
    this.doubleSize();
    let kvPairs = this.storage.reduce((acc, currentBucketSlot) => {
      if(currentBucketSlot !== undefined) {
        acc = {
          ...acc,
          ...currentBucketSlot
        }
      }
      return acc;
    }, {});

    let keys = Object.keys(kvPairs);

    for(let i = 0; i < keys.length; i++) {
      //get index for current key
      //call set to insert value to bucket
    }
    //looping over the current storage and get every key-value pairs out to rehash
  }
};

HashTable.prototype.get = function(key) {
  const index = hashCode(key, this.SIZE);

  if(!this.storage[index]) return undefined;

  return this.storage[index][key];
};

HashTable.prototype.remove = function(key) {
  const index = hashCode(key, this.SIZE);

  if(!this.storage[index]) return undefined;

  let deletedValue = this.storage[index][key];

  delete this.storage[index][key];

  //remove the entire object if there's no pairs left.
  if(Object.keys(this.storage[index]).length === 0) {
    delete this.storage[index];
  }

  return deletedValue;
};

//Checking occupied spot could be done by having a property in "this" object in
//the constructor itself and update as we set or delete


//this function will check individual storage to see
//if there's anything in each spot
//and return the number of occupied
HashTable.prototype.checkOccupied = function () {
  let count = 0;
  for(let i = 0 ; i < this.storage.length; i++) {
    if(this.storage[i] !== undefined) count++;
  }
  return count;
}

//threshold in percentage
HashTable.prototype.isOverThresholdOf = function(threshold) {
  const occupiedCount = this.checkOccupied();
  const occupiedPercentage = (occupiedCount / this.SIZE) * 100;

  console.log('occupiedPercentage ->', occupiedPercentage);
  return  occupiedPercentage > threshold;
}

HashTable.prototype.isUnderThresholdOf = function(threshold) {
  const occupiedCount = this.checkOccupied();
  const occupiedPercentage = (occupiedCount / this.SIZE) * 100;

  console.log('occupiedPercentage ->', occupiedPercentage);
  return  occupiedPercentage < threshold;
}

//increase size to double its previous size
HashTable.prototype.doubleSize = function() {
  this.SIZE = this.SIZE * 2;
}

//decrease size to half
HashTable.prototype.halfSize = function () {
  this.SIZE = Math.floor(this.SIZE / 2);
}


// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';
  
  let hash = 0;
  if (string.length === 0) return hash;
  
  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash) % size;
}

const newHTB = new HashTable();

//adding to reach 75% threshold
newHTB.set('q', 'some value');
newHTB.set('a', 'some value');
newHTB.set('s', 'some value');
newHTB.set('d', 'some value');
newHTB.set('f', 'some value');
newHTB.set('g', 'some value');
newHTB.set('h', 'some value');
newHTB.set('j', 'some value');
newHTB.set('k', 'some value');
newHTB.set('l', 'some value');
newHTB.set('z', 'some value');
newHTB.set('x', 'some value');
newHTB.set('0', 'some value');
newHTB.set('1', 'some value');
newHTB.set('2', 'some value');
newHTB.set('3', 'some value');
newHTB.set('4', 'some value');
newHTB.set('5', 'some value');
newHTB.set('7', 'some value');
newHTB.set('9', 'some value');



console.log('is over threshold?', newHTB.isOverThresholdOf(75))

// console.log('table length',newHTB.storage);

// Do not remove!!
module.exports = HashTable;
