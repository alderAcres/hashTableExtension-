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
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
}

/**
 * set - Adds given value to the hash table with specified key.
 */
HashTable.prototype.set = function (key, value) {
  // calculate 75% of size
  const sizeToPass = 0.75 * this.SIZE;
  // check how many key/value pairs are in current hashTable, if less than size above, add everything normally, if more than size above double the hash table's size and rehash everything

  const hashed = hashCode(key, this.SIZE);
  if (this.storage[hashed] === undefined) {
    this.storage[hashed] = {};
    this.storage[hashed][key] = value;
  }
  this.storage[hashed][key] = value;
};

/**
 * get - Retrieves a value stored in the hash table with a specified key

 */
HashTable.prototype.get = function (key) {
  // first convert key to an integer using our hashCode function
  const hashed = hashCode(key, this.SIZE);
  // return the value at that new hashed key
  return this.storage[hashed][key];
};

/**
 * remove - delete a key/value pair from the hash table

 */
HashTable.prototype.remove = function (key) {
  // convert key to an integer using hashCode function
  const hashed = hashCode(key, this.SIZE);
  // create a copy of value to delete
  const copy = this.storage[hashed][key];
  // delete that specific value
  delete this.storage[hashed][key];
  // return
  return copy;
};

const test = new HashTable();
test.set(654, 'apple');
test.set(333, 'banana');
console.log(test.get(333));
test.remove(654);
console.log(test);

// YOUR CODE ABOVE

function hashCode(string, size) {
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
