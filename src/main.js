/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.size = 16;
  
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
  // hash to get the new index
  let hashedIndex = hashCode(key,this.size)
  console.log(hashedIndex)
  // store the hashed key and value in an object
  let hashedValue = {}
  // if the new index of the array is not filled
  if(this.storage[hashedIndex] === undefined) {
    hashedValue[key] = value
    // store the value in the hashed index of the table
    this.storage[hashedIndex] = hashedValue
  }
  // if there is already an object in that hashded index
  else{
    // update the new key value pair in object or add a new key value pair to handle collision
    this.storage[hashedIndex][key] = value
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
  // check if there is is a key
  if(!this.storage[hashCode(key,this.size)]) return undefined
  console.log(this.storage[hashCode(key,this.size)][key])
  // look up the new index of the key using the hashCode and get the value of the key
  return this.storage[hashCode(key,this.size)][key]

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
  // find the index of the key
  let hashedIndex = hashCode(key,this.size)
  
  // store the key to remove in variable
  let removedItem = this.storage[hashedIndex][key]
  // if they key does not exist in the hashed index return undefined
  if(!this.storage[hashedIndex] || !this.storage[hashedIndex][key]) return undefined
    // otherwise delete the key
  delete this.storage[key]
  console.log(removedItem)
  // return the removed key after storing it in variable
  return removedItem
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

let case1 = new HashTable
case1.set('hello',10)
case1.set('alala',10)
console.log(case1.get('alala'))
console.log(case1.get('codesmith'))

console.log(case1.remove('hello'))

console.log(case1)
// Do not remove!!
module.exports = HashTable;
