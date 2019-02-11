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
  let hash = hashCode(key, this.SIZE) //generate hashed key
  //if nothing exists at a spot in the array, create an object and place k:v there
    //if an object already exists there, just add to it the k:v pair
  if (!this.storage[hash]) {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }else{
    this.storage[hash][key] = value;
  }

  //calculate # of spaces filled in storage array
  let spacesFilled = 0;
  this.storage.forEach( slot => {
    if (slot) spacesFilled++;
  })

  if (spacesFilled > this.SIZE * 0.75){
    //double size
    this.SIZE *= 2;
    //create a new, bigger storage
    let biggerStorage = new Array(this.SIZE);

    //Rehash everything in old storage, place it in new storage, and change this.storage to new storage
    //Iterate thru entire storage array. At each spot, check if something exists there. If it does,
    // (it should be an object), iterate through all keys and values in that object. 
    // For each of those keys, create a new hash and place it in the new storage.
    this.storage.forEach( spot => {
      if (spot !== undefined) {
        Object.entries(spot).forEach( (kvPair) => {
          let hash = hashCode(kvPair[0], this.SIZE);
          if (!biggerStorage[hash]) {
            biggerStorage[hash] = {};
            biggerStorage[hash][kvPair[0]] = kvPair[1];
          }else{
            biggerStorage[hash][kvPair[0]] = kvPair[1];
          }
        })
      } 
    })
   this.storage = [...biggerStorage];
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
  let hash = hashCode(key, this.SIZE) //generate hashed key
  return this.storage[hash][key]; //return value of key stored in object at storage's hashed slot 
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
	let hash = hashCode(key, this.SIZE) //generate hashed key
   //if nothing exists in the storage at the key or in the object at key, return undefined
  if (!this.storage[hash] || !this.storage[hash][key]) return undefined;
  if (this.storage[hash][key]) delete this.storage[hash][key]; //if value exists at key, delete it

  //calculate # of spaces filled in storage array
  let spacesFilled = 0;
  this.storage.forEach( slot => {
    if (slot) spacesFilled++;
  })

  if (spacesFilled < this.SIZE * 0.25){
    //half size
    this.SIZE = Math.floor(this.SIZE / 2);
    //create a new, bigger storage
    let smallerStorage = new Array(this.SIZE);

    //Rehash everything in old storage, place it in new storage, and change this.storage to new storage
    //Iterate thru entire storage array. At each spot, check if something exists there. If it does,
    // (it should be an object), iterate through all keys and values in that object. 
    // For each of those keys, create a new hash and place it in the new storage.
    this.storage.forEach( spot => {
      if (spot !== undefined) {
        Object.entries(spot).forEach( (kvPair) => {
          let hash = hashCode(kvPair[0], this.SIZE);
          if (!smallerStorage[hash]) {
            smallerStorage[hash] = {};
            smallerStorage[hash][kvPair[0]] = kvPair[1];
          }else{
            smallerStorage[hash][kvPair[0]] = kvPair[1];
          }
        })
      } 
    })
   this.storage = [...smallerStorage];
  }
};


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
