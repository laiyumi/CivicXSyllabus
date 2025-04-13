// Formats a string in title case with proper handling of articles, conjunctions, and prepositions

export function formatTitleCase(text: string): string {
  if (!text) return "";

  const lowercaseWords = [
    "a",
    "an",
    "the",
    "and",
    "but",
    "or",
    "nor",
    "at",
    "by",
    "for",
    "from",
    "in",
    "into",
    "of",
    "off",
    "on",
    "onto",
    "to",
    "with",
    "as",
  ];

  return text
    .split(" ")
    .map((word, index) => {
      // Always capitalize the first word regardless of what it is
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      // Keep certain words lowercase
      if (lowercaseWords.includes(word.toLowerCase())) {
        return word.toLowerCase();
      }

      // Capitalize other words
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
