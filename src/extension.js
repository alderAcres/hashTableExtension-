/* eslint-disable */
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
};

HashTable.prototype.set = function(key, value) {
  const location = hashCode(key, this.SIZE);

  if (!this.storage[location]) {
    this.storage[location] = {[key]: value};
  } else {
    this.storage[location][key] = value;
  }

  let counter = 0;
  for (let i = 0; i < this.storage.length; i += 1) {
    if (this.storage[i]) counter += 1;
  }

  if (counter >= (this.SIZE * .75)) {
    this.SIZE = this.SIZE * 2;
    const oldStorage = this.storage.slice();
    this.storage = new Array(this.SIZE);

    // this.storage.test = 0
    for (let i = 0; i < oldStorage.length; i += 1) {
      if (typeof oldStorage[i] === 'object') {
        // this.storage.test += 1
        for (item in oldStorage[i]) {
          const element = oldStorage[i][item];
          const newLocation = hashCode(item, this.SIZE);
          this.storage[newLocation] = {[item]: element};
        }
      }
    }
  }
};

HashTable.prototype.get = function(key) {
  const location = hashCode(key, this.SIZE);
  return this.storage[location][key];
};

HashTable.prototype.remove = function(key) {
  const location = hashCode(key, this.SIZE);
  const deleted = this.storage[location][key];
  delete this.storage[location][key];

  // if an empty object is left in storage, remove it
  // const currentObj = this.storage[location];
  // const currentKeys = Object.keys(currentObj);
  // if (currentKeys.length === 0) {
  //   this.storage.splice([location], 1, )
  // }

  // similar logic to the modified set funciton
  // check if the storage after deleting an item is less than 25% 
  let counter = 0;
  for (let i = 0; i < this.storage.length; i += 1) {
    if (this.storage[i]) counter += 1;
  }

  if (counter <= (this.SIZE * .25)) {
  // if not: do nothing extra
  // if yes:

    // update the SIZE
    this.SIZE = this.SIZE * .5;
    const oldStorage = this.storage.slice();

    // reset the hash table 
    this.storage = new Array(this.SIZE);

    // rehash everything
    for (let i = 0; i < oldStorage.length; i += 1) {
      if (typeof oldStorage[i] === 'object') {
        // this.storage.test += 1
        for (item in oldStorage[i]) {
          const element = oldStorage[i][item];
          const newLocation = hashCode(item, this.SIZE);
          this.storage[newLocation] = {[item]: element};
        }
      }
    }
    // still return out the old deleted const

  }

  return deleted;
};

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

// Do not remove!!
module.exports = HashTable;

const test = new HashTable()

test.set('third', 1);
test.set('second', 1);
test.set('first', 1);
test.set('five', 1);
test.set('six', 1);
test.set('seven', 1);
test.set('one hundred', 1);
test.set('eli', 1);
test.set('michael', 1);
test.set('dan', 1);
test.set('eric', 1);
test.set('three thousand', 1);
test.set('hello', 1);
test.set('maya', 1);
test.set('1', 1);
test.set('2', 1);
test.set('15', 1);
test.set(':)', 1);
test.set('why', 1);
test.set('are', 1);
test.set('these', 1);
test.set('all', 1);
test.set('going to', 1);
test.set('the same', 1);
test.set('bins', 1);
test.set('come on', 1);
test.set('please', 1);
test.remove('third');
test.remove('second');
test.remove('first');
test.remove('five');
test.remove('six');
test.remove('seven');
test.remove('one hundred');
test.remove('eli');
test.remove('michael');
test.remove('dan');
test.remove('eric');
test.remove('three thousand');
test.remove('hello');
console.log(test.storage);
