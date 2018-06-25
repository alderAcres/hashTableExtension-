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

// input key => hashCode(input key, size of new Array instance) = myHash 
// myHash = mapped index in array where the val that goes with the input key lives
// so if input key = "Rebecca" then it returns the same myHash "Rebecca" input key would a second time.

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
  // the obj at storage[myHash] can have multiple key/val pairs in it
  // must return the new # of items stored in hash table
  return this.counter;
};

let myHashTable = new HashTable();
console.log('myHashTable BEFORE: ', myHashTable);
console.log('myHashTable.set(Rebecca, 10): ', myHashTable.set('Rebecca', 10));
// console.log('myHashTable after set(Rebecca, 10): ', myHashTable);
// console.log('myHashTable.set(Rebecca, 10): ', myHashTable.set('Rebecca', 10));
// console.log('myHashTable after set(Rebecca, 10): ', myHashTable);

// key "Rebecca" was overwritten

console.log('myHashTable.set(Alex, 5): ', myHashTable.set('Alex', 5));

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

console.log('myHashTable.get(Rebecca): ', myHashTable.get('Rebecca'));


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let myHash = hashCode(key, this.SIZE);
  console.log('this.storage[myHash]: ', this.storage[myHash]);
  if (!this.storage[myHash]) { // if the mapped index is undefined
    return undefined;
  } else { // if there is a bucket there with one or more key/val pairs on it
    let temp = this.storage[myHash][key];
    delete this.storage[myHash][key];
    return temp;
  }
};

console.log('myHashTable.remove(Rebecca): ', myHashTable.remove('Rebecca'));

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
