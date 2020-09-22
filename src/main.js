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
  // Determine hash value 
let newHash = hashCode(key, this.SIZE);

  //Determine if an object already exists at this hash value
if(!this.storage[newHash]) {

  //No object exists then create new empty object
  this.storage[newHash] = {};

  //Set key value pair in appropriate hash location
  this.storage[newHash][key] = value;


  //Hash already exisits with key
} else if(this.storage[newHash][key]){

  //Reset key value to new value passed in with function
   this.storage[newHash][key] = value;


  //Obj is defined but no matching key then set key value pair
} else this.storage[newHash][key] = value;

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
// Determine hash value 
let newHash = hashCode(key, this.SIZE);

//Does an obj exist at this hash and if not return no key  value exists
if(this.storage[newHash] === undefined) return 'No value with this key exists';


//Object exists but no matching key pair then return no key value exists
else if(this.storage[newHash][key] === undefined) return 'No value with this key exists';


//Key is found in appropriate hash: return matching value
else return this.storage[newHash][key];

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
// Determine hash value 
let newHash = hashCode(key, this.SIZE);

//Determine if obj exists at key or if key exists within obj

if(this.storage[newHash] === undefined) return undefined;

else if(this.storage[newHash][key] === undefined) return undefined;

else{
//Store value of key pair that is being deleted
  let output = this.storage[newHash][key];

  //Delete key pair
  delete this.storage[newHash][key];

  //Return value of passed in key
  return output;
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


let newHaz = new HashTable();

newHaz.set('hi', 45)
newHaz.set('hi', 50)
newHaz.set('bi', 45)
newHaz.set('bye', 45)
newHaz.set('hello', 5)
newHaz.set('hey', 5)
// newHaz.set('no', 5)
console.log(newHaz.remove('adios'))

console.log(newHaz.get('hi'))
console.log(newHaz.get('no'))

console.log(newHaz)