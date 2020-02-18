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
  // declare a variable and assign it the retunr value of calling the hashCode function
  const index = hashCode(key, key.length);

  // declare an empty object to save the key-value pair that will be stored in the hash table
  const keyValObj = {};
  keyValObj[key] = value;


  // check if the key exist
  if (this.storage[index[key]] === key) {

    // we overite the the value with the new one
    this.storage[index] = keyValObj;
  }

  // check if the is another key-value pair at that index
  else if (this.storage[index]) {

    // if true, we add the new K-V pair in the object
    this.storage[index] = keyValObj;
  }

  // if the key doesnt exixt in the table and the is no other value at that index 
  else {

    // we store the K-V pair 
    this.storage[index] = keyValObj;
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
HashTable.prototype.get = function (key) {
  // iterate through the array and look at they of each stored object
  for (let i = 0; i < this.storage.length; i++) {

    //declare a varible to store the object at index
    let element = this.storage[i];

    // check if the key of the object is the sames as the argument
    for (let prop in element) {
      if (prop === key) {
        console.log(element[prop]);

        //return the value that object
        return element[prop];
      }
    }
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
HashTable.prototype.remove = function (key) {
  // iterate through the hash table
  for (let i = 0; i < this.storage.length; i++) {
    let element = this.storage[i];
    console.log(this.storage[i])

    for (let prop in element) {
      //if true
      if (prop === key) {
        console.log(prop)
        // declare a variable and assign it the K-V pair to be removed
        let removed = element[prop];
        // delete the K-V pair
        delete element[prop];
        // return the saved K-V pair
        return removed;
      }
    }
    // return undefined if the key doesnt exist in the table
    return undefined;
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

const hash = new HashTable();


hash.set('Binta', 5);
hash.set('Mary', 8);
hash.set('Binta', 7);
console.log(hash.get('Binta'));
console.log(hash.remove('Binta'))
console.log(hash);







// Do not remove!!
module.exports = HashTable;