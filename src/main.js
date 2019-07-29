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
  this.itemsStored = 0;
}

/**
* set - Adds given value to the hash table with specified key.

* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function (key, value) {
  // get index where key and value will be stored
  let index = hashCode(key, this.SIZE);
  //console.log(index);
  // create a storage container if none exists at index
  if (this.storage[index] === undefined) this.storage.splice(index, 0, {});
<<<<<<< HEAD
=======
  //console.log(this.storage[index]);
>>>>>>> d99e8eb70ecec16a6f5db33d5a57e132f001c0e9
  // Add new key if it does not already exist/update existing keys
  this.storage[index][key] = value;
  //console.log(container);
  // Increment and return items stored
  this.itemsStored += 1;
  //return this.itemsStored;
  return this.storage
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
HashTable.prototype.get = function (key) {
  // determine index
  let index = hashCode(key, this.SIZE);

  // locate storage container
  const container = this.storage[index];
  let objKey;
  if (typeof key === 'string') objKey = key;
  else objKey = String(key);

  // enter object. If key exists in the object return the value. Otherwise return undefined.
  if (objKey in container) return container[objKey];
  else return undefined;
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  // determine index of key
  let index = hashCode(key, this.SIZE);

  // locate storage container
  const container = this.storage[index];
  let objKey;
  if (typeof key === 'string') objKey = key;
  else objKey = String(key);


  // enter object. If key exists in the object return the value. Otherwise return undefined.
  if (objKey in container) {
    // store value in a temporary placeholder
    let temp = container[objKey];
    // delete key/value pair from the container obj
    delete container[objKey];
    // deincrement itemsStored to reflect the new count of items held in the hash table
    this.itemsStored -= 1;
    //return temp
    return temp;
  } else {
    return undefined
  };
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

// const hash = new HashTable();
// console.log(hash.set('key', 'value'));
// console.log(hash.get('key'));
// console.log(hash.remove('key'))
