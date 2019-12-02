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

// create variable that will hold new hashtable, console.log to check
// let newTable = new HashTable();
// console.log(newTable)

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

// input : (key, value) pairs
// output: number of pairs in the hash table

HashTable.prototype.set = function(key, value) {
  // use hashCode funciton to determine where to store key value pair
  let index = hashCode(key, this.SIZE);
  console.log(index);
  // if the index does not exist in storage, then save the key value pair at this index
  if (!this.storage[index]) {
    this.storage[index] = { [key]: value };
    // if it already exists, save the value handling collision appropriately
  } else if (this.storage[index]) {
  // create reference variable to point to the same place in hash table
    let hashRef = this.storage[index];
    hashRef[key] = value;
  }

  // create variable number of items stored in storage and return this number
  let numOfItems = 0;
  // iterarte over storage array, and increase count for each element that is found
  this.storage.forEach((el) => {
    numOfItems++;
  });
  console.log(numOfItems);
  // return this numOfItems found
  return numOfItems;
};

// TESTING PART I: SET //

let newTable = new HashTable();
console.log(newTable);
newTable.set("key", "value");
console.log(newTable);
newTable.set("key2", "value2");
console.log(newTable);
newTable.set("key3", true);
console.log(newTable);
newTable.set("key4", 4);
console.log(newTable);




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
  let getIndex = hashCode(key, this.SIZE);
  // check to see if this.storage[index] exists
  if(this.storage[getIndex]) {
    let ref = this.storage[getIndex];
    // return the value stored at the key that you are looking for
    return ref[key];
  } else {
    return undefined;
  }
    // if it does, then assign it to a new reference variable
    // return the value stored at this reference variable aka ref[key].. key is what is originally passed in
  // if the index does not exist, return undefined
};


// TESTING PART II: GET //

let table = new HashTable();
console.log(table);
table.set('key', 'value');
table.set('key2', 3);
table.set('key3', true);
console.log(table);
console.log(table.get('key'));
console.log(table.get('key3'));
console.log(table.get('key2'));





/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */

 // input: key
 // output: value that is deleted from the

HashTable.prototype.remove = function(key) {
  // use hashCode to create a location that we would look for the key
  let newHashCode = hashCode(key, this.SIZE);
  console.log(newHashCode);
  // check to see if this index exists in storage
  if (this.storage[newHashCode]) {
    // if it does get the value, and store it at a variable
    let valueRef = this.storage[newHashCode];
    const returnedVal = valueRef[key];
    // reassign the key in storage to undefined
    this.set(key, undefined);
    return returnedVal;

  } else {
    // if it does not, return undefined
    return undefined;
  }

};

let tableRemove = new HashTable();
console.log(tableRemove);
tableRemove.set('key', 'value');
tableRemove.set('key1', 1);
tableRemove.set('key2', true);
console.log(tableRemove.remove('key2')); // expected returned value: true,
console.log(tableRemove);




// Do not modify
function hashCode(string, size) {
  "use strict";

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
