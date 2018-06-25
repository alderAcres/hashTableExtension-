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

console.log('========================RUNNING HASHTABLE==========================')

/**

* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.counter = 0;
  this.storage = new Array(this.SIZE);
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/

HashTable.prototype.set = function(key, value) {
  let myHash = hashCode(key, this.SIZE);
  if (!this.storage[myHash]) { // if the mapped index is undefined
    this.storage[myHash] = {};  // at that mapped index, create an object to be a bucket
    this.storage[myHash][key] = value; // inside that bucket, create a key val pair
    this.counter++;
  } else { // if the mapped index has a key/val pair already there
    this.storage[myHash][key] = value;  // add a new key/val pair inside that bucket "on the object"
    this.counter++;
  }
  if (this.counter > (3/4)*(this.SIZE)) {
    this.SIZE = this.SIZE * 2;
    return HashTable();
  }
  return this.counter;
};

// SET TESTS
let myHashTable = new HashTable();
console.log('myHashTable BEFORE: ', myHashTable);
console.log('myHashTable.set(Rebecca, 10): ', myHashTable.set('Rebecca', 10));
console.log('myHashTable after set(Rebecca, 10): ', myHashTable);
console.log('myHashTable.set(Alex, 8): ', myHashTable.set('Alex', 8));
console.log('myHashTable after set(Alex, 8): ', myHashTable);
console.log('myHashTable.set(Jason, 2): ', myHashTable.set('Jason', 2));
console.log('myHashTable after set(Jason, 2): ', myHashTable);
console.log('myHashTable.set(Ian, 9): ', myHashTable.set('Ian', 9));
console.log('myHashTable after set(Ian, 9): ', myHashTable);
console.log(myHashTable.set('string', 8));
console.log(myHashTable.set('iamastring', 12));
console.log(myHashTable.set('thisisastring', 15));
console.log(myHashTable.set('iamaboredstring', 21));
console.log(myHashTable.set('thisisaredundantstring', 19));
console.log(myHashTable.set('table', 21));
console.log(myHashTable.set('chair', 14));
console.log(myHashTable.set('computer', 41));
console.log(myHashTable.set('person', 51));
console.log('myHashTable ', myHashTable);

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  let myHash = hashCode(key, this.SIZE);
  return this.storage[myHash][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

// NEW REMOVE INSTRUCTIONS
// remove:
//       - If the hash table's SIZE is greater than 16 and the result of removing the
//         item drops the number of stored items to be less than 25% of the hash table's SIZE
//         (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

HashTable.prototype.remove = function(key) {
  let myHash = hashCode(key, this.SIZE);
  console.log('this.storage[myHash]: ', this.storage[myHash]);
  if (!this.storage[myHash]) { // if the mapped index is undefined
    return undefined;
  } else { // if there is a bucket there with one or more key/val pairs on it
    let temp = this.storage[myHash][key];
    delete this.storage[myHash][key];
    this.storage[myHash][key] = undefined;
    this.counter--;

    if (this.SIZE > 16 && (this.counter < ((1/4)*this.SIZE))) {
      this.SIZE = this.SIZE / 2;
      return HashTable();
    }

    return temp;
  }
};

console.log('remove1: ', myHashTable.remove('string'));
console.log(myHashTable);
console.log(myHashTable.remove('iamastring'));
console.log(myHashTable.remove('thisisastring'));
console.log(myHashTable.remove('iamaboredstring'));
console.log(myHashTable.remove('thisisaredundantstring'));
console.log(myHashTable.remove('table'));
console.log(myHashTable.remove('chair'));
console.log(myHashTable.remove('computer'));
console.log(myHashTable.remove('person'));
console.log(myHashTable.remove('Ian'));
console.log(myHashTable);
// Do not modify
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

// CONSOLE LOG TESTS
// let myHashTable = new HashTable();
// console.log('myHashTable BEFORE: ', myHashTable);
// console.log('myHashTable.set(Rebecca, 10): ', myHashTable.set('Rebecca', 10));
// console.log('myHashTable after set(Rebecca, 10): ', myHashTable);
// console.log('myHashTable.set(Rebecca, 10): ', myHashTable.set('Rebecca', 10));
// console.log('myHashTable after set(Rebecca, 10): ', myHashTable);

// key "Rebecca" was overwritten


// console.log('myHashTable.get(Rebecca): ', myHashTable.get('Rebecca'));

// console.log('myHashTable.set(Alex, 5): ', myHashTable.set('Alex', 5));

// console.log('myHashTable.remove(Rebecca): ', myHashTable.remove('Rebecca'));
