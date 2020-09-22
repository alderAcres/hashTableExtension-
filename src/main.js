/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.entries = 0;

  this.storage = new Array(this.SIZE);

  for(let i = 0; i < this.SIZE; i++){
    this.storage[i] = {};
  }
  
}

// clever method of converting keys to #s between 0 and size goes here:
function convert(size, key){
  return key.length % size
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
  let address = convert(this.SIZE, key);

  // if the key doesn't already exist at the hashed address, add to total entries
    // i.e. if the key exists, it will get overwritten, so total entries remains the same
  if(!this.storage[address].hasOwnProperty(key)) { 
    this.entries++;
  } 
  // add or overwrite the key value pair
  this.storage[address][key] = value;

  return this.entries;
};

let ht = new HashTable()
ht.set("hello", "what's up")
ht.set("hello", "world")
ht.set("My name is Penny", "I'm a fat kitty")
ht.set("Bread", "butter")
console.log(ht)

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
  let address = convert(this.SIZE, key);
  return this.storage[address][key]
};

console.log(ht.get("hello"))
console.log(ht.get("Bread"))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let address = convert(this.SIZE, key);

  if(this.storage[address][key] === undefined) return;
  
  let removed = this.storage[address][key];
  delete this.storage[address][key];
  this.entries--;

  return removed;
};

console.log(ht.remove('hello'))
console.log(ht)

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
