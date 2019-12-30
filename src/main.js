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
HashTable.prototype.set = function (key, value) {
  //create the index
  const index = hashCode(key, this.SIZE)
  //check if the storage is empty, if not then we push it into the position
  if (this.storage[index] !== undefined) {
    this.storage[index].push({ 'key': key, 'value': value });
  } else {
    //if empty we create a new object with 'key' and 'value' as a key
    this.storage[index] = [{ 'key': key, 'value': value }];
    console.log(index)
  }

};
const hash = new HashTable()
hash.set('will', 50)
hash.set('r', 60)
//hash.set('bill', 30)
console.log(hash)

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
HashTable.prototype.get = function (key) {
  //get the hashCode index
  const index = hashCode(key, this.SIZE)
  //if the storage is empty we return "not found"
  if (!this.storage[index]) return "Not Found";
  //if storage is not empty then we loop through the objects contained in the array
  for (let i = 0; i < this.storage[index].length; i += 1) {
    //console.log(this.storage[index][i]['key'])
    if (this.storage[index][i]['key'] === key) {
      return this.storage[index][i]['value']
    }
  }

};
console.log(hash.get('r'))
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  const index = hashCode(key, this.SIZE)
  if (this.storage[index]) {
    for (let i = 0; i < this.storage[index].length; i += 1) {
      if (this.storage[index][i]['key'] === key) {
        const temp = this.storage[index][i]['value'];
        //console.log(temp)
        delete this.storage[index][i]
        //this.storage[index][i]['key'] = undefined;

        console.log(this.storage)
        return temp;

      }
    }
  }
  return undefined;
};
console.log(hash.remove('will'))

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
console.log(this.SIZE)
console.log(hashCode('will', 16))
// Do not remove!!
module.exports = HashTable;
