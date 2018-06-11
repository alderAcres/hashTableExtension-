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
function LinkedList(key, value) {
  this[key] = value;
  console.log(LinkedList, this[key], value, "inside LL creation");
  this.tail = null;
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
  console.log(value, "ADD THIS");
  // KNOWN ISSUE: adding a third value to the LL does not work yet :(
  const convertedHash = hashCode(key, this.SIZE);

// create new HastTable 
  if (!this.storage[0]){
    this.storage = new Array(this.SIZE);   
    let newNode = new LinkedList(key, value);
    this.storage[hashCode(key, this.SIZE)] = newNode;
    return;
  }

  
  // creates a LinkedList if index from hashcode is empty
  // set the value to the index of the array, by using the hashCode
  
  
  
  // insert the key/pair values to LL if hashCode index is taken (to prevent collissions)
  // add an LL, if tail is empty
  while (!this.storage[convertedHash].tail){
    // tail becomes new node
    console.log(this.storage[convertedHash].tail, key, value);
    this.storage[convertedHash].tail =  new LinkedList(key, value);
    console.log(this.storage[convertedHash].tail, "THIS IS THE TAIL");
    console.log(this.storage[convertedHash].tail.tail, "THIS IS THE TAIL'S TAIL");
    
    return;

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
  // in case of value has not been stored in the hash table yet
  // console.log("in get");
  const convertedHash = hashCode(key, this.SIZE);
  if (!this.storage[convertedHash]) {
    // console.log("Not found");
    return
  }
  // base condition if key === to the this.key inside the LL
  let finder = this.storage[convertedHash];

  console.log(finder);
  if (this.storage[convertedHash]) {
    
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

let newArray = new HashTable;
newArray.set("keystring", "111");
newArray.set("keystring", "22222");
newArray.set("keystring", "33333");
newArray.get("keystring")
console.log("FINAL VALUE", newArray);