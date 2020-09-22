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

  //create hash
  let hash = hashCode(key, this.SIZE)

  if(!hash in this.storage) return 'No value hashed'

  // set new value
  if(this.storage[hash] === undefined){
      this.storage[hash] = value;
  }
  // just updating value
  else if(hash in this.storage && this.storage[hash] !== value){
      this.storage[hash] = value
  }
  // collision detected
  else {
    //  create empty obj for to store multiple hash
    let myHashObj = {}

    // no hash object yet and must create one
    if(this.storage[hash] !== "[object Object]"){
      
      let newHash = hash(this.storage[hash], this.SIZE)
      myHashObj[newHash] = this.storage[hash]

      let otherHash = hash(value, this.SIZE)
      myHashObj[otherHash] = value

    }// Another hash table already exist
    else{
      // rehash
      let newHash = hash(value, this.SIZE)

      // assign to inner object
      this.storage[hash][newHash] = value

    }

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
  // create hash
  let hash = hashCode(key, this.SIZE)

  // retrives a stored value w/ speificed key
  if(this.storage[hash] !== 'undefined' && this.storage){
    return this.storage[hash]
  }
  // retrives hash with multiple values
  else{
   
    return true
   
  }

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

// Do not remove!!
module.exports = HashTable;

let myTable = new HashTable()

// set new value 
myTable.set('abc','23')
// overwrite current value
myTable.set('abc', 122)

// get unhashed value
console.log(myTable.get('ac'))
// get value

