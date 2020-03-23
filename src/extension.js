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
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.spacesTaken = 0;
  this.storage = new Array(this.SIZE);
}

// create a new hashtable
let hashTable = new HashTable();

HashTable.prototype.set = function(key, value) {
  // generate a key to store in hashtable
  // check if key is occupied to check for collisions
    // if key exists, add new object in key value
    // if key does not exist, add new key value pair
  // increment space taken once new object is set
  // return current number of spaces occupied in array
  let index = hashCode(key, this.SIZE);

  if (this.storage[index] === undefined){
    this.storage[index] = {};
    this.storage[index][key] = value;
    this.spacesTaken += 1;
  } else if (this.storage[index]){
    this.storage[index][key] = value;
    this.spacesTaken += 1;
  }

// create a conditional to check spaces taken
  // if spaces taken is 75% of this.size, double this.size
  // rehash everything = give everything new indexes??
    // how do I access objects inside a given index's values?
  if (this.spacesTaken / this.SIZE === 0.75){
    this.SIZE = this.SIZE * 2;
    
    for (let i = 0; i < this.storage.length; i++){
      if (this.storage[i]){
      for (let prop in this.storage[i]){
        let savedKey = prop;
        let savedValue = this.storage[i][prop];
        delete prop;
        this.spacesTaken -= 1;
        this.set(savedKey, savedValue)
        }
      }
    }
  }

  return this.spacesTaken;
};

// my self tests
// let hash = new HashTable();
// console.log(hash.set('John', '1'));
// console.log(hash.set('Jane', '2'));
// console.log(hash.set('Jill', '3'));
// console.log(hash.set('Jack', '4'));
// console.log(hash.set('Joe', '5'));
// console.log(hash.set('Jenn', '6'));
// console.log(hash.set('Joaquin', '7'));
// console.log(hash.set('Jose', '8'));
// console.log(hash.set('Johnson', '9'));
// console.log(hash.set('James', '10'));
// console.log(hash.set('Joseph', '11'));
// console.log(hash.SIZE);
// console.log(hash.set('Jess', '12'));
// console.log(hash.SIZE);

HashTable.prototype.get = function(key) {
  // generate index for key 
  // iterate through storage and search for key
  // return object found inside index that matches key
  let index = hashCode(key, this.SIZE);

  for (let i = 0; i < this.storage.length; i++){
    if (this.storage[index][key]){
      return this.storage[index][key];
    }
  }
};

HashTable.prototype.remove = function(key) {
// generate index for key
// iterate through hashtable until index
// delete object found at index with matching key
// return deleted object
  let index = hashCode(key, this.SIZE);
  let deleted;

  for (let i = 0; i < this.storage.length; i++){
    if (!this.storage[index]){
      deleted = undefined;
    }

    if (this.storage[index][key]){
      deleted = this.storage[index][key];
      delete this.storage[index][key];
      this.spacesTaken -= 1;
    }

  }

  // run conditional check to check if spaces taken divided by size is 25%
  // if so, reduce size by half and rehash everything
    // same issue.. how do I access objects inside an index?

  if (this.spacesTaken / this.SIZE === 0.25){
    this.SIZE = this.SIZE / 2;
  }
  return deleted;
};

// my self tests
// let hash = new HashTable();
// console.log(hash.set('John', '1'));
// console.log(hash.set('Jane', '2'));
// console.log(hash.set('Jill', '3'));
// console.log(hash.set('Jack', '4'));
// console.log(hash.set('Joe', '5'));
// console.log(hash.set('Jenn', '6'));
// console.log(hash.set('Johnson', '9'));
// console.log(hash.set('James', '10'));
// console.log(hash.set('Joseph', '11'));
// console.log(hash.set('Jess', '12'));
// console.log(hash.SIZE);
// console.log(hash.spacesTaken);
// console.log(hash.remove('John'))
// console.log(hash.remove('Jane'))
// console.log(hash.remove('Jill'))
// console.log(hash.remove('Jack'))
// console.log(hash.remove('Joe'))
// console.log(hash.remove('Jenn'))
// console.log(hash.remove('Johnson'))
// console.log(hash.spacesTaken);
// console.log(hash.SIZE)
// console.log(hash.remove('James'))
// console.log(hash.remove('Joseph'))


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
