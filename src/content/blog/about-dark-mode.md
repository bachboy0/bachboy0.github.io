---
title: 'Dark Mode Implementation with Astro 5 + Tailwind CSS 4: From Design to Optimization'
description: 'A practical guide to modern dark mode implementation with FOUC prevention and optimized event management'
pubDate: 'Feb 09 2026'
---

## Introduction

While implementing dark mode functionality on this site, I faced several important technical challenges. This article shares the design philosophy and lessons learned from implementing dark mode using Astro 5 and Tailwind CSS 4.

## Tech Stack

- **Astro 5.16+**: Static site generator
- **Tailwind CSS 4.1+**: Utility-first CSS framework
- **TypeScript**: Type safety

## Requirements

For the dark mode implementation, I set the following requirements:

1. **Prevent FOUC (Flash of Unstyled Content)**
   - Completely eliminate flickering on page load

2. **State Persistence**
   - Save user's choice to localStorage
   - Auto-detect system preferences

3. **Seamless Switching**
   - Visual transitions
   - Icon changes (sun ⇔ moon)

4. **Performance**
   - Minimal JavaScript
   - Efficient event listener management

5. **Maintainability**
   - Simple and readable code
   - View Transitions support

## Implementation Journey

### Stage 1: Initial Implementation Failure

In the initial implementation, I placed all the logic inside the ThemeIcon component.

**Problems:**
- Insufficient FOUC prevention (executed after component rendering)
- Flash of white background on page load

```javascript
// ❌ Problematic approach
<script is:inline>
  const theme = getInitialTheme();
  // Executes too late since it's inside a component
</script>
```

### Stage 2: FOUC Prevention Implementation

I moved the theme initialization script into the `<head>`.

```javascript
// ✅ Executed in BaseHead.astro
<script is:inline>
  (() => {
    const stored = localStorage.getItem('theme');
    const theme = stored || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    localStorage.setItem('theme', theme);
  })();
</script>
```

**Key Points:**
- `is:inline` directive to avoid bundling
- Executes immediately in `<head>`
- Blocking script (intentional)

### Stage 3: Tailwind CSS 4 Configuration

In Tailwind CSS 4, dark mode defaults to `media` query-based. To make JavaScript class control work, explicit configuration is required.

```css
/* global.css */
@import "tailwindcss";

/* ✅ Enable class-based dark mode */
@variant dark (&:is(.dark *));
```

Without this single line, the `dark:` prefix won't respond to classes.

### Stage 4: Event Listener Duplication Problem

In the initial implementation, event listeners were being duplicated on every page transition.

**Problematic Code:**
```javascript
// ❌ Executed multiple times with View Transitions
function setup() {
  document.querySelectorAll('#themeToggle').forEach(button => {
    button.addEventListener('click', toggleTheme); // Duplicate registration
  });
}

setup();
document.addEventListener('astro:page-load', setup); // Re-executed
```

**Attempted Solutions:**
1. Prevent initialization with global flag → Became complex
2. Remove old listeners by node cloning → Verbose
3. Manage with named functions → Still complex

### Stage 5: Optimization with Event Delegation

I finally adopted the event delegation pattern.

```javascript
// ✅ Simple and efficient
document.addEventListener('click', (e) => {
  const target = e.target;
  
  // Theme button click
  const themeBtn = target.closest('#themeToggle');
  if (themeBtn) {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    return;
  }
  
  // Other click handling...
});
```

**Benefits:**
- Only one event listener
- Works with dynamically added elements
- No duplicate registration concerns
- Performance improvement

## Final Design Philosophy

### 1. Separation of Concerns

```
BaseHead.astro    → Theme initialization (FOUC prevention)
Header.astro      → Event management (toggle functionality)
ThemeIcon.astro   → UI component (markup only)
global.css        → Tailwind configuration
```

Each component has a single responsibility, improving maintainability.

### 2. Performance Optimization

**Before:**
- 120+ lines of code
- Multiple event listeners
- Complex initialization logic

**After:**
- Less than 50 lines of code
- Single event listener (delegation)
- Simple initialization

### 3. Implementation Best Practices

#### ✅ DO

```javascript
// Simple and efficient
document.addEventListener('click', (e) => {
  const btn = e.target.closest('#themeToggle');
  if (btn) toggleTheme();
});
```

```css
/* Explicit configuration */
@variant dark (&:is(.dark *));
```

#### ❌ DON'T

```javascript
// Complex and inefficient
function setup() {
  // Re-registers every time
  buttons.forEach(b => b.addEventListener(...));
}
document.addEventListener('astro:page-load', setup);
```

## Complete Code Overview

### BaseHead.astro (FOUC Prevention)

```astro
<script is:inline>
  (() => {
    const stored = localStorage.getItem('theme');
    const theme = stored || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    localStorage.setItem('theme', theme);
  })();
</script>
```

### Header.astro (Event Management)

```astro
<script is:inline>
  (() => {
    document.addEventListener('click', (e) => {
      const target = e.target;
      
      const themeBtn = target.closest('#themeToggle');
      if (themeBtn) {
        const html = document.documentElement;
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        return;
      }
      
      // Mobile menu also handled similarly...
    });
    
    document.addEventListener('astro:page-load', () => {
      // Cleanup on page transition
    });
  })();
</script>
```

### global.css (Tailwind Configuration)

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@variant dark (&:is(.dark *));

@layer base {
  html {
    color-scheme: light;
  }
  
  html.dark {
    color-scheme: dark;
  }
}
```

## Lessons Learned

### 1. Documentation First

The `@variant dark` configuration in Tailwind CSS 4 is clearly documented in the official docs. I could have saved time by checking from the start.

### 2. Simple is Best

A simple pattern like event delegation proved most effective over complex solutions.

### 3. Performance from Design

Reducing the number of event listeners should be considered from the beginning. Optimizing later is difficult.

### 4. Don't Forget View Transitions

Supporting Astro's `astro:page-load` event is essential. Designs must account for page transitions to achieve SPA-like behavior.

## Summary

While dark mode implementation seems simple, it requires proper handling of:

- ✅ FOUC prevention (blocking script)
- ✅ Framework-specific configuration (Tailwind CSS 4)
- ✅ Event management optimization (delegation pattern)
- ✅ State persistence (localStorage)
- ✅ View Transitions support

Ultimately, I implemented a fast and maintainable dark mode with less than 50 lines of code.

## References

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)
- [MDN: matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
- [Event Delegation Pattern](https://javascript.info/event-delegation)

## Repository

The implementation code is available at:
- [GitHub Repository](https://github.com/bachboy0/bachboy0.github.io)

---

I hope this article helps with your dark mode implementation. Feel free to ask questions or provide feedback on [GitHub Issues](https://github.com/bachboy0/bachboy0.github.io/issues)!
