export const DEFAULT_GOALS = [
  [1, "JavaScript", ["Scope", "Hoisting", "Closures", "Execution Context", "Call Apply Bind", "Event Loop", "Promises"]],
  [1, "DSA", ["Arrays", "Strings", "Hash Maps"]],
  [1, "Project", ["Setup Structure", "Authentication", "Database"]],
  [2, "JavaScript", ["Async Await", "Debouncing", "Throttling", "Prototype", "Memory Management"]],
  [2, "React", ["Hooks", "Routing", "Forms", "API Integration"]],
  [2, "DSA", ["Sliding Window", "Two Pointers", "Binary Search"]],
  [2, "Project", ["Dashboard", "CRUD", "Responsive Design"]],
  [3, "React", ["Context API", "Performance Optimization", "Custom Hooks"]],
  [3, "Interview", ["DBMS", "OS", "CN"]],
  [3, "DSA", ["Linked List", "Stack", "Queue"]],
  [3, "Project", ["Complete Project", "Deploy Project", "Resume Update"]]
].flatMap(([week, category, titles]) => titles.map((title) => ({ week, category, title })));
