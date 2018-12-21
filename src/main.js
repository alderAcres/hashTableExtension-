/**
 * I'm not sure whether my code works right now because I struggled with creating tests,
 * but I tried to pseudocode as much as possible so you can understand my thought process and
 * hopefully give feedback on where I went wrong in my logic or code.
 */




/**
* HashTable constructor
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
  // calculate space/location in hashtable
  let space = hashCode(key, this.SIZE);
  // if there is no place to store information in that space, create an empty object
  if (this.storage[space] === undefined) {
    this.storage = {}
  // otherwise if the key of a key value pair already located in the object matches the key
  // that you are trying to add, overwrite the existing value with the new one (passed in to the function)
  } else if (this.storage[key] === key) {
  // ^ I'm not sure I'm accessing the right element in storage in my conditional here
    this.storage[space][key] = value
  } else {
  // otherwise, add the new key value pair to the object
  this.storage[space][key] = value;
  // ^ this code is the same as line 35 so I think I can delete my else if; although, I know my code
  // should have a conditional to overwrite an existing key value pair if the keys are the same but
  // the values are different, and I don't understand how that code would be different from what I have.
  }
  return Object.keys(this.storage).length;
};

// also I am not sure what to write to test this code... I will ask someone for advice on that.


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
  // find the space in the hashtable associated with the key given
  let space = hashCode(key, this.SIZE);
  // once in that space, return the value associated
  if (this.storage[key] === key) {
    // if there's only one key value pair associated with input key, return it
    return this.storage[space][key]
  } else {
    // if there is more than one key value pair associated with the input key,
    // return the value that was originally stored at that key (would be index 0 in an array...)
    return Object.values(this.storage[space][key][0]);
    // ^ turned the object into an array and returned the value of the 0th key value pair
    // I wanted to access the object in the space, and within that, only the values associated with
    // the specific key. I'm still fuzzy on how to access something like that.
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
  // identify the space in the hashtable where the key is located
  let space = hashCode(key, this.SIZE);
  // if the space does not have an instance of the input key, return undefined
  if (!this.storage[space].hasOwnProperty(key)) {
    return undefined;
  } else {
    // otherwise, save the fated value to a variable
    let byeBye = this.storage[space][key];
    // delete the key value pair from the hashtable
    delete this.storage[space][key];
    // return the deleted value
    return byeBye;
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
