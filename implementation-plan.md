# Tailwind v4 Integration Fix Plan

## The Problem

- Using Tailwind v4 with custom utility classes defined in `src/styles/global.css`
- Error message: `Cannot apply unknown utility class: text-primary`
- Custom utilities are defined correctly using the `@utility` directive, but they're not being processed properly

## Root Cause Analysis

After examining the project files:

1. The project is using Tailwind v4.0.9 and @tailwindcss/vite v4.0.9
2. The global.css file is correctly imported in Layout.astro
3. The global.css file has custom utilities defined using the @utility directive
4. The astro.config.mjs file is using the tailwindcss Vite plugin

The issue is likely related to how the Tailwind Vite plugin is configured and how it processes the custom utilities. In Tailwind v4, the configuration is done directly in CSS using directives like `@theme` and `@utility` rather than using a JavaScript configuration file.

According to the Tailwind v4 documentation:
- Configuration is done directly in CSS
- The `@import "tailwindcss"` directive is used to import Tailwind
- Custom utilities are defined using the `@utility` directive
- Theme variables are defined using the `@theme` directive

The current setup in global.css follows these guidelines, but there might be an issue with how the Vite plugin is processing these directives.

## Solution Steps

### 1. Update the Astro Configuration

Update the `astro.config.mjs` file to properly configure the Tailwind v4 Vite plugin:

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss({
        // Ensure custom utilities are processed
        applyBaseStyles: false, // Let us control where Tailwind is imported
      })
    ]
  },
  integrations: [mdx(), icon()]
});
```

### 2. Verify Global CSS Structure

Ensure the `src/styles/global.css` file is properly structured for Tailwind v4:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Define theme variables for both light and dark modes */
@theme {
  /* Light theme variables (default) */
  --color-primary-bg: oklch(100% 0 0);
  --color-secondary-bg: oklch(98% 0 0);
  --color-tertiary-bg: oklch(95% 0 0);
  --color-primary-text: oklch(21% 0.006 285.885);
  --color-secondary-text: oklch(40% 0.006 285.885);
  --color-muted-text: oklch(50% 0.006 285.885);
  --color-accent: oklch(54% 0.245 262.881);
  --color-accent-light: oklch(77% 0.152 181.912);
  --color-border: oklch(90% 0 0);
  --color-success: oklch(76% 0.177 163.223);
  --color-error: oklch(71% 0.194 13.428);
  --color-warning: oklch(82% 0.189 84.429);
  --color-info: oklch(74% 0.16 232.661);

  /* Dark theme variables (override defaults in dark mode) */
  --color-primary-bg-dark: oklch(20% 0 0);
  --color-secondary-bg-dark: oklch(25% 0 0);
  --color-tertiary-bg-dark: oklch(30% 0 0);
  --color-primary-text-dark: oklch(95% 0.006 285.885);
  --color-secondary-text-dark: oklch(85% 0.006 285.885);
  --color-muted-text-dark: oklch(75% 0.006 285.885);
  --color-accent-dark: oklch(65% 0.245 262.881);
  --color-accent-light-dark: oklch(60% 0.152 181.912);
  --color-border-dark: oklch(40% 0 0);
  --color-success-dark: oklch(65% 0.177 163.223);
  --color-error-dark: oklch(65% 0.194 13.428);
  --color-warning-dark: oklch(75% 0.189 84.429);
  --color-info-dark: oklch(65% 0.16 232.661);
}

/* Define custom utilities */
@utility bg-primary {
  background-color: var(--color-primary-bg);
  @variant dark {
    background-color: var(--color-primary-bg-dark);
  }
}

@utility bg-secondary {
  background-color: var(--color-secondary-bg);
  @variant dark {
    background-color: var(--color-secondary-bg-dark);
  }
}

@utility bg-tertiary {
  background-color: var(--color-tertiary-bg);
  @variant dark {
    background-color: var(--color-tertiary-bg-dark);
  }
}

@utility bg-accent {
  background-color: var(--color-accent);
  @variant dark {
    background-color: var(--color-accent-dark);
  }
}

@utility bg-accent-light {
  background-color: var(--color-accent-light);
  @variant dark {
    background-color: var(--color-accent-light-dark);
  }
}

@utility text-primary {
  color: var(--color-primary-text);
  @variant dark {
    color: var(--color-primary-text-dark);
  }
}

@utility text-secondary {
  color: var(--color-secondary-text);
  @variant dark {
    color: var(--color-secondary-text-dark);
  }
}

@utility text-muted {
  color: var(--color-muted-text);
  @variant dark {
    color: var(--color-muted-text-dark);
  }
}

@utility text-accent {
  color: var(--color-accent);
  @variant dark {
    color: var(--color-accent-dark);
  }
}

@utility border-color {
  border-color: var(--color-border);
  @variant dark {
    border-color: var(--color-border-dark);
  }
}

@utility border-accent {
  border-color: var(--color-accent);
  @variant dark {
    border-color: var(--color-accent-dark);
  }
}

@utility text-success {
  color: var(--color-success);
  @variant dark {
    color: var(--color-success-dark);
  }
}

@utility text-error {
  color: var(--color-error);
  @variant dark {
    color: var(--color-error-dark);
  }
}

@utility text-warning {
  color: var(--color-warning);
  @variant dark {
    color: var(--color-warning-dark);
  }
}

@utility text-info {
  color: var(--color-info);
  @variant dark {
    color: var(--color-info-dark);
  }
}

@utility bg-success {
  background-color: var(--color-success);
  @variant dark {
    background-color: var(--color-success-dark);
  }
}

@utility bg-error {
  background-color: var(--color-error);
  @variant dark {
    background-color: var(--color-error-dark);
  }
}

@utility bg-warning {
  background-color: var(--color-warning);
  @variant dark {
    background-color: var(--color-warning-dark);
  }
}

@utility bg-info {
  background-color: var(--color-info);
  @variant dark {
    background-color: var(--color-info-dark);
  }
}

@utility border-success {
  border-color: var(--color-success);
  @variant dark {
    border-color: var(--color-success-dark);
  }
}

@utility border-error {
  border-color: var(--color-error);
  @variant dark {
    border-color: var(--color-error-dark);
  }
}

@utility border-warning {
  border-color: var(--color-warning);
  @variant dark {
    border-color: var(--color-warning-dark);
  }
}

@utility border-info {
  border-color: var(--color-info);
  @variant dark {
    border-color: var(--color-info-dark);
  }
}
```

### 3. Update the Astro Configuration

Update the `astro.config.mjs` file to properly configure the Tailwind v4 Vite plugin:

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss({
        // Ensure custom utilities are processed
        applyBaseStyles: false, // Let us control where Tailwind is imported
      })
    ]
  },
  integrations: [mdx(), icon()]
});
```

### 4. Test the Changes

After implementing these changes, restart the development server and check if the `text-primary` utility class is now recognized.