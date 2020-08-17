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
 let arr = [undefined,2,undefined,undefined];
 console.log(Object.values(arr))
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
  //declare an empty object that will eventually hold the key and value as key-value pairs
  const obj = {};
  //create a variable postion that is equal to the result of calling hashCode
  const position = hashCode(key,this.SIZE);
  //Reassign on the storage array so that object is value of the key,which is named position
  if (!this.storage[position]){
    obj[key]= value
    this.storage[position] = obj;
  } else {
    const exObj = this.storage[position];
    exObj[key] = value;
  }
  //create a holding and variable followed by a loop that adds one to the variable if the value of the object is not equal to undefinded
  let sum = 0;
  for (let i = 0; i < this.storage.length; i++){
    if (Object.values(this.storage !== undefined)){ 
      sum++;
    }
  }
  //return the sum
  return sum;
};
console.log(HashTable.prototype.set)

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
  //declare a variable postion that will allow us to acces the key on the storage object
  const position = hashCode(key,this.SIZE);
  //if there is not a value at the key then return undefined
  if (this.storage[position] === undefined) return undefined;
  return this.storage[position][key]
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
//declare a variable postion that will allow us to acces the key on the storage object
const position = hashCode(key,this.SIZE);
const retrieve = this.storage.splice(position,0,undefined)
const removed = this.storage.splice(position+1,0)
return retrieve[position][key];
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
