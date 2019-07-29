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
  this.numberSetItems = 0;
  this.overWritten = new Array(0); // we can pass values we overwrite to a new Array 
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately. (Collisions can be handled using arrays or linked lists)
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  //need to create a hashedAddress using key param and hashCode fcn
  //store value in hash table at hashed address
  //increment and return numberSetitems
  //if key already exists, overwrite the value
  //if hashedKey already contains an object, handle the collision
  const hashedAddress = hashCode(key, this.SIZE);
    if (typeof key !== 'string' || typeof key !== 'number' || typeof key !== 'boolean') return 'Invalid key value';
    if (this.storage[hashedAddress] === undefined) {
      this.storage[hashedAddress] = []; //This should hopefully help us avoid collisions, we can push multiple items to our array
      this.storage[hashedAddress].push({ key: value });
    } else if (this.storage[hashedAddress].length === 1 && this.storage[hashedAddress].hasOwnProperty(key)) {//should overwrite key/value pair if key value already exists in our sub array
      this.overWritten.push(this.storage[hashedAddress]);
      this.storage[hashedAddress] = {key: value};
    } else { //if something already exists at that hashedKey but the key values are different
      this.storage[hashedAddress].push({key: value});
    }
  this.numberSetItems += 1;
  return this.numberSetItems; // returns number of items stored in hashTable
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
  if (typeof key !== 'string' || typeof key !== 'number' || typeof key !== 'boolean') return 'Invalid key value';
  //use key and hashedCode to get hashedKey
  const hashedKey = hashCode(key);
  if (this.hashedKey[hashedKey].length <= 1) { //if length === 0, return undefined, else return single value stored 
    return Object.values(this.storage[hashedKey]);
  } else { //if length >= 1, need to iterate through and find correct key/value pair
    for (let i = 0; i < this.storage[hashedKey].length; i++) {
      if (this.storage[hashedKey][i].hasOwnProperty(key)) {
        return this.storage[hashedKey][i];
      }
    }
  }
  

  /*If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key*/
  //I'm running out of time but we can go through our overwritten array and find the first instance of a key and return the value


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
  if (typeof key !== 'string' || typeof key !== 'number' || typeof key !== 'boolean') return 'Invalid key value';
  //need to get hashedKey using key and hashCode
  //need to check size of this.storage[hashedCode] -> if 0, return undefined, if 1, store value to deletedVal, else need to iterate through and find correct K/V pair
  const hashedKey = hashCode(key);
  if (this.storage[hashedKey] === undefined) return undefined;

  if (this.storage[hashedKey].length === 1 && this.storage[hashedKey].hasOwnProperty(key)) {
    this.storage[hashedKey] = undefined;
  } else if (this.storage[hashedKey].length > 1) { //iterate through until you find correct k/v pair, then re-dfine to undefined
    for (let i = 0; i < this.storage[hashedKey].length; i+=1) {
      if (this.storage[hashedKey][i].hasOwnValue(key)) {
        this.storage[hashedKey][i] = undefined;
      }
    }
  }
  this.numberSetItems -= 1;
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
