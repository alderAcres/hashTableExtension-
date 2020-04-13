/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16; // size of hash
  this.items = 0; // items currently the hash table holds
  this.storage = new Array(this.SIZE); // array that holds the items
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
  const hash = hashCode(key); // generate hash
  if(this.storage[hash] === undefined){ // check if this hash holds any keys
    this.storage[hash] = {}; // if not create an empty object that we will later mutate
  }
  if(this.storage[hash][key] === undefined){ // check if the key we are setting is new 
                                            // to the table so we then increment
                                            // this.items by one
    this.items++;
  }
  this.storage[hash][key] = value; // set the value of the key stored at the storage's hash
  return this.items;
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
  const hash = hashCode(key); // generate hash
  return this.storage[hash][key]; // grab they value stored at the key that the hash's object hold
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
  const hash = hashCode(key); // generate code
  if(this.storage[hash][key] === undefined) return undefined; // check if the key doesn't exist

  const cachedVal = this.storage[hash][key]; // store the value the key holds
  delete this.storage[hash][key]; // delete the key the hash holds
  this.items--; // decrease the number of items the hash table holds
  return cachedVal;
};

/*
const table = new HashTable();
table.set("foo", "dur");
console.log(table.storage);
console.log(table.items);
table.set("foo", "dur");
console.log(table.storage);
console.log(table.items);
table.set("foo", "bar");
table.set("bar", "foo");
console.log(table.items);
console.log(table.storage);
console.log(table.get("foo"));
console.log(table.items);
console.log(table.remove("foo"));
console.log(table.items);
console.log(table.remove("foo"));
console.log(table.items);
console.log(table.remove("bar"));
console.log(table.storage);
console.log(table.remove("dfdfd"));
console.log(table.items);*/
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
