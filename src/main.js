/*
 * Data is inputted into an array at a specific location in the form of key value pairs.This location can be referred to as a "bucket"
 * Hashing - we use a process called hashing to convert some sort of immutable string into an integer.This integer then becomes to index of the array where our key value will be stored
 */


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

/*
  create a const variable that will hold the evaluated result of hashCode with the key and size passed in <==== this assigns the buckets
  check if it doesn't exist within the hash table, if it doesn't
    within the this.storage object, pass key parameter as a key within storage and assign it the value of user input value
  otherwise 
    otherwise, enter the bucket where key exists and assign it the value
  return the evaluated result of key and size (bucket)

  ***** double check why line 42 => why does key have to be within brackets?  *****
*/

// (!this.storage[hashCodeEval]) ? this.storage[hashCodeEval] = {[key]: value} : this.storage[hashCodeEval[key] = value] ternary option? doesn't look too clean

HashTable.prototype.set = function (key, value) {
  const hashCodeEval = hashCode(key, this.SIZE)
  if (!this.storage[hashCodeEval]) {
    this.storage[hashCodeEval] = {
      [key]: value
    }
  } else {
    this.storage[hashCodeEval][key] = value
  }


  return hash
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

/*
  enters the hash table at a certain key to retrieve the specified key
  create a constant that will be the evaluated result of hashCode with key parameter passed in and this.size
  create a bucket variable that will be used to enter the bucket
  enter the if conditional and see if the bucket exists of if the key we're looking for exists within the bucket (the bucket can exist but the key may not)
    if all these statements are true, return undefined because what we're looking for doesn't exist
  return the bucket withe the key parameter passed in as the bucket's key
*/


HashTable.prototype.get = function (key) {
  const hashCodeEval = hashCode(key, this.SIZE)
  const bucket = this.storage[hashCodeEval]
  if (bucket === undefined || bucket[key] === undefined) return undefined
  return bucket[key]
};
/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */

/*
  create a constant variable that will be the evaluated value of hashCode with userinput key passed in => spits out a value between 0 and this.size 
  create a bucket variable that will be the actual bucket
  check if bucket exists or if within the bucket, there's is something there 
  create a variable deleted that we will eventually use to return 
  delete the value we want
  return deleted

  notes: even though we created a storage with a length of 16, all of those 16 positions are undefined since there are no values.

  console.log(const storage = new Array(16)) => undefined
  console.log(storage) => (16) [empty x 16]
  console.log(storage[5]) => undefined

  if conditional checks if bucket[key] is undefined or if bucket is falsey 
*/

HashTable.prototype.remove = function (key) {
  const hashCodeEval = hashCode(key, this.SIZE)
  const bucket = this.storage[hashCodeEval]
  // check if the bucket exists
  if (bucket === undefined || bucket[key] === undefined) return undefined
  // variable needs to be created to hold on to the value that needs to be returned. after deletion, there will be no references to that value so we create it before deletion and return it afterwards
  const current = bucket[key]
  delete bucket[key]
  return current
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
const newHash = new HashTable()
console.log(newHash.set(1, "a"))
  // HashTable { SIZE: 16, storage: [ { '1': 'a' }, <15 empty items> ] }
console.log(newHash.set(12, "tommy"))
  // HashTable { SIZE: 16, storage: [{ '1': 'a', '12': 'tommy' }, < 15 empty items > ] }
console.log(newHash.remove(14))
  // undefined
console.log(newHash.remove(1));
  // HashTable { SIZE: 16, storage: [ {}, <15 empty items> ] }
console.log(newHash.get(14))
  // undefined
console.log(newHash.get(14))
  // tommy
console.log(newHash)
*/