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
  // wtf does key do? I thought the key came from the hashCode?

  // getting index for hashTable from the hashCode
  // switching the first paramter of hashCode from key to value will change the index
  // still confused on this one. 
  let hashIndex = hashCode(key, this.SIZE)

  const obj = {}

  // if this specific place in the storage arrays index
  // does not exist yet, set it to an empty obj so we can add to it later
  if (this.storage[hashIndex] === undefined) {
    this.storage[hashIndex] = obj
  }
  // once this index exists in an object, add keys and values like a linked list?
  // I need to check if the storage already has a key, and if it does then add to that object?
  // how do i add a new key/value pair to an already existing object

  // I'M ONLY PUTTING THE OBJECT AT THE BEGINNING NOOOOOOO and that's why it's just 'replacing' the old key/value pair
  // ! ALMOST WORKING BELOW
  if (this.storage[hashIndex][key]) {
    console.log('existing key')
    this.storage[hashIndex][key] = (this.storage[hashIndex][key] = value)
  } else {

    this.storage[hashIndex][key] = value
  }

  console.log(this.storage, hashIndex)
  // return the number of items stored in hash table... clearly doing above wrong if I test 
  // for 3 diff objects and still only get one? 
  let count = 0;
  this.storage.forEach(obj=> count++)
  return count
  // this solution only seems to work as long as the key and value are both different...
  // example : if key is 5 both times, the value WILL just replace the existing one. No good. 

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
  
  // need to search through hash table for the key and return the correct value.
  
  
  // grab the hashIndex with the hashCode and return that from the storage array.
  let hashIndex = hashCode(key, this.SIZE)
  
  // check if it's undefined
  // I think line 87 already implicitly returns undefined? Maybe I don't need line 85?
  if (this.storage[hashIndex] === undefined) return undefined

  return this.storage[hashIndex]
  
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
  
  let hashIndex = hashCode(key, this.SIZE)
  // if key is not found, return undefined
  if (!this.storage[hashIndex][key]) return undefined;
  // else delete the value from the table. 
  delete this.storage[hashIndex][key]
  return this.storage
  
};
testCase()


function testCase() {

  const test = new HashTable()
  console.log(test.set(5, 'test'))
  // test ^^ disappears
  console.log(test.set(5, 'collision'))
  console.log(test.set(3, 'another one'))
  
  console.log(test.get(5))

  console.log(test.remove(6))
  console.log(test.remove(5))
}
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
