/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.stored = 0
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
    // first decalare an index variable, and set it to the invocation of hashcode 
    // using the key as the string parameter and then the size property of the hastable as the size parameter
    const index = hashCode (key, this.SIZE);
    //  check if there is already a object at the index value of the storage property
    //  if there already is a value add new key value pair from .set to that object
    //  finally update the value of the indexed position for the storage property
    if (this.storage[index]){
        this.storage[index][key] = value;
    } else {
      //  if there is no value there (the else case) create an object with the k/v pair from the .set function
      const obj = {};
      obj[key] = value; 
      this.storage[index] = obj;
      //  increment this.stored property because you are now adding an item to an additional index
      this.stored += 1;
    }
    return this.stored;
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
  //  declare an index constant that is set to the output of the hashcode function when invoked with key parameter
  const index = hashCode(key, this.SIZE);
  //  return the key of the value of the storage property @ the index constant
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
  //  declare index constant that is set to teh output of the hashcode function when invoeked with key and this.zie
  const index = hashCode(key, this.SIZE);
  //  declare a result variable and assignt that equal to the object value of the given key for the storage property at the index constant
  const result = this.storage[index][key];
  //  delete k/v pair @ object present in the storage property at the const index variable
  delete this.storage[index][key];
  //  return result
  //  i'd say you'd have to correct the this.stored property if the index container in the Hashtable becomes empty, but since there's still an empty object should i just leave it as is? **to be fixed in extension
  return result;
};

// const table = new HashTable()
// table.set('one', 1)

// console.log(table)

// table.set('two', 2)

// console.log(table)

// console.log(table.remove('two'))
// table.set('three', 3)

// console.log(table)
// console.log(table.remove('two'))

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
