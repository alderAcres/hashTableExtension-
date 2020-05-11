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
  // get the index of the key value pair by passing in the key to the hash function
  // if array[hashed index is empty] create an empty object
  // set the value of the array at hashed index to be equal to the passed key and value
  // if the a key value pair already exists at hashed index, add the current key value pair to the existing object
  // if the key is the same as a previously passed key, overwrite that key with the new value

  let index = hashCode(key, this.SIZE);
  if (!this.storage[index]){
    this.storage[index] = {};
  } 
  this.storage[index][key] = value;
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
  let index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined || this.storage[index][key] === undefined){
    return `value for ${key} does not exist in storage`;
  }
  return this.storage[index][key];
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
  let index = hashCode(key, this.size);
  if (this.storage[index] === undefined || this.storage[index][key] === undefined){
    return undefined;
  }
  let deletedValue = this.storage[index][key];
  delete this.storage[index][key];
  return deletedValue;
};


let test = new HashTable();
console.log(hashCode('bat', 16));
console.log(hashCode('rat', 16));
test.set('bat', 21);
test.set('rat', 22);
console.log(test.get('bat'));
console.log(test.get('rat'));
console.log(test.get('matt'));
test.set('bat', 'my name jeff');
console.log(test.get('bat'));
test.set('bat', 'y u no delete');
console.log(test.remove('cat'));
console.log(test.remove('bat')) // value not deleting, possibly because i'm trying to delete a key value pair that's stored in an array?
console.log(test.get('bat'));

// const testObject = {name: 'matt', age: 29};
// delete testObject.name;
// console.log(testObject);






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
