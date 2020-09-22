/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
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
HashTable.prototype.set = function(key, value) {
  // get hash address
  const hashAdress = hashCode(key, this.SIZE);
  // check if something is stored by this address
  // if yes add new key value pair to object 
  if(this.storage[hashAdress]) {
    this.storage[hashAdress][key] = value;
    // if we add new key value increase stored values
    if(!this.storage[hashAdress][key]) this.storedValues = this.storedValues + 1;
  // if not create new object with key value pair
  } else {
    this.storage[hashAdress] = {[key]: value};
    this.storedValues = this.storedValues + 1;
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

const dogValue = petParty.get('dog');
const goat = petParty.get('goat');
const removeGoat = petParty.remove('goat');
console.log(petParty, removeGoat);
petParty.remove('cat');
console.log(petParty);


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
