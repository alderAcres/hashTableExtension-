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
  this.storedValues = 0;
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
HashTable.prototype.restore = function() {
  console.log('call restore', this.storage);
  // double this.SIZE
  this.SIZE = this.SIZE * 2;
  console.log(this.SIZE);
  // rehash everything
}

HashTable.prototype.set = function(key, value) {
  // get hash address
  const hashAdress = hashCode(key, this.SIZE);
  // check if something is stored by this address
  // if yes add new key value pair to object 
  if(this.storage[hashAdress]) {
    this.storage[hashAdress][key] = value;
    // if we add new key value increase stored values
    // if(!this.storage[hashAdress][key]) this.storedValues = this.storedValues + 1; -- ???
  // if not create new object with key value pair
  } else {
    this.storage[hashAdress] = {[key]: value};
    this.storedValues = this.storedValues + 1;
  }
  // check if number of storedValues > 75% of SIZE, increase hash size and restore everything
  const storedValuesInPercent = this.storedValues * 100 / this.SIZE;
  if(storedValuesInPercent > 75) {
    console.log('call restore');
    this.restore();
  }
  //return number of stored items
  return this.storedValues;
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
  // get hash adress
  // get value based on key
  const hashAdress = hashCode(key, this.SIZE);
  let value;
  if(this.storage[hashAdress]) {
    value = this.storage[hashAdress][key];

  }
  
  return value;
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
  // get hash address
  const hashAdress = hashCode(key, this.SIZE);
  let value;
  // check if value exists
  // if yes keep value 
  // delete value
  if(this.storage[hashAdress] && this.storage[hashAdress][key]) {
    value = this.storage[hashAdress][key];
    delete this.storage[hashAdress][key];
    // if no more keys delete obj
    if(Object.keys(this.storage[hashAdress]).length === 0) delete this.storage[hashAdress];
    // keep track of stored values
    this.storedValues = this.storedValues - 1;
  }

  // return value or undefind
  return value;
};

const petParty = new HashTable();
const dog = petParty.set('dog', 'tennis ball');
const cat = petParty.set('cat', 'mouse');
petParty.set('dog', 'puller');
petParty.set('dog1', 'tennis ball');

const overfill = new Array(18).fill('dog');

overfill.forEach((el, index) => {
  petParty.set(`${el}${index}`, 'puller');
});



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
