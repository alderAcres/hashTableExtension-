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
  // get hash code for new key
  const address = hashCode(key, this.SIZE);
  //  create an object with key val pair if there is not one at the hash already
  if (!this.storage[address]) {
    this.storage[address] = { [key] : value }
  } else {
    //  else add key val pair to obj if one already exists
    //  overwrite exsisting value if key already exists at address
    this.storage[address][key] = value;
  } 

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
  // invoke hashCode with key to get address
  const address = hashCode(key, this.SIZE);
  // if that key is not found at that adress return undefined
  if (!this.storage[address][key]) return undefined;
  // else return the value assigned to the key at the address
  return this.storage[address][key];
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
let ht = new HashTable;
ht.set("dan", 12)
ht.set("bob", 45)
ht.set("nancy", 30)
ht.set("dan", 17)
console.log(ht)
console.log("get ralph:", ht.get("ralph")); // undefined
console.log("get dan:", ht.get("dan")); // undefined
console.log("get nancy:", ht.get("nancy")); // undefined
console.log("get bob:", ht.get("bob")); // undefined
// Do not remove!!
module.exports = HashTable;
