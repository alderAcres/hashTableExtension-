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
    //make a new hashTable
  const hash = hashCode(key, this.SIZE);
        //check if storage has hash value
  if(this.storage[hash]){
    //set storage with hash/key to value (overwrite)
    this.storage[hash][key] = value;
  }else { //avoid collision
        //set storage w/ hash to empty obj
    this.storage[hash] = {};
        //set storage with hash/key to value
    this.storage[hash][key] = value;
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

//return a previously stored value
HashTable.prototype.get = function(key) {
    //loop through this.storage array
  for(let i in this.storage){
        //check if key in hash table is equal to passed in key
    if(Object.keys(this.storage[i])[0] === key){
            //return that key
      return Object.values(this.storage[i])[0];
    }//else return false/null/'key does not exist in hash table'
  } return false;
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
  //loop through storage
  for(let i in this.storage){
    //check if key in storage === key given
    if(Object.keys(this.storage[i])[0] === key){
      //delete item
      const deleted = this.storage[i]
      console.log(deleted)
      delete (this.storage[i]);
      //return hashtable
      return deleted;
    }
  }
  return undefined;
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


let newHash = new HashTable();
newHash.set('one', 1)
newHash.set('two', 2)
newHash.set('three', 3)
newHash.set('four', 4)
newHash.set('one', 11)
console.log(newHash)
newHash.remove('two')
console.log(newHash)
console.log(newHash.get('one'))
// Do not remove!!
module.exports = HashTable;
