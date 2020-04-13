let hashtable = new HashTable();
hashtable.set(1, "one");
hashtable.set(2, "two");
hashtable.set(3, "three");
console.log(hashtable.set(4, "four"), "(expect '4')");
console.log(hashtable.get(1), "(expect 'one')");
console.log(hashtable.get(2), "(expect 'two')");
console.log(hashtable.get(4), "(expect 'four')");
console.log(hashtable.get("five"), "(expect 'undefined')");
console.log(hashtable.remove(4), "(expect 'four')");
console.log(hashtable.remove(2), "(expect 'two')");
console.log(hashtable.remove(1), "(expect 'one')");
console.log(hashtable.set("five", 5), "(expect '2')")