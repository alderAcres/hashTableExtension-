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
  if(!this.storage[hashCode(key, this.SIZE)]){;
    this.storage[hashCode(key, this.SIZE)] = {key : value};
  }else{
    console.log(" COLLISION FOUND ")
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
  let retrieve = this.storage[hashCode(key, this.SIZE)];
  console.log(hashCode(key, this.SIZE)) 
  console.log( this.storage[hashCode(key, this.SIZE)])
  if( retreive ){
    
  }
  console.log(" retrieve ", retrieve);
  return this.storage[retrieve];
};

let hashed = new HashTable();

hashed.set("Jack", "Crish");

console.log( hashed.get("Jack") );

hashed.set("jetta", "baby" );
hashed.set("Bella", "vista");
hashed.set("Terrific", "Mantra");
hashed.set("jetta", "blue");

console.log( hashed.storage );

console.log(hashed.get("Bella"), hashed.get("jetta"), hashed.get("Jack"))
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {

  //using delete on an array will allow retaining empty cells.
  //double check if length is modified. If not you will need to manually update
  //each get/set.

  let del = hashCode(key, this.SIZE);

  console.log( 'delete this item ', this.storage[del]);
  delete this.storage[del];

  console.log( this.storage.length, this.storage );
  return this.storage;

};

hashed.remove("jetta");

console.log( hashed.storage)

hashed.remove("Terrific");

console.log(hashed.storage.length, hashed.storage);

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
