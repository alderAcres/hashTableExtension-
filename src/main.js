/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  
  //creates a new Hash storage array of size 16
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

  //else get the hash code using the given function
    //check to see if location is already occupied
      //if occupied add as another key-value pair in the object
      //if not occupied save as an object

HashTable.prototype.set = function(key, value) {
  //add given value to hash table with specified key

  // will invoke function hash code and save result in constant variable code
  const code = hashCode(key, key.length);
  console.log(code)
  
  //is our bucket empty?
  if(!this.storage[code]){
    //if so create a new object with our key value pair
    this.storage[code] = {}
    this.storage[code][key] = value;
  }else{
    //else create a new key value pair within the bucket
    this.storage[code][key] = value
  } 
};

const hash = new HashTable();
//console.log(hash)
hash.set('dan', true)
hash.set('markusLarkus', 5)
console.log(hash)

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
  //make sure key is a string
  if(typeof key !== "string") throw new Error('Please input a string value');
  //get hash code
  const code = hashCode(key, key.length)
  let value;
  //check to see if our hash table has object
  if(this.storage[code][key]){
    value = this.storage[code][key];
  }
  return value

};

//hash.get(2)
//console.log(hash.get('dan'), '=> true')
//key that doesn't exist should return undefined
//console.log(hash.get('Victor'), '=> undefined')

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //make sure key is a string
  if(typeof key !== "string") throw new Error('Please input a string value');
  
  //get hash code
  const code = hashCode(key, key.length)
  
  //if it doesn't exist, return undefined
  if(!this.storage[code][key]){
    return undefined
  }else{
    //else if it does exist, delete the key/value pair and return the deleted value
    let returnVal = this.storage[code][key];
    delete this.storage[code][key];
    return returnVal
  }

};

//if it doesn't exist, return undefined
console.log(hash.remove('Victor'), '=> undefined')
//if it does exist, delete the key/value pair and return value
console.log(hash.remove('dan'), '=> true')
//check to make sure deleted, should return undefined
console.log(hash.get('dan'), '=> undefined')

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
