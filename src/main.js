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
   let arrayIndex = hashCode(key, this.SIZE)
   arrayIndex
   if (this.storage[arrayIndex]){
    this.storage[arrayIndex][key] = value
   } else {
     let newObject = {}
     newObject[key] = value
    this.storage[arrayIndex] = newObject  
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
    let arrayIndex = hashCode(key, this.SIZE);
    let object = this.storage[arrayIndex]
     
    for (let prop in object){
      if (prop === key){
        return object[prop]
      }
    }

    return false
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
  let arrayIndex = hashCode(key, this.SIZE);
  let object = this.storage[arrayIndex]
  console.log(object)

  if(!object){
    return undefined
  }

  for (let prop in object){
    if (prop === key){
      delete object[prop]
    }
  }

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

const phoneNumbers = new HashTable()
phoneNumbers.set('Anthony',9179969715)
phoneNumbers.set('Police',911)
console.log(phoneNumbers.get('Anthony'))
console.log(phoneNumbers.remove('Anthony'))
console.log(phoneNumbers.get('Anthony'))
console.log(phoneNumbers.set('Anthony',917))
console.log(phoneNumbers.set('Anthon',918))
console.log(phoneNumbers.set('davi',918))
console.log(phoneNumbers.get('davi',918))
console.log(phoneNumbers)