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
//not sure if this works...looks atrocious too.
HashTable.prototype.reHash = function(){
  for(let i in this.storage){
    if(Object.keys(this.storage[i]).length > 1){
      for(let i = 0; i < Object.keys(this.storage[i]).length; i++){
        this.set(Object.keys(this.storage[i])[i], Object.values(this.storage[i])[i])
      }
    }else {
      this.set(Object.keys(this.storage[i])[0],Object.values(this.storage[i])[0] )
    }
  } return 'yes'
}

HashTable.prototype.set = function(key, value) {
    //make a new hashTable
    //----------------------
    //check if number of values is 75% of this.SIZE
  if(Object.values(this.storage).length >= (0.75 * this.SIZE)){
    this.SIZE *= 2;
    //loop through and rehash everything
    //for(let i in this.storage){
      this.reHash();
    //}
  }
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
  //check if values inside are legit
  if(Object.values(this.storage).length - 1 > 16 && Object.values(this.storage).length < (this.SIZE/4)){
    this.SIZE /= 2;
    this.reHash();
  }
  //loop through storage
  for(let i in this.storage){
    //check if key in storage === key given
    if(Object.keys(this.storage[i])[0] === key){
      //delete item
      const deleted = this.storage[i]
      delete (this.storage[i]);
      //return hashtable
      return deleted;
    }
  }
  return undefined;
};



let newHash = new HashTable();
newHash.set('one', 1)
newHash.set('two', 2)
newHash.set('three', 3)
newHash.set('four', 4)
newHash.set('one', 11)
// console.log(newHash)
// newHash.remove('two')
// console.log(newHash)


newHash.reHash();
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
