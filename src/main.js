/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.population = 0;
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
  
  let hAddress = hashCode(key, this.SIZE);
  // TODO => handle more than one key value pair....
  if(this.storage[hAddress] === undefined) {
    this.storage[hAddress] = [key, value];
  } else {
    if(this.storage[hAddress].length > 1 && Array.isArray(this.storage[hAddress][0])){
      let tempArr = this.storage[hAddress];
      for (let el of tempArr) {
        if (el[0] === key) {
          el[1] = value;
          return this.population;
        }
      }
    } else {
      if(this.storage[hAddress][0] === key) {
        console.log('he')
        this.storage[hAddress][1] = value;
        return this.population;
      } else {
        this.storage[hAddress].push([key, value]);
      }
      // this.storage[hAddress] = [this.storage[hAddress]];
      // this.storage[hAddress].push([key, value]);
    }
  }
  this.population++;
  return this.population;
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
  //handle collusions;
  if (!this.storage[hashCode(key, this.SIZE)]) return -1;
  if (this.storage[hashCode(key, this.SIZE)].length > 1) {
    let tempArr = this.storage[hashCode(key, this.SIZE)];
    for(let el of tempArr) {
      if (el[0] === key) return el[1];
    }
    return undefined;
  } else {
    return this.storage[hashCode(key, this.SIZE)][1];
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
  //nothing stored in the address
  if(!this.storage[hashCode(key, this.SIZE)]) return undefined;
  let temp;
  const getter = () => {
    if (!this.storage[hashCode(key, this.SIZE)]) return -1;
    if (this.storage[hashCode(key, this.SIZE)].length > 1) {
      let tempArr = this.storage[hashCode(key, this.SIZE)];
      for(let el of tempArr) {
        if (el[0] === key) {
          temp = el;
          delete el;
        }
      }
      return undefined;
    } else {
      temp = this.storage[hashCode(key, this.SIZE)];
      delete this.storage[hashCode(key, this.SIZE)];
    }
  }
  this.population--;
  return temp;
  // TODO => What if more than one key/value pair in the address
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

let safe = new HashTable();
console.log(safe.set('arman', true));
console.log(safe.set('arman', true));
console.log(hashCode('arman',safe.SIZE));
console.log(safe.remove('arman'));
console.log(safe.get('a'));
console.log(safe.storage);