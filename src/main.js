/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/



class HashTable {

  table = new Array(16)
 
//declare a function on setitem that hashs and sets a key-value pair
  setItem = (key, value) => {
    //declare a variable assigned to the key passed into the hashing function
    const idx = hashCode(key)
    //declare the hashed idx as a key on the table with the passed in value
    this.table[idx] = value
  }
// declare a function on the getItem that takes a key and returns the value associated with that key passed into the hashing function
  getItem = (key) => {
    // declare a variable idx that is assigned to the key passed into the hashing function
    const idx = hashCode(key)
    // return the value associated with that index
    return this.table[idx]
  }
}
const Table = new HashTable();
Table.setItem("pet", "dog");
Table.getItem("pet");
console.log(Table.getItem("pet"));

// function HashTable() {
//   this.SIZE = 16;
  
//   this.storage = new Array(this.SIZE);
// }

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


/*

// I've copied and pasted what I believe to be the previous code since I believe I may have done the hashtable in the datastructures unit by accident

// i think I may has started making this for an object but I don't believe im implementing the hash function to save the key-value pairs


function HashTable() {
  this.SIZE = 16;

  // the array will be instantiated as [undefined, undefined....]
  // pop() and push() shouldn't be used on the storage

  //this.storage is an array of 16 elements and will be used to store key, value pairs
  this.storage = new Array(this.SIZE);
}

let newHash = new HashTable()

console.log(newHash.storage)
// stores a value in the storage array
// hint: use the hash function to determine where in the array to store the value
HashTable.prototype.set = function(key, value) {
  // declare a variable last and assign it to undefined
  var last = undefined;
  // if the new object has the key, reassign the last variable to the storage property and then set the value to that key
  if (this.storage.includes(hashCode(key))) {
      last = this.storage[key];
  }
  //push the key value pair to the storage array (how do i hash this to store in the buckets)
// is this how i turn the key-value pair into a string?  like I use this string and the size of the storage array as parameters for the hasfunction to come up with the storage index?
  this.storage.push(hashCode(key, this.storage.length));
  // return the newly made property
  return last;
};

// return a previously stored value
HashTable.prototype.get = function(key) {
  // if the HashTable includes the key return the key, else return undefined
  if (this.storage.includes(key)){return this.storage[key]}
    else {return undefined} 
};

// returns and removes a key from the hash table
HashTable.prototype.remove = function(key) {
  // if the storage includes the key
if (this.storage.includes(key)){
  delete storage[key]
}
};

// returns a number between 0 and size that is unique* and generated from the the inputted string
function hashCode(string, size){
  let hash = 0;
  if (string.length == 0) return hash;
  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % size ;
}

console.log(newHash)

*/