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
  // this is to store values in our new Arr aka this.storage
  // the key is coming from whatever fancy math stuff the hashCode func is spitting out
  // the value is the size of the new Arr aka this.SIZE
  // this set func adds the data, inserts the values in the arr
  // store it into the arr
  // think about obj as a container instead later on in case of collisions..

  let address = this.hashCode(key, this.SIZE);
  // this is to check if nothing is inside the storage, put this biddie in there!
  if(!this.storage[address]){
    this.storage[address] = []; //---> [[][][]] --> basically nested arrs but prob needs to be an obj if we get more stuff involved
  }

  // VESION 1: confusing AF for me so we will try this again
  // this version confuses me so i will store the value of hashcode into a new label called address
  // if(!this.storage[hashCode(key, this.SIZE)]){
  //   this.storage[hashCode(key, this.SIZE)] = [];
  // }
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
  // this is so we have a way to access values by their key
  // aka that fancy math func address we get from the hashCode func
  // the hashCode func will give us this address that points to this.storage
  // aka the array that holds the index and val of the fun stuff we wanna access

  // create a var to store the index or address
  let address = this.hashCode(key);
  // return this bad biddie out into the HashTable obj
  // set the address inside the storage Arr
  // find a way to check if the key spitted out already exists
  if(this.storage[address] === address){
    // totally unsure if it finds the same address should i just create a new
    // because this way if it finds it, its totally going to overrride the previous val

  }
  return this.storage[address];
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
  // like before, run the hashCod key func to get the address
  let address = this.hashCode(key);
  // if the key does not exist in the hash table, return undefined 
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
