// Escapes HTML special characters to prevent XSS attacks
export function escapeHtml(text) {
  if (text == null) return ''; // Handle null/undefined
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}// Escapes HTML special characters to prevent XSS attacks
export function escapeHtml(text) {
  if (text == null) return ''; // Handle null/undefined
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}