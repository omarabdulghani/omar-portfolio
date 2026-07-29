# Agent Behavioral Guidelines & Repository Rules

## CSS RTL Flexbox Alignment Rule
- When `dir="rtl"` is active on `<html>` or `<body>`, CSS Flexbox alignment behaves as follows:
  - `align-items: flex-start` (`items-start`) aligns items to the **RIGHT** margin in vertical (`flex-col`) containers.
  - `align-items: flex-end` (`items-end`) aligns items to the **LEFT** margin in vertical (`flex-col`) containers.
  - `justify-content: flex-start` (`justify-start`) aligns items starting from the **RIGHT** margin in horizontal (`flex-row`) containers.
- Always use React boolean conditionals (e.g., `isAr ? "items-start text-right" : "items-start text-left"`) or verify flex direction physics when handling RTL alignment so elements hard-align to the intended margin.
