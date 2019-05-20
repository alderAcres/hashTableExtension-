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
  // locate hash address from our hashcode function
  const addy = hashCode(key,this.SIZE);
  // create an object and add its keys and value
  const obj = {};
  obj[key] = value;
  // if the address is undefined, then we can set our obj in the address
  if (this.storage[addy] === undefined){
    this.storage[addy] = obj;
  } else {
    // else, if already defined. we will overwrite the key value
     this.storage[addy][key] = value;
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
  // locate address of our object to retrive our key
  const addy = hashCode(key,this.SIZE);
  // save the value associated with the key
  const result = this.storage[addy][key];
  // return result;
  return result;
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
  // locate address using our hashcode
  const addy = hashCode(key,this.SIZE);
  // loop in our our obj, if the key of our obj matches our key arg, then remove
  for (let objKey in this.storage[addy]){
    if (objKey == key){
      delete this.storage[addy][objKey];
    }
  }
  // else, return undefined
  return undefined;c
};



// const test = new HashTable();
// test.set(6, `hello`);
// test.set(8, `hello`);
// test.set(8,`bye`);
// // console.log(test.get(8)) 
// test.remove(6)
// console.log(test);



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
