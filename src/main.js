/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 4;
  this.number = 0;
  
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
  hash = hashCode(key, this.SIZE);
  console.log('storing ', value , ' under ', key, ' hash ', hash);
  // first time we save values in that hashtable bucket
  // we initialize to empty array and save it
  if ((this.storage[hash] === undefined)) {
    this.storage[hash]= [];
    this.storage[hash][key] = value;
    this.number += 1;
  }

  if (this.storage[hash][key] === undefined) {
      // nothing saved at this location yet
      this.storage[hash][key]= value;
      this.number += 1;
  } else {
      // store value. TODO: handle collision?
      this.storage[hash][key]= value;
  }
  return this.number;
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
  hash = hashCode(key, this.SIZE);
  console.log('getting ', key, ' under hash ', hash);
  // hash bucket is empty. return undefined
  if ((this.storage[hash] === undefined)) {
    return undefined;
  }

  if (this.storage[hash][key] === undefined) {
      // nothing saved at this location yet
      return undefined;
  } else {
    return this.storage[hash][key];
  }
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
  hash = hashCode(key, this.SIZE);
  console.log('getting ', key, ' under hash ', hash);
  // hash bucket is empty. return undefined
  if ((this.storage[hash] === undefined)) {
    return undefined;
  }

  if (this.storage[hash][key] === undefined) {
      // nothing saved at this location yet
      return undefined;
  } else {
    let value = this.storage[hash][key];
    delete this.storage[hash][key];
    this.number -= 1;
    return value;
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


////////////////////////////////////////////
//                testing                 //
////////////////////////////////////////////
console.log('yello');
const mht = new HashTable();
console.log(mht);
mht.set("brother", 6);
console.log(mht);
mht.set("sister", 4);
mht.set("sister", 4);
mht.set("sister", 4);
mht.set("sister", 7);
console.log("getting sister", mht.get("sister"));

mht.remove("sister");
console.log("getting sister", mht.get("sister"));

console.log(mht);
console.log(mht.set("dad", 4));
console.log(mht);


// Do not remove!!
module.exports = HashTable;
