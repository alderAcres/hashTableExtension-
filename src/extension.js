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
    // create to keep track of items you're adding every time the set function is ran
    this.stored = 0;
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
    // create the hashIndex in order to put the key & value inside
    let hashIndex = hashCode(key, this.SIZE);

    // if there is no value at this storage[hashIndex] then create an object container
    // this object container is meant to avoid ht collisions by having unique keys & value pairs,
    // even if the hashIndex is the same for those key value pairs
    if (!this.storage[hashIndex]) {
        this.storage[hashIndex] = {};
    }

    // EXTENSION NOT COMPLETED
    // if the stored items counter is equal or greater than the occupancy (using .length method * 0.75) then...
    // I'm not sure how to rehash everything 
    if (this.stored >= this.storage.length * 0.75) {
        // double the this.Size
        this.storage = this.storage.concat(new Array(this.SIZE));
        this.SIZE *= 2;
    }

    // EXTENSION NOT COMPLETED BUT TRYING TO PSEUDO CODE IT OUT
    for (let i = 0; i < this.SIZE)

    // create space inside that ht objet 
        this.storage[hashIndex][key] = value;
    // keep tracking of items you're putting in
    this.stored++;
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
    // create hashIndex link to refer to the key
    let hashIndex = hashCode(key, this.SIZE);

    // return the value the hashIndex points to
    return this.storage[hashIndex][key];
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
    // create hashIndex 
    let hashIndex = hashCode(key, this.SIZE);

    // save the removed value so that you can return it later
    let removed = this.storage[hashIndex][key];

    // if key exists as the hashIndex, then delete the key pair
    if (this.storage[hashIndex][key]) {
        delete this.storage[hashIndex][key]
    }

    // keeping track of items you're inputting in
    this.stored--;
    // return what you removed
    return removed;
};


// YOUR CODE ABOVE

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



let ht = new HashTable();
console.log(ht.SIZE);
console.log(ht.set("rick", "james"));
console.log(ht.set("john", "wick"));
console.log(ht.set("jack", "bauer"));

// TESTING EXTENSIONS
console.log(ht.set("a", "aa"));
console.log(ht.set("b", "bb"));
console.log(ht.set("c", "cc"));
console.log(ht.set("d", "dd"));
console.log(ht.set("e", "ee"));
console.log(ht.set("f", "ff"));
console.log(ht.set("g", "gg"));
console.log(ht.set("h", "hh"));
console.log(ht.set("i", "ii"));
console.log(ht.set("j", "jj"));
console.log(ht.set("k", "kk"));
console.log(ht.set("l", "ll"));

// console.log(ht.get("rick")); // james
// console.log(ht.get("john")); // wick
// console.log(ht.get("jack")); // bauer
// console.log(ht.remove("jack")); // bauer
// console.log(ht.remove("john")); // wick
// console.log(ht.remove("rick")); // james
console.log(ht); // should be empty with objects inside various indexes of ht array
console.log(ht.SIZE)
console.log(ht.storage.length); // should be empty with objects inside various indexes of ht array