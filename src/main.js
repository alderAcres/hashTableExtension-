/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.filled = 0;  // new property that will track number of items 
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

  // where key, value pair is stored through hashcode address
  const location = hashCode(key, this.SIZE);

  // if there is already an object at address, then add key, value pair 
  // into object 
  if (typeof this.storage[location] === 'object') {
    this.storage[location][key] = value;
  }

  // otherwise, create an object to add the key, value pair into 
  else {
    const obj = {};
    this.storage[location] = obj;
    obj[key] = value;
  }

  this.filled += 1;
  return this.filled;

};

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

  // where key, value pair is stored through hashcode address
  const location = hashCode(key, this.SIZE);

  // at that address, there is either an object or nothing stored 
  if (typeof this.storage[location] === 'object') {
    // if object, find the key, value in the object 
    return this.storage[location][key];
  }
  // else return 'nothing' (either '' or undefined)
  return this.storage[location];

};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {

  // where key, value pair is stored through hashcode address
  const location = hashCode(key, this.SIZE);

  // store value before deleting from hash table 
  let temp = this.get(key);
  
  // temp is either undefined (because no key, value exists) or a value 
  if (temp !== undefined) {
    // if key, value exists, then delete it
    delete this.storage[location][key];
    this.filled -=1;  // one less item is in hashtable 
  }
  return temp;      // return value deleted 

};


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



// FOR TESTING
ht = new HashTable();
console.log(ht.set(1, 2));
console.log(ht.set(3, 4));
console.log(ht.set('ab', 'cd'));
console.log(ht.set('hi', 'bye'));
console.log(ht.set('hello', 'world'));
console.log(ht.storage);
console.log(ht.get(1));
console.log(ht.get(3));
console.log(ht.get('ab'));
console.log(ht.get('hi'));
console.log(ht.get('hello'));
console.log(ht.get('test'));

console.log(ht.filled);
console.log(ht.remove(1));
console.log(ht.storage);
console.log(ht.remove(2));
console.log(ht.storage);
console.log(ht.remove(3));
console.log(ht.storage);
console.log(ht.filled);