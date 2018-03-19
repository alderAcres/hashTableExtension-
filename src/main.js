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


console.log("Running")
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

//For testing purposes 
//After testing need to change "newHashTable" 
//back to "this"
//let newHashTable = new HashTable();

HashTable.prototype.set = function(key, value) {
  let hash = hashCode(key, this.SIZE);
  let currentNode = this.storage[hash]
  
  if (this.storage[hash] === undefined){
    this.storage[hash] = {"key": key, "value": value, "next": null};
  } else {
    while (currentNode.next){
      currentNode = currentNode.next;
    }
    currentNode.next = {"key": key, "value": value, "next": null};
  }
};

//Testing
// HashTable.prototype.set("Mary", "Stephen");
// HashTable.prototype.set("Mary", "Heyy");

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
  let hash = hashCode(key, this.SIZE);
  let currentNode = this.storage[hash];

  if (currentNode.key === key){
    return isItAMatch(key, currentNode)
  } else {
    while (currentNode.next){
      currentNode = currentNode.next;
      return isItAMatch(key, currentNode)
    }
    return undefined;
  }

  function isItAMatch (key, node){
    if (node.key === key){
      return currentNode.value;
    } 
  }
};

//Testing
//console.log("REturn value: ", HashTable.prototype.get("Mary"))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let hash = hashCode(key, this.SIZE);
  let currentNode = this.storage;

  if (currentNode.key === key){
    if (isItAMatch(key, currentNode)){
      delete currentNode;
    }
  } else {
    while (currentNode.next){
      currentNode = currentNode.next;
      if (isItAMatch(key, currentNode)){
        delete currentNode
      }
    }
    return undefined;
  }

  function isItAMatch (key, node){
    if (node.key === key){
      return true;
    } else {
      return false;
    }
  }
};


//HashTable.prototype.remove('Mary')



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
