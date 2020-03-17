/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.count = 0;
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
  const calculatedIndex = hashCode(key, this.SIZE);
  let individualStorage = this.storage[calculatedIndex];
  if (individualStorage === undefined) {
    // first time an item is set to this index
    const individualStorage = new HashIndividualStorage();
    individualStorage.push(key, value);
    this.count += 1;
  } else {
    if (!individualStorage.contains(key)) {
      // it means its a different key even when the calculatedIndex is the same, then we increse the index
      // this is a collision
      console.log("Colission!, adding another key to the same IndividualStorage")
      this.count += 1;
    }
    // possibility of override or colission
    individualStorage.push(key, value);
  }
  return this.count;
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
  const calculatedIndex = hashCode(key, this.SIZE) 
  const individualStorage = this.storage[calculatedIndex];
  // if there a individualStorage in the calculated index and the key exists on that individualStorage, we get the value
  if (individualStorage !== undefined && individualStorage.contains(key)) {
    return individualStorage.get(key);
  }
  return;
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
   const calculatedIndex = hashCode(key, this.SIZE) 
   const individualStorage = this.storage[calculatedIndex]
   // if there a individualStorage in the calculated index and the key exists on that individualStorage,
   // we remove key on the individualStorage and return the value assocaited with the key
   if (individualStorage !== undefined && individualStorage.contains(key)) {
     //reducing the count
      this.count -= 1;
      return individualStorage.remove(key);
   }
   return arrayValue
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

// use LinkedList to resolve collisions

function HashIndividualStorage() {
  this.IndividualStorage = {};
}

HashIndividualStorage.prototype.push = function (key, value) {
  // always override
  this.IndividualStorage[key] = value;
}

HashIndividualStorage.prototype.get = function (key) {
  return this.IndividualStorage[key];
}

HashIndividualStorage.prototype.contains = function (key) {
  return (this.IndividualStorage.hasOwnProperty(key));
}

HashIndividualStorage.prototype.remove = function(key) {
  const valueToDelete = this.IndividualStorage[key];
  delete this.IndividualStorage[key];
  return valueToDelete;
}


/*
*************************** TESTS 
*/
const NUMBER_OF_KEYS_TO_TEST = 50;

const testHashTable = new HashTable();
let key;
for (let i = 0; i < NUMBER_OF_KEYS_TO_TEST; i += 1) {
  key = `k${i}`;
  testHashTable.set(key, i);
}

console.log("Count Match?")
console.log(testHashTable.count === NUMBER_OF_KEYS_TO_TEST);

let doesAllGetCorrectly = true;
for(let i = 0; i < NUMBER_OF_KEYS_TO_TEST; i += 1){
  key = `k${i}`;
  let getCorrectly = (testHashTable.get(key)  === i) ;
  if (!getCorrectly) {
    console.log("error")
    console.log(`key {key} doesnt match to {i}`)
  }
  doesAllGetCorrectly = doesAllGetCorrectly && getCorrectly;
}

if (doesAllGetCorrectly) {
  console.log("All items were stored correctly!!!")
} else {
  console.log("At least one item was stored incorrectly!!!")
}

for(let i = 0; i < NUMBER_OF_KEYS_TO_TEST; i += 1){
  key = `k${i}`;
  testHashTable.remove(key);
}

console.log("Count down to Zero?")
console.log(testHashTable.count === 0);




// Do not remove!!
module.exports = HashTable;
