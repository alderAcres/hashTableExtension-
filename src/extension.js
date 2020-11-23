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
    this.counter = 0;
    this.storage = new Array(this.SIZE);
}

// HashTable.prototype.trackSize = function() {
//     let counter = 0;

//     //loop through the array
//     for (let e of this.storage) {
//         if (e) counter++;
//     }
//     // if the this.storage
//     return counter;
// }

HashTable.prototype.set = function(key, value) {

    let position = hashCode(key, this.SIZE);
    //use hashcode with input of key to determine position
    // if the storage at position
    if (this.storage[position] === undefined && this.counter <= this.SIZE * .75) {
        //check how many address are occupied 
        this.storage[position] = {};
        this.storage[position][key] = value;
        this.counter++;
        console.log(this.counter);
        if (this.storage[position] === undefined && this.counter > this.SIZE * .75) {
            //increase the size to double
            this.SIZE = this.SIZE * 2;
            //loop through storage
            //at every element key set position 
            //if the new position is empty add an object
            //store the value of the key value pair in this new position
            //delete this key
            for (let e of this.storage) {
                position = hashCode(key, this.SIZE);
                if (this.storage[position] === undefined) {
                    this.storage[position] = {}
                    this.storage[position][key] = value;
                    this.counter++;
                }
            }


        }
    } else this.storage[position][key] = value;


    //if position key 


    //collision -> set a object
};

let hash = new HashTable;
hash.set(69, 420)
hash.set(420, "snoop-dogg")
hash.set("heelloword", "xD")
console.log(hash);


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

    //const position
    const position = hashCode(key, this.SIZE);

    //search the hashtable storage
    // if it exists return value
    if (this.storage[position][key]) return this.storage[position][key];
    //else return undefined 
    else return undefined;
};

// console.log(hash.get(69));
/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {

    // find position of key
    const position = hashCode(key, this.SIZE);
    //temp to store the value of the removed
    let temp = this.get(key);
    //if the position does not exist return undefined 
    if (temp) delete this.storage[position][key];
    if (temp === undefined) return undefined


    //delete the key value pair;
    return temp;
};

// console.log(hash.remove(69));
console.log(hash);

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