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
  const hashedKey = hashCode(key, this.SIZE);
  if (this.storage[hashedKey]) {
    // collision. we will use an object for sake of ease
    const cellStorage = {};
    let arrayedCellStorage = Object.keys(this.storage[hashedKey]);
    for (let i = 0; i < arrayedCellStorage.length; i ++) {
      let cellKey = arrayedCellStorage[i];
      let cellVal = this.storage[hashedKey][cellKey];
      cellStorage[cellKey] = cellVal;
    }
     cellStorage[key] = value;
     this.storage[hashedKey] = cellStorage;
  }
  else {
    // no collision
    const cellStorage = {};
    cellStorage[key] = value;
    this.storage[hashedKey] = cellStorage;
  }
  console.log(this.storage)
  // need to check if >= 0.75 usage
  let usedCells = 0;
  for (let i = 0; i < this.storage.length; i ++) {
    if (this.storage[i]) usedCells++;
  }
  if ((usedCells/this.SIZE) >= 0.75) {
    //resize required
    let tempStorage = {};
    tempStorage = Object.assign(tempStorage, this.storage);
    // we probably need to deep copy this otherwise we are pointing to the same item
    console.log(tempStorage)
    this.SIZE = (this.SIZE * 2);
    this.storage = new Array(this.SIZE);
    for (let i = 0; i < Object.keys(tempStorage).length; i += 1) {
      let tempKey = Object.keys(tempStorage)[i];
      // console.log(tempStorage[i])
      if (!tempStorage[tempKey]) continue;
      let cellStorage = Object.keys(tempStorage[tempKey]);
      // console.log(cellStorage)
      // this is an array of the keys in the object in that cell
      for (let j = 0; j < cellStorage.length; j ++) {
        // console.log(cellStorage)
        // console.log(cellStorage[j],tempStorage[i][cellStorage[j]])
        this.set(cellStorage[j],tempStorage[tempKey][cellStorage[j]]);
      }
    }
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
  const hashedKey = hashCode(key, this.SIZE);
  const cellStorage = this.storage[hashedKey];
  //given our previous implementation cellStorage should be an object
  let arrayedCellStorage = Object.keys(this.storage[hashedKey]);
  for (let i = 0; i < arrayedCellStorage.length; i++) {
    let cellKey = arrayedCellStorage[i];
    if (String(key) === cellKey) {
      return this.storage[hashedKey][cellKey];
    }
  }
  // if we get to this point, the key is not in storage;
  return null;
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
  
  if (!this.get(key)) return undefined;
  // if we hit this point, we know the hashtable contains our key
  const hashedKey = hashCode(key, this.SIZE);
  let arrayedCellStorage = Object.keys(this.storage[hashedKey]);
  const cellStorage = {};
  for (let i = 0; i < arrayedCellStorage.length; i ++) {
    let cellKey = arrayedCellStorage[i];
    let cellVal = this.storage[hashedKey][cellKey];
    if (cellKey === String(key)) continue;
    cellStorage[cellKey] = cellVal;
  }
  this.storage[hashedKey] = cellStorage;

  let usedCells = 0;
  for (let i = 0; i < this.storage.length; i ++) {
    if (this.storage[i]) usedCells++;
  }
  if ((usedCells/this.SIZE) <= 0.75) {
    //resize required
    let tempStorage = {};
    tempStorage = Object.assign(tempStorage, this.storage);
    // we probably need to deep copy this otherwise we are pointing to the same item
    console.log(tempStorage)
    this.SIZE = (this.SIZE/2 >= 16) ? (this.SIZE/2) : 16;
    this.storage = new Array(this.SIZE);
    for (let i = 0; i < Object.keys(tempStorage).length; i += 1) {
      let tempKey = Object.keys(tempStorage)[i];
      // console.log(tempStorage[i])
      if (!tempStorage[tempKey]) continue;
      let cellStorage = Object.keys(tempStorage[tempKey]);
      // console.log(cellStorage)
      // this is an array of the keys in the object in that cell
      for (let j = 0; j < cellStorage.length; j ++) {
        // console.log(cellStorage)
        // console.log(cellStorage[j],tempStorage[i][cellStorage[j]])
        this.set(cellStorage[j],tempStorage[tempKey][cellStorage[j]]);
      }
    }
  }
  return true; // just returning something that is not undefined to confirm removal
};


// Do not remove!!
module.exports = HashTable;
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

let hash = new HashTable;
hash.set(3,2)
hash.set("help",1)
hash.set("ayuda",1)
hash.set("raphael",4)
hash.set("egon11",0)
hash.set("besoismyfriend",32)
hash.set("kaldsjhflksahfd",42)
hash.set("kashdkflahdkfla",13)
hash.set('askjfdhakhrwqeoiuryqoi',41)
hash.set("akjdshfoiewqo",13)
hash.set("iyioqewyroiuyoo",14)
hash.set("armageddon",14)
hash.set("pleasehashtoanewcell",32)
console.log(hash);
let used = 0;
for (let i = 0; i < hash.storage.length; i += 1) {
  if (hash.storage[i]) {
    used += 1;
  }
}
console.log(used);
console.log(hash)
console.log(hash.SIZE);
