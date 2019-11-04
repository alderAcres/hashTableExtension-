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
    this.fullness = 0

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
    const hash = hashCode(key, this.SIZE);
    const oldCache = this.storage;
    if (!this.storage[hash]) {
        this.fullness += 1;
        this.storage[hash] = { key: value }
    } else { this.storage[hash][key] = value };

    if (this.fullness >= this.SIZE * 0.75) {
        this.SIZE = this.SIZE * 2;
        this.fullness = 0;
        this.storage = new Array(this.SIZE);

        oldCache.forEach((elObject) => {
            if (elObject) {
                Object.keys(elObject).forEach((keys) => {
                    if (!this.storage[hashCode(`${keys}`, this.SIZE)]) {
                        this.fullness += 1;
                        let dummyBucket = {};
                        dummyBucket[`${keys}`] = elObject[keys]
                        this.storage[hashCode(`${keys}`, this.SIZE)] = dummyBucket;
                    } else { this.storage[hashCode(`${keys}`, this.SIZE)][`${keys}`] = elObject[keys] };
                })
            }
        })
    }

    //not sure why the rehash isn't properly grabbing all of the keys



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
    const hash = hashCode(key, this.SIZE);
    if (!this.storage[hash][key]) {
        return undefined;
    }
    return this.storage[hash][key];
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
    const hash = hashCode(key, this.SIZE);
    const cache = this.storage[hash][key];
    delete this.storage[hash][key];
    return cache;
};
const myTable = new HashTable();
console.log(myTable)
console.log(myTable.set('first', 1))
console.log(myTable.set('kajhsdfhasiludfh', 2))
console.log(myTable.set('sfsdfa', 3))
console.log(myTable.set('hdshdjdfgjfgdshdfgbds', 4))
console.log(myTable.set('sdfgkjahsdfkjasdn,mnsmdfadfsd', 5))
console.log(myTable.set('sdlghasd,n,xjvsdoahflkshfkjnasdfhasf', 6))
console.log(myTable.set('glkasdhfklasdhlfkansm,fnkasjdhfoiawnefnlawkhfkasdnfkjaslhf', 7))
console.log(myTable.set('sdflkznxlksahfw892y342h34', 8))
console.log(myTable.set('1234567890', 9))
console.log(myTable.set('34567890987ytr', 10))
console.log(myTable.set('t4356475897pulkhgjncbfgdstrw5e6ruytfjhgd', 11))
console.log(myTable.set('utrfjghb,n.kljioyutyrjfdhgjvkgiturytshgfx', 12))
console.log(myTable.set('uitydhgcvjklituryerdhgjckfgiruyetrshfgxjcjlkgiuytdsjhxg', 13))
console.log(myTable.set('uiytershgfxnchjireyutsrhgfxcjvkuieystrhgfxcjkfuiytshgfxcjkgurydhgfhjkfgncmvhjgktydhgfcmvjkgtiuyrtdhg', 14))
console.log(myTable)
console.log(myTable.get(''))

console.log(myTable.remove(''))
console.log(myTable)


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