export default function capitalize(word: string) {
  if (!word) return "⚠️ You Must Pass A Word!";

  return word.charAt(0).toUpperCase() + word.slice(1);
}
