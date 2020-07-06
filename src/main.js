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
  
  const idx = hashCode(key, this.SIZE)
  let hashed = this.storage[idx];
  
  if(!hashed){
    
    this.storage[idx] = {
      [key]: value
    };

  }else{
        
    this.storage[idx][key] = value;
    
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
  console.log("FIND KEY ", key);
  let retrieve = this.storage[hashCode(key, this.SIZE)];
  
  console.log("TESTING ", retrieve);
  if(retrieve[key]){
    console.log("retrieve ", retrieve[key]);
    return retrieve[key];
  }

};

let hashed = new HashTable();

hashed.set("Jack", "Crish");

//console.log( hashed.get("Jack") );

hashed.set("jetta", "baby" );
hashed.set("Bella", "vista");
hashed.set("Terrific", "Mantra");
hashed.set("jetta", "blue");
hashed.set("John", "Blevins");
hashed.set("Paul", "Gotfried");
hashed.set("Jimm", "Blunder");

//console.log( hashed.storage );

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

  //REFACTOR!
  
  //console.log( 'delete this item ', this.storage[del]);
  if(this.storage[del][key]){
    delete this.storage[del][key];
  }
  //console.log( this.storage.length, this.storage );
  return this.storage;

};

hashed.remove("jetta");
hashed.remove("Jimm");
hashed.set("Jimm", "Blunder");
console.log( hashed.storage)
console.log(hashed.get("Jack"));
hashed.remove("Terrific");
console.log(hashed.storage);
hashed.remove("Jack");
console.log(hashed.storage);


//console.log(hashed.storage.length, hashed.storage);

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
