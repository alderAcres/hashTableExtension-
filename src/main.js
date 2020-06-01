/**
* HashTable constructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.itemsNum = 0;
  this.keysUsed = [];
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
  const ind = hashCode(key, this.SIZE);
  //handling collision using the object for each element of array this.storage
  if (this.storage[ind] === undefined) {
    const obj = {};
    obj[key] = value;
    this.storage[ind] = obj;
    this.keysUsed.push(key);
    this.itemsNum++;
  } 
  else {
    //overwriting the value if key is the same
    if (this.keysUsed.includes(key)) this.storage[ind][key] = value;
    else {
      this.storage[ind][key] = value;
      this.keysUsed.push(key);
      this.itemsNum++;
    }
  }
  return this.itemsNum;
};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specified key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  const ind = hashCode(key, this.SIZE);
  return this.storage[ind][key];
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
  const ind = hashCode(key, this.SIZE);
  //if no such key is in the HashTable
  if (!this.storage[ind].hasOwnProperty(key)) return undefined;
  // if (!(key in this.storage[ind])) return undefined;
  else {
    const temp = this.storage[ind][key];
    delete this.storage[ind][key];
    this.itemsNum--;
    const i = this.keysUsed.indexOf(key);
    //extract the key from the array so we can reuse it again
    this.keysUsed.splice(i, 1);
    return temp;
  } 
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


const ht = new HashTable();
console.log(ht.set(4, 'apple'));
console.log(ht.set(4, 'orange'));
console.log(ht.set(3, 'peach'));
console.log(ht.set(1, 'blueberry'));
console.log(ht.set(3, 'raspberry'));

console.log(ht.get(4));

console.log(ht.remove(2));
console.log(ht.remove(4));
console.log(ht.remove(1));

console.log(ht.set(1, 'banana'));


// Do not remove!!
module.exports = HashTable;


