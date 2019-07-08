/* eslint-disable func-names */
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

HashTable.prototype.set = function (key, value) {
  const threeFourthCheck = this.SIZE * 0.75;
  let tracker = 0;
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i]) tracker++;
  }
  console.log(tracker);
  if (tracker > threeFourthCheck) {
    const oldHashTable = this.storage;
    this.SIZE = this.SIZE * 2;
    const newHashTable = new Array(this.SIZE);
    for (let i = 0; i < oldHashTable.length; i++) {
      if (i !== undefined) {
        const hashedKey = hashCode(i);
        newHashTable[hashedKey] = i;
      }
    }
  }
  const hashedKey = hashCode(key, this.SIZE);
  this.storage[hashedKey] = [key, value];
};


const newTable = new HashTable();
newTable.set('billy', 1234);
newTable.set('jim', 345);
newTable.set('sarah', 4453);
newTable.set('Bob', 1234);
newTable.set('Phil', 345);
newTable.set('Tessa', 4453);
newTable.set('Kim', 1234);
newTable.set('Jane', 345);
newTable.set('sarah', 4453);
newTable.set('Sally', 1234);
newTable.set('Tom', 345);
newTable.set('patrick', 4453);
newTable.set('jimmy', 4453);
console.log(newTable);

HashTable.prototype.get = function (key) {
  const hashedKey = hashCode(key, this.SIZE);
  return this.storage[hashedKey];
};
console.log(newTable.get('sarah'));

HashTable.prototype.remove = function (key) {
  const hashedKey = hashCode(key, this.SIZE);
  const deletedItem = this.storage[hashedKey];
  delete this.storage[hashedKey];
  return deletedItem;
};

console.log(newTable.remove('sarah'));
console.log(newTable);


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
