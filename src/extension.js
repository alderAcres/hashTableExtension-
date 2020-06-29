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

/* I don't have time to actually implement this, so I'll just talk through my thinking briefly
 First thought is that this seems incredibly computationally expensive. Re-sizing requires re-computing
 every single hash value, then rewriting each of those values to a new array. For a large array that may
 set and remove in chunks, the re-sizing would happen frequently. Our original object method seems for the
 most efficient for the way Javascript works. OR! better yet: hash every value with some algo that promises
 extremely low collision rates, and just use the hash as a key directly on an object or Map. All that said:

 Every set method needs to first compute the ratio of this.LENGTH to this.size. If it crosses the threshold,
 we instantiate a new temporary array that we will be reassigning to this.storage. Then iterate over the current
 storage array, and at each index, iterate through the object.keys, rehashing each key and assigning it's value
 into the new array we created. Then update the this.LENGTH property

 Do the reverse for remove, essentially (checking after deleting)

*/

// YOUR CODE ABOVE

function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
