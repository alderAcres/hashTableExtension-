/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() {
  this.size = 16;
  this.items = 0;
  this.storage = new Array(this.size);
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
  const hashIndex = hashCode(key, this.size);

  // the items are greater than 75% of the total size
  if (this.items / this.size > 0.75) {
    // double the size of the table
    const doubleArr = new Array(this.size * 2);
    this.contents;
    // rehash everything
    // iterage over original array
    for (const key in this.storage) {
      const newHashIndex = hashCode(key, doubleArr.size)
      doubleArr[hashCode] = this.storage[hashCode];
    }
    const newHashIndex = hashCode(key, doubleArr.size)
    if (HashTable[hashIndex] === undefined) {
    this.storage[hashIndex] = {};
    this.storage[hashIndex][key] = value;
    this.items++;
    this.size++;
    return this.size;
  }
  this.storage[hashIndex][key] = value;
  this.items++;
  this.size++;
  return this.size;
    // add items to new array
  }

  if (HashTable[hashIndex] === undefined) {
    this.storage[hashIndex] = {};
    this.storage[hashIndex][key] = value;
    this.items++;
    this.size++;
    return this.size;
  }
  this.storage[hashIndex][key] = value;
  this.items++;
  this.size++;
  return this.size;
};

const testHash = new HashTable();
testHash.set(1, 2);
testHash.set(3, 4);
console.log(testHash.storage);

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
  // create a hash index
  const hashIndex = hashCode(key, this.size);
  // return undefined if there's nothing at the hash table at that index
  if (this.storage[hashIndex] === undefined) return undefined;
  // check if there's multiple
  // if(Object.keys(this.storage[hashIndex]).length > 1){
  //   const firstKey = Object.keys(this.storage[hashIndex])[0]
  //   return this.storage[hashIndex][firstKey];
  // }
  return this.storage[hashIndex][key];
};

// const testHash = new HashTable();
// testHash.set(1, 2);
// testHash.set(3, 4);
// console.log(testHash.size;

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  // //create our hash index
  const hashIndex = hashCode(key, this.size);
  // check if there's a key value pair at hash index in hash table and return undefined if not
  if (this.storage[hashIndex][key] === undefined) return undefined;

  // if(this.get(key) === undefined) return undefined;

  // store the key value pair to remove in a variable
  const removedKeyVal = this.storage[hashIndex];

  // remove the key value pair
  delete this.storage[hashIndex];

  // return the key value pair that was removed
  return removedKeyVal;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
