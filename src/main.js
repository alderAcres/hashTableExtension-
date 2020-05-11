/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.numOfItems = 0; 
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
// for Airbnb sake
const has = Object.prototype.hasOwnProperty; 

HashTable.prototype.set = function(key, value) {
  // declare a variable the refers to the index on the hash table we will be storing our value
  const index = hashCode(key, this.SIZE);

  // if the hash bucket at the comptued index is empty (undefined), create and store a new empty object at that index,
  if (!this.storage[index]) {

    this.storage[index] = {};
  }

  // for sake of keeping num of Items correct, we calculate if hash table already has a key at that property
  if (has.call(this.storage[index], key)) {

    this.numOfItems--; 
  }

  // store inputs as property of object stored at the computed index on the hash table, and increase the number of items count
  this.storage[index][key] = value;
  this.numOfItems++; 

  // return new number of items in table; 
  return this.numOfItems; 

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
  // calculated index at with this key is stored
  const index = hashCode(key, this.SIZE);

  // access value associated with the key stored on the object at that index of the storage array
  // returns undefined if either key doesn't exist on object, or object doesn't exist in bucket
  return this.storage[index] ? this.storage[index][key] : this.storage[index]; 
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

  // compute index at with object with desired key would be store
  const index = hashCode(key, this.SIZE);

  // handle edge case, if no object stored at that index, return undefined
  if (!this.storage[index]) return this.storage[index]; 
  
  // if object does exist at that index, store that property in variable so we can return it later (will be undefined if key doesn't exist on that object)
  const removedProp = this.storage[index][key];

  // delete property from the bucket object, decrementing numOfItems counter
  delete this.storage[index][key];

  // return stored property value
  return removedProp;
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

const newHash = new HashTable(); 
console.log('--------TESTING SET---------');
newHash.set('hello', true);
newHash.set('this is a test', true); 
newHash.set(true, 'hello'); 
newHash.set(7678, 'testagain'); 
console.log(' hashtable after adding a few items...', newHash);
newHash.set('hello', false); 
console.log('can handle hash collisions?', newHash)
console.log('------------TESTING GET---------'); 
console.log('getting false....', newHash.get('hello')); 
console.log('getting value that is not in table...', newHash.get('not real value'))
console.log('------------TESTING REMOVE----------');
console.log('removing "hello".....', newHash.remove('hello'), '...hashTable after remove:   ', newHash);
console.log('removing object that doesn\'t exist....', newHash.remove('akldsdlfas;dl'))

// Do not remove!!
module.exports = HashTable;
