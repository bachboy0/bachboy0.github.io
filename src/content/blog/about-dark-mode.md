---
title: 'Dark Mode Implementation with Astro 5 + Tailwind CSS 4: Zero Custom CSS Approach'
description: 'A practical guide to modern dark mode using only Tailwind CSS 4 native features - no inline styles, no custom animations, pure utility classes'
pubDate: 'Feb 09 2026'
---

## Introduction

While implementing dark mode functionality on this site, I discovered that **Tailwind CSS 4 provides everything needed without any custom CSS**. This article shares the design philosophy and lessons learned from implementing dark mode using Astro 5 and Tailwind CSS 4's native features exclusively—no inline styles, no custom animations, just pure utility classes.

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

6. **Zero Custom CSS** ⭐
   - Use only Tailwind CSS 4 native features
   - No inline `<style>` blocks
   - No custom animations in global.css
   - Pure utility classes only

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

**That's it.** No `@layer base`, no custom animations, no utility classes. Just the framework configuration.

### Stage 4: Eliminating Custom CSS

Initially, I added custom CSS for animations and transitions. This was a mistake.

**Removed:**
```css
/* ❌ Unnecessary custom CSS */
@keyframes fade-in { ... }
.animate-fade-in { ... }

<style>
  .mobile-menu.open { ... }
</style>
```

**Replaced with Tailwind 4 Native Features:**
```astro
<!-- ✅ Pure Tailwind - no custom CSS needed -->
<div class="animate-pulse">...</div>
<div class="[&.open]:max-h-96 transition-all">...</div>
<button class="[&.open_.line]:rotate-45 transition-transform">...</button>
```

Tailwind CSS 4's arbitrary variants (`[&.state]`) handle all dynamic styling needs.

### Stage 5: Event Listener Duplication Problem

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

### Stage 6: Optimization with Event Delegation

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
Header.astro      → Event management (toggle + mobile menu)
ThemeIcon.astro   → UI component (markup only)
global.css        → Minimal Tailwind configuration (@variant dark only)
```

Each component has a single responsibility, improving maintainability.

### 2. Tailwind CSS 4 Native Features Only

**Strict Rules:**
- ❌ No inline CSS (`<style>` blocks)
- ❌ No custom animations in global.css
- ❌ No custom utility classes
- ✅ Only Tailwind's built-in classes
- ✅ Arbitrary variants for dynamic states (`[&.open]`)
- ✅ Native animations (`animate-pulse`, `animate-bounce`)

**Example - Mobile Menu with Arbitrary Variants:**
```astro
<!-- Self-contained state management with Tailwind -->
<button class="[&.open_.menu-line:nth-child(1)]:rotate-45">
  <span class="menu-line transition-all duration-300"></span>
</button>
```

No CSS needed - all styling is declarative in the markup.

### 3. Performance Optimization

**Before:**
- 120+ lines of code
- Multiple event listeners
- Complex initialization logic
- Custom CSS animations

**After:**
- Less than 50 lines of code
- Single event listener (delegation)
- Simple initialization
- Zero custom CSS (Tailwind only)

### 3. Implementation Best Practices

#### ✅ DO

```javascript
// Simple and efficient event delegation
document.addEventListener('click', (e) => {
  const btn = e.target.closest('#themeToggle');
  if (btn) toggleTheme();
});
```

```css
/* Minimal global.css - only framework configuration */
@variant dark (&:is(.dark *));
```

```astro
<!-- Use Tailwind 4 arbitrary variants for dynamic states -->
<button class="[&.open]:rotate-45 transition-transform">
```

#### ❌ DON'T

```javascript
// Complex and inefficient - multiple listeners
function setup() {
  buttons.forEach(b => b.addEventListener(...)); // Re-registers every time
}
document.addEventListener('astro:page-load', setup);
```

```css
/* Don't add custom CSS when Tailwind can handle it */
.my-custom-animation {
  animation: custom 1s ease;
}
```

```astro
<!-- Don't use inline styles -->
<style>
  .menu-line { /* inline CSS */ }
</style>
```

### 4. Tailwind CSS 4 Advantages

Using only Tailwind's native features provides:

1. **No CSS Maintenance** - All styling in markup
2. **Better Performance** - No custom CSS to parse
3. **Type Safety** - Less room for typos
4. **Easier Refactoring** - See all styles in one place
5. **Smaller Bundle** - No unused custom CSS

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
      
      // Handle theme toggle click
      const themeBtn = target.closest('#themeToggle');
      if (themeBtn) {
        const html = document.documentElement;
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        return;
      }
      
      // Handle menu button click
      const menuBtn = target.closest('#menu-btn');
      if (menuBtn) {
        e.stopPropagation();
        menuBtn.classList.toggle('open');
        document.getElementById('mobile-menu')?.classList.toggle('open');
        return;
      }
      
      // Close mobile menu on outside click
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-btn');
      if (mobileMenu && menuButton && 
          !menuButton.contains(target) && 
          !mobileMenu.contains(target)) {
        menuButton.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
    
    // Close mobile menu on page navigation
    document.addEventListener('astro:page-load', () => {
      document.getElementById('menu-btn')?.classList.remove('open');
      document.getElementById('mobile-menu')?.classList.remove('open');
    });
  })();
</script>
```

**Tailwind 4 Arbitrary Variants for Mobile Menu:**
```astro
<!-- Hamburger button with state-based transforms -->
<button
  id="menu-btn"
  class="[&.open_.menu-line:nth-child(1)]:translate-y-[8px] [&.open_.menu-line:nth-child(1)]:rotate-45 [&.open_.menu-line:nth-child(2)]:opacity-0 [&.open_.menu-line:nth-child(3)]:-translate-y-[8px] [&.open_.menu-line:nth-child(3)]:-rotate-45"
>
  <span class="menu-line"></span>
  <span class="menu-line"></span>
  <span class="menu-line"></span>
</button>

<!-- Mobile menu with state-based visibility -->
<div
  id="mobile-menu"
  class="[&.open]:max-h-96 [&.open]:opacity-100"
>
  <!-- Menu content -->
</div>
```

**No inline CSS needed** - Everything is handled through Tailwind CSS 4's arbitrary variants (`[&.open]`).

### global.css (Tailwind Configuration)

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@variant dark (&:is(.dark *));

@font-face {
  font-family: "Atkinson";
  src: url("/fonts/atkinson-regular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@theme {
  --font-family-sans: "Atkinson", sans-serif;
}
```

**Key Points:**
- Only `@variant dark` is required for dark mode
- No custom CSS or animations needed
- Tailwind CSS 4 handles everything natively

## Lessons Learned

### 1. Documentation First

The `@variant dark` configuration in Tailwind CSS 4 is clearly documented in the official docs. I could have saved time by checking from the start.

### 2. Simple is Best

A simple pattern like event delegation proved most effective over complex solutions.

### 3. Trust the Framework

Tailwind CSS 4's native features are sufficient for most use cases. Custom CSS often adds unnecessary complexity:
- Arbitrary variants (`[&.open]`) eliminate need for custom classes
- Built-in transitions handle animations
- Native utilities cover edge cases

### 4. Performance from Design

Reducing the number of event listeners should be considered from the beginning. Optimizing later is difficult.

### 5. Don't Forget View Transitions

Supporting Astro's `astro:page-load` event is essential. Designs must account for page transitions to achieve SPA-like behavior.

### 6. Less Code is More

Removing all custom CSS actually **improved** maintainability and performance. When in doubt, delete code rather than add it.

## Summary

While dark mode implementation seems simple, it requires proper handling of:

- ✅ FOUC prevention (blocking script in `<head>`)
- ✅ Framework-specific configuration (`@variant dark` in Tailwind CSS 4)
- ✅ Event management optimization (delegation pattern)
- ✅ State persistence (localStorage)
- ✅ View Transitions support (`astro:page-load`)
- ✅ Zero custom CSS (Tailwind 4 native features only)
- ✅ Arbitrary variants for dynamic states (`[&.open]`)

**Final Result:**
- Less than 50 lines of code
- Fast and maintainable
- No inline CSS or custom animations
- Pure Tailwind CSS 4 + minimal JavaScript

The key insight: **Modern frameworks like Tailwind CSS 4 provide everything you need**. Custom CSS is rarely necessary when you leverage native features like arbitrary variants, built-in animations, and utility classes.

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
