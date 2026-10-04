let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  return notes.filter((note) =>
    note.text.toLowerCase().includes(word.toLowerCase())
  );
}

function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }

  return longest;
}

function countByCategory() {
  let counts = {};

  for (let note of notes) {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }

  return counts;
}

function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const noteWord = total === 1 ? "note" : "notes";

  return `${total} ${noteWord}: ${counts.personal || 0} personal, ${
    counts.work || 0
  } work, ${counts.study || 0} study.`;
}

function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();

  return notes.some(
    (note) => note.text.trim().toLowerCase() === normalizedText
  );
}

function addNote(text, category) {
  const trimmedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Reason: note must be 1-200 characters.");
    return false;
  }

  if (isDuplicate(trimmedText)) {
    console.log("Reason: note is a duplicate.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("Reason: invalid category.");
    return false;
  }

  notes.push({
    id: notes.length + 1,
    text: trimmedText,
    category: category,
  });

  console.log("Note added successfully.");
  return true;
}


/* searchNotes tests */

console.log(searchNotes("javascript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("pizza"));
// Expected: []


/* longestNote tests */

console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

let originalNotes = notes;
notes = [];

console.log(longestNote());
// Expected: null

notes = originalNotes;


/* countByCategory tests */

console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

notes = [
  { id: 6, text: "One note", category: "personal" }
];

console.log(countByCategory());
// Expected: { personal: 1 }

notes = originalNotes;


/* getSummary tests */

console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

notes = [
  { id: 7, text: "One study note", category: "study" }
];

console.log(getSummary());
// Expected: "1 note: 0 personal, 0 work, 1 study."

notes = originalNotes;


/* isDuplicate tests */

console.log(isDuplicate("  Buy Milk and Bread  "));
// Expected: true

console.log(isDuplicate("Buy eggs"));
// Expected: false


/* addNote tests */

console.log(addNote("Read about JavaScript objects", "study"));
// Expected: true

console.log(addNote("  buy milk and bread  ", "personal"));
// Expected: false

console.log(addNote("", "work"));
// Expected: false

console.log(addNote("A new work task", "work"));
// Expected: true
