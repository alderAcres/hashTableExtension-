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
HashTable.prototype.set = function (key, value) {
  //invoke the hash function on the key to get the index 
  //store the key value pairs at the result index
  //initialize hash table at result index (if empty) as an empty object 
  //set the key value pair of that empty object to the arguments 
  //return key value pair 

  const hashIndex = hashCode(key, this.SIZE);
  if (!this.storage[hashIndex]) this.storage[hashIndex] = {};
  this.storage[hashIndex][key] = value;
  return this.storage[hashIndex];
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
  const hashIndex = hashCode(key, this.SIZE);
  if (!this.storage[hashIndex]) return undefined;
  return this.storage[hashIndex][key];
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
  const hashIndex = hashCode(key, this.SIZE);
  if (!this.storage[hashIndex]) return undefined;
  if (!this.storage[hashIndex][key]) return undefined;
  const removed = { [key]: this.storage[hashIndex][key] }
  delete this.storage[hashIndex][key];
  return removed;
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

/*******************/
/*** TEST - SET ***/
/******************/

const hash = new HashTable();
hashCode("bulbasaur", 16) //3
hashCode("charmander", 16) //13
hashCode("squirtle", 16); //3
hashCode("pikachu", 16); //15
hash.set("bulbasaur", "venasaur");
hash.set("charmander", "charmeleon");
hash.set("charmander", "charizard"); //should overwrite charmeleon
// console.log(hash);

/*******************/
/*** TEST - GET ***/
/******************/

// console.log("**** get method test ****")
// console.log(hash.get("bulbasaur")); //venasaur => hashIndex 3
// console.log(hash.get("charmander")); //charizard => hashIndex 13
// console.log(hash.get("squirtle")); //undefined => hashIndex 3
// console.log(hash.get("pikachu")); //undefined => hashIndex 15

// //error when i try to get a hashIndex that has not been initialized;
// //if (!this.storage[hashIndex]) return undefined // works! 

/*********************/
/*** TEST - REMOVE ***/
/*********************/

// 1. return undefined when the hashIndex do not have the key/value pair
// 2. remove and return key/value pair if found
// 3. how does it behave when there are more than one key value pair in the object? 

// console.log(hash);
console.log(hash.set('squirtle', 'blastoise'));
console.log("** test results **")
console.log('pikachu :', hash.remove('pikachu')); //undefined;
// console.log(hash);
console.log('bulbasaur :', hash.remove('bulbasaur')); //bulbasaur
// console.log(hash);
console.log('squirtle :', hash.remove('squirtle')); //squirtle
// console.log(hash);
console.log('squirtle :', hash.remove('squirtle')); //undefined;
// console.log(hash);
console.log('charmander :', hash.remove('charmander')); //charmander


// console.log("** hash **")
// console.log(hash);


// Do not remove!!
module.exports = HashTable;
