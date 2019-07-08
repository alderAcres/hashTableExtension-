/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
  this.numOfElements = 0;
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
  const hashKey = hashCode(key, this.SIZE);
  console.log(this.storage, this.numOfElements)
  if (typeof this.storage[hashKey] === 'object') {
    // if we find that the storage already has an object then we know it was visited already
    // store the new key/val pair in the object at hashKey
    if (this.storage[hashKey][key] === undefined) {
      // if the key in the obj doesn't exist then we're going to store a new value
      // in this case we want to increment numOfElements b/c we're storing a new val
      this.numOfElements++
    }
    // whether we're storing a new val or overwriting an existing one we want to store key/val pair
    console.log(this.storage[hashKey])
    this.storage[hashKey][key] = value;
  }
  else {
    // if an object doesn't already exist store a new object with the key/val pair
    this.storage[hashKey] = {[key]: value};
    console.log(this.storage[hashKey])
    this.numOfElements++;
  }
  console.log(this.storage);
  return this.numOfElements;
 
};
const hash = new HashTable();
hash.set('abcdef', 20);
hash.set('1234', 10);
hash.set('23124321', 10);
hash.set('fdsafdsafds', 2);
hash.set('string', 2)
hash.set('dsafds', 2)
hash.set('60jytrk', 2)
hash.set('7gfdgf0', 2)
hash.set('8dfsdwq0', 2)
hash.set('0xczvvcx0', 2)
hash.set('2zxzc90', 2)
hash.set('201xcsd1', 2)
/*
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
  const hashKey = hashCode(key, this.SIZE);
  console.log(this.storage[hashKey][key]);
  return this.storage[hashKey][key];
};

// hash.get('abcdef');
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const hashKey = hashCode(key, this.SIZE);
  if (this.storage[hashKey][key] !== undefined) {
    // if hashKey at key does exist then we want to store the value, then delete it
    const temp = this.storage[hashKey][key];
    delete this.storage[hashKey][key];
    // decrement the numOfElements
    this.numOfElements--;
    console.log(temp, this.numOfElements);
    return temp;
  }
  return undefined;
};
// console.log(hash.remove('20'));
// console.log(hash.remove('20'));
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

hash.remove('abcdef');
hash.remove('1234');
hash.remove('23124321');
hash.remove('fdsafdsafds');
hash.remove('string')
hash.remove('dsafds')
// Do not remove!!
module.exports = HashTable;
