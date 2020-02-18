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
  //need to keep track of the number of items in the table
  this.items = 0;
  this.storage = [];
    //intialize each of the buckets into an empty object
  for(let i = 0 ; i < this.SIZE ; i++) this.storage.push({});
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
  //use objects to handle collisions(key:value pairs)
  //also need to check if the provided key is to be overwritten
  if(this.storage[hashCode(key,this.SIZE)][key] === undefined){
    this.items++;
    if(this.items / this.SIZE > 0.75) this.rehash(this.SIZE * 2);
  }
  this.storage[hashCode(key,this.SIZE)][key] = value;
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
  return this.storage[hashCode(key,this.SIZE)][key];
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
  const ret = this.storage[hashCode(key,this.SIZE)][key];
  if(ret !== undefined){
    delete this.storage[hashCode(key,this.SIZE)][key];
    this.items--;
    if(this.SIZE > 16 && this.items / this.SIZE < 0.25) this.rehash(this.SIZE / 2);
  }
  return ret;
};

/**
 * rehash - converts a hashtable into either a smaller or larger size of itself(after hitting the 25% or 75% item storage threshold)
 * @param {number} size - new size of the hash table to be made 
 * no return value, rather set new this.storage and this.SIZE to be new respective values
 */
HashTable.prototype.rehash = function(size){
  const newHash = [];
  for(let i = 0 ; i < size ; i++) newHash.push({});
  //iterate through the original hash table and put all the key value pairs into the new hash table
  for(let obj of this.storage){
    for(let key in obj){
      let hashC = hashCode(key,size);
      newHash[hashC][key] = obj[key];
    }
  }
  this.storage = newHash;
  this.SIZE = size;
}

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

// const hashT = new HashTable();
// for(let i = 0 ; i < 13 ; i++) hashT.set(`key:${i}`,i);
// //for(let i = 0 ; i < 6 ; i++) hashT.remove(`key:${i}`);

// console.log(hashT);

// const hashT2 = new HashTable();

// for(let i = 6 ; i < 13 ; i++) hashT2.set(`key:${i}`,i);

// console.log(hashT2);
