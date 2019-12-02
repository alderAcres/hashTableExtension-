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
  this.usage = 0; //track usage
  this.storage = new Array(this.SIZE);
}

// create a rehash function
// Check size
//add original key
//For each key in hashtable:
HashTable.prototype.rehash = function() {
  //Save the above k/v pair into a temporary object
  // Grab the value which is an object with { [originalKey]: value }
  let grabbedValues = Object.values(this.storage); // {[originalKey]: originalValue }
  //For each key in temporary object
  grabbedValues.forEach(function(obj) {
    let originalKey = Object.keys(obj)[0];
    //Delete the value from hash table
    this.remove(originalKey);
    // For each grabbedValues, set them
    this.set(originalKey, obj[originalKey]);
  });
};

HashTable.prototype.get = function(key) {
  //initialize index to result of passing in key and size to hashCode
  const index = hashCode(key, this.SIZE);
  //check for value in hash table with passed in key
  if (this.storage[index]) {
    return this.storage[index][key];
    //if doesn't exist, return undefined
  } else {
    return undefined;
  }
};

HashTable.prototype.set = function(key, value) {
  //if adding the new item will push the number of stored items to over 75% of the hash table's SIZE
  if (this.usage + 1 > this.SIZE * 0.75) {
    //then double the hash table's size
    newSize = this.SIZE *= 2;
    //console.log(this.SIZE);
    //rehash everything
    this.rehash();
  }
  const index = hashCode(key, this.SIZE);
  if (this.storage[index]) {
    this.storage[index][key] = value;
  } else {
    this.storage[index] = { [key]: value };
  }
};

HashTable.prototype.remove = function(key) {
  //if the hash table's size is greater than 16 & result of removing the items drops the nubmer of stored items
  //to be than less than 25% of the hash table's size rounding down
  if (this.SIZE > 16 && this.usage - 1 < Math.floor(0.25 * this.SIZE)) {
    //reduce the hash table's SIZE by 1/2
    this.SIZE = this.SIZE / 2;
    //rehash everything
    this.rehash();
  }
  //create a variable ref and assign the result of calling get with the key passed in
  const keyFound = this.get(key);
  if (keyFound) {
    //decrement usage
    this.usage--;
    //call set with key passed and value of undefined -- setting the value to undefined -- deleting the value
    this.set(key, undefined);
  }

  //return the deleted value
  return keyFound;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  "use strict";

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

let hash1 = new HashTable();
for (let i = 0; i < 25; i++) {
  hash1.set(i, i);
}

for (let i = 0; i < 10; i++) {
  hash1.remove(i, i);
}

console.log(hash1.storage);
//iderno y no work pls halp
