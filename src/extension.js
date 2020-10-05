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
    this.newArr = []
    this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {

    //using hashCode to generate an index
    const index = hashCode[key, this.SIZE]
        //checks if something already exists at that index, if not, it will be set to an empty obj
    if (!this.storage[index]) this.storage[index] = {}
        //then we will store the value passed in inside the obj we just created
    this.storage[index] = value

    // to count the amount of filled spots by pushing each new value into a newArr and using the length property
    this.newArr.push(this.storage[index])
        // checks if the array length/this.SIZE is greater than 75%, if it is then we want to double the size
    if ((this.newArr.length / this.SIZE) > .75) {
        this.SIZE *= 2
    }

};

HashTable.prototype.remove = function(key) {
    //using hashCode to generate an index
    const index = hashCode[key, this.SIZE]
        //storing the value in a variable so we can return it after we delete it
    let removed = this.storage[index][key]
    delete this.storage[index][key]
    return removed
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


let hash = new HashTable
hash.set(1, 10)
hash.set(2, "bob")
hash.set(3, 30)