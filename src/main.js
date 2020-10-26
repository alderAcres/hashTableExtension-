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

  //if we have time, make a method on this object that can get our index, so we don't have to call it in all of our methods below
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
  //first we need to run our hashCode function to find out where our object is going to be stored at
  // let hashIndex = hashCode(key, this.SIZE);
  let hashIndex = this.getIndex(key, this.SIZE)
  
   //next let's check if our index has anything inside, if not, let's set that index to an object and put in our first key/value pair
  if(this.storage[hashIndex] === undefined) {
    this.storage[hashIndex] = {};
    this.storage[hashIndex][key] = value;
  } else {
    //if we already have an object with key value pairs inside, we just want to add a new key/value pair to avoid collisions
    this.storage[hashIndex][key] = value;
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
  //first get our hashIndex to know what part of the hash table to look in
  // let hashIndex = hashCode(key, this.SIZE)
  let hashIndex = this.getIndex(key, this.SIZE)

    //return the value in our storage array at our index at our key!
    return this.storage[hashIndex].key
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
let hashIndex = this.getIndex(key, this.SIZE)

console.log(this.storage[hashIndex])

  if(this.storage[hashIndex].hasOwnProperty(key)) {
    //We save it into an immutable so we can return it out
    let valueToDelete = this.storage[hashIndex][key]
    //Then we delete the key/value pair in memory
    delete this.storage[hashIndex][key];
    //Lastly we return the value we deleted
    return valueToDelete;
  } 
    //If we didn't find a property we are looking for, we just return undefined
    return undefined;
  


};

HashTable.prototype.getIndex = function(key, size) {
  return hashCode(key, size)
}

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


let hash = new HashTable()
hash.set('a', 'muffin')
hash.get('a')
hash.set('b', 'carrot')
hash.set('c', 'cheese')
hash.remove('b')
console.log(hash)


// Do not remove!!
module.exports = HashTable;
