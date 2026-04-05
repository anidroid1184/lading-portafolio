export interface TerminalSection {
  id: string;
  label: string;
  icon: string;
  content: () => string; // Function to return HTML content
}
