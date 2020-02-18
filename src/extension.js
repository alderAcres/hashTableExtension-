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
  this.items = 0; // number of items stored in the hash table
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
  // get hashed address
  let hash = hashCode(key, this.SIZE)
  // console.log(hash)
  // store the key, value pair by creating a new pair on the object at the hashed address
  // this will handle collisions, as we are adding new properties to the object
  // if no key has previously been stored, create an object at the hashed address
  if (!this.storage[hash]){
    this.storage[hash] = {}
    this.storage[hash][key] = value
  } else this.storage[hash][key] = value


  // update # of items in the list and return the new #
  this.items++

  // extension: double hash table size if stored items > 75%
  if (this.items > this.SIZE * 0.75){
    // retrieve all previous stored key/value pairs
    // we could just add a new property on the HashTable object to store all the unhashed key/value pairs
    // ...but I feel like that kind of defeats the purpose?
    const previousKeys = {}
    for (let i = 0; i < this.SIZE; i++){ // iterate through table
      if (this.storage[i]){ // if keys exist at hashed address
        for (storedKey in this.storage[i]){ // add it to hashedKeys object
          // tried this.get(storedKey) but ran into an error, so for now...
          hash = hashCode(storedKey, this.SIZE)
          previousKeys[storedKey] = this.storage[hash][storedKey]
        }
      }
    }
    // console.log(previousKeys)
    // double size of hash table
    this.SIZE *= 2
    // reset and rehash 
    this.storage = new Array(this.SIZE);

    // same code as above to set keys in new hash table, iterating through all the previously stored keys
    for (storedKey in previousKeys){
      hash = hashCode(storedKey, this.SIZE)
      if (!this.storage[hash]){
        this.storage[hash] = {}
        this.storage[hash][storedKey] = previousKeys[storedKey]
      } else this.storage[hash][storedKey] = previousKeys[storedKey]
    }
  }

  return this.items

};

// hashTable = new HashTable()
// console.log(hashTable.set("hello", 1))
// console.log(hashTable.set("world", 2))
// hashTable.set("kevin", 3)
// hashTable.set("hello", 4)
// hashTable.set("k", 5)
// hashTable.set("e", 6)
// hashTable.set("v", 7)
// hashTable.set("i", 8)
// hashTable.set("n", 9)
// hashTable.set("s", 10)
// hashTable.set("su", 11)
// hashTable.set("sun", 12)
// hashTable.set("code", 13)
// console.log(hashTable)

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
  // get hashed address
  const hash = hashCode(key, this.SIZE)
  // look up key at the hashed address
  return this.storage[hash][key]

};

// console.log(hashTable.get("hello"))
// console.log(hashTable.get("world"))
// console.log(hashTable.get("kevin"))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // get hashed address
  let hash = hashCode(key, this.SIZE)
  // get deleted value to return
  const deletedValue = this.get(key)
  // delete the key/value pair in the hash table and return the value
  delete this.storage[hash][key]
  this.items-- // update # items stored in table

  // extension
  console.log(this.SIZE)
  if (this.SIZE > 16 && this.items < 0.25 * this.SIZE){
    const previousKeys = {}
    for (let i = 0; i < this.SIZE; i++){ // iterate through table
      if (this.storage[i]){ // if keys exist at hashed address
        for (storedKey in this.storage[i]){ // add it to hashedKeys object
          // tried this.get(storedKey) but ran into an error, so for now...
          hash = hashCode(storedKey, this.SIZE)
          previousKeys[storedKey] = this.storage[hash][storedKey]
        }
      }
    }
    this.SIZE *= 0.5
    console.log(this.SIZE)
    // reset and rehash 
    this.storage = new Array(this.SIZE);

    // same code as above to set keys in new hash table, iterating through all the previously stored keys
    for (storedKey in previousKeys){
      hash = hashCode(storedKey, this.SIZE)
      if (!this.storage[hash]){
        this.storage[hash] = {}
        this.storage[hash][storedKey] = previousKeys[storedKey]
      } else this.storage[hash][storedKey] = previousKeys[storedKey]
    }

  }
  return deletedValue
};

// console.log(hashTable.remove("world"))
// console.log(hashTable)
// console.log(hashTable.remove('hi')) 
// console.log(hashTable.remove('k')) 
// console.log(hashTable.remove('e')) 
// console.log(hashTable.remove('v')) 
// console.log(hashTable)
// console.log(hashTable.remove('i')) 
// console.log(hashTable)
// console.log(hashTable.remove('n')) 
// console.log(hashTable.remove('s')) 
// console.log(hashTable)
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
