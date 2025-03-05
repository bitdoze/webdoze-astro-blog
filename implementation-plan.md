# Modern Astro Blog Implementation Plan

## Project Overview

We'll create a modern blog using Astro with the following features:
- Dark mode toggle
- Astro-icon integration
- Modular component architecture
- Responsive design
- SEO optimization

## Current Project Analysis

The project currently has:
- Astro v5.4.2 with TailwindCSS v4.0.9 and DaisyUI v5.0.0
- Configuration files in `src/config/` (config.json, menu.json, social.json)
- Content collections for posts, authors, and pages
- A basic layout structure
- MDX support for content
- all links should end with "/"
- daisyui themes setting

## Implementation Plan

### 1. Project Structure Enhancement

```mermaid
graph TD
    A[Project Root] --> B[src]
    B --> C[components]
    C --> D[common]
    C --> E[blog]
    C --> F[layout]
    C --> G[ui]
    B --> H[layouts]
    B --> I[pages]
    I --> J[index.astro]
    I --> K[[slug].astro]
    I --> L[tags/[tag].astro]
    I --> M[authors/[author].astro]
    I --> N[[...page].astro]
    B --> O[content]
    O --> P[posts]
    O --> Q[authors]
    O --> R[pages]
    B --> S[config]
    S --> T[config.json]
    S --> U[menu.json]
    S --> V[social.json]
    B --> W[utils]
    W --> X[helpers.js]
    W --> Y[seo.js]
```

### 2. Core Components Development

#### 2.1 Layout Components
- **BaseLayout**: Base layout with HTML structure, meta tags, and global styles
- **DefaultLayout**: Extends BaseLayout, adds header and footer
- **PostLayout**: Extends DefaultLayout, adds post-specific elements
- **AuthorLayout**: Extends DefaultLayout, adds author-specific elements
- **TagLayout**: Extends DefaultLayout, adds tag-specific elements

#### 2.2 Header & Footer Components
- **Header**: Logo, navigation menu, dark mode toggle, search
- **Footer**: Site sections, social media links, newsletter signup
- **DarkModeToggle**: Toggle button for switching between light and dark modes

#### 2.3 Blog Components
- **PostCard**: Card component for displaying post previews
- **FeaturedPost**: Larger card for featured posts
- **PostGrid**: Grid layout for displaying multiple posts
- **Pagination**: Component for paginating through posts using [..slug]
- **TagList**: Component for displaying and filtering by tags
- **AuthorBio**: Component for displaying author information
- **RelatedPosts**: Component for showing related posts
- **SocialShare**: Buttons for sharing posts on social media

#### 2.4 UI Components
- **Button**: Reusable button component
- **SearchBar**: Component for searching posts
- **Newsletter**: Component for newsletter signup
- **Icon**: Wrapper for astro-icon

### 3. Implementation Steps

#### Step 1: Setup and Configuration
1. Update TailwindCSS configuration for dark mode
2. Configure color scheme (blue and white for light mode)
3. Update content collections if needed
4. Setup astro-icon

#### Step 2: Layout Implementation
1. Create base layouts
2. Implement header with navigation and dark mode toggle
3. Implement footer with site sections and social links

#### Step 3: Homepage Implementation
1. Create featured post section
2. Implement post grid with pagination
3. Add latest posts sorting

#### Step 4: Blog Post Implementation
1. Create post layout with all required elements
2. Implement author information section
3. Add tags list and related posts
4. Add social sharing buttons

#### Step 5: Taxonomy Pages Implementation
1. Create tag pages with filtering
2. Implement author pages with bio and posts
3. Add pagination to both

#### Step 6: SEO and Performance Optimization
1. Implement proper meta tags
2. Generate sitemap
3. Add RSS feed
4. Optimize images using Astro's image components

#### Step 7: Testing and Refinement
1. Test all features and layouts
2. Ensure responsive design
3. Optimize performance
4. Fix any issues

### 4. Detailed Component Specifications

#### Dark Mode Toggle
- Use localStorage to persist user preference
- Implement system preference detection
- Add smooth transition between modes
- Use astro-icon for sun/moon icons

#### Homepage Layout
- Featured post section at the top (larger card)
- Responsive grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)
- Sort posts by publication date (newest first)
- Implement pagination with 9 posts per page using [..page] format

#### Blog Post Structure
- Title, publication date, featured image
- Author information with photo and bio
- Tags list with clickable links
- Content area with proper typography
- Related posts section (3 posts with similar tags)
- Social sharing buttons

#### Navigation & Structure
- Header with logo, main navigation, dark mode toggle
- Footer with site sections, social media links
- Optional search functionality
- Optional newsletter signup

#### URL Structure
- Blog posts: /[slug]
- Tags: /tags/[tag-name]
- Authors: /authors/[author-name]
- Pages: /[page-name]
- Pagination: /[...page]

### 5. Technical Implementation Details

#### Dark Mode Implementation
```javascript
// src/utils/darkMode.js
export function initDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
    (localStorage.getItem('darkMode') === null && 
     window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  return isDarkMode;
}

export function toggleDarkMode() {
  const isDarkMode = document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', isDarkMode);
  return isDarkMode;
}
```

#### Pagination Implementation with [...page]
```typescript
// src/utils/pagination.js
export function paginate(items, page = 1, pageSize = 9) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const totalPages = Math.ceil(items.length / pageSize);
  
  return {
    items: items.slice(start, end),
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}
```

#### Related Posts Implementation
```typescript
// src/utils/relatedPosts.js
export function getRelatedPosts(currentPost, allPosts, limit = 3) {
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
  
  // Score posts based on tag similarity
  const scoredPosts = otherPosts.map(post => {
    const commonTags = post.data.tags.filter(tag => 
      currentPost.data.tags.includes(tag)
    );
    
    return {
      post,
      score: commonTags.length
    };
  });
  
  // Sort by score (highest first) and take the top 'limit' posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
```

### 6. File Structure for Key Components

```
src/
├── components/
│   ├── common/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── DarkModeToggle.astro
│   │   └── SearchBar.astro
│   ├── blog/
│   │   ├── PostCard.astro
│   │   ├── FeaturedPost.astro
│   │   ├── PostGrid.astro
│   │   ├── Pagination.astro
│   │   ├── TagList.astro
│   │   ├── AuthorBio.astro
│   │   ├── RelatedPosts.astro
│   │   └── SocialShare.astro
│   └── ui/
│       ├── Button.astro
│       ├── Newsletter.astro
│       └── Icon.astro
├── layouts/
│   ├── BaseLayout.astro
│   ├── DefaultLayout.astro
│   ├── PostLayout.astro
│   ├── AuthorLayout.astro
│   └── TagLayout.astro
├── pages/
│   ├── index.astro
│   ├── [slug].astro
│   ├── [...page].astro
│   ├── tags/
│   │   └── [tag].astro
│   ├── authors/
│   │   └── [author].astro
│   └── rss.xml.js
└── utils/
    ├── darkMode.js
    ├── pagination.js
    ├── relatedPosts.js
    └── seo.js
```

## Implementation Timeline

1. **Day 1**: Project setup and configuration
   - TailwindCSS configuration for dark mode
   - Color scheme setup (blue and white for light mode)
   - Astro-icon setup

2. **Day 2**: Layout and core components
   - Base layouts
   - Header and footer
   - Dark mode toggle

3. **Day 3**: Homepage implementation
   - Featured post section
   - Post grid with pagination
   - Latest posts sorting

4. **Day 4**: Blog post implementation
   - Post layout
   - Author information
   - Tags and related posts
   - Social sharing

5. **Day 5**: Taxonomy pages
   - Tag pages
   - Author pages
   - Pagination

6. **Day 6**: SEO and performance
   - Meta tags
   - Sitemap
   - RSS feed
   - Image optimization

7. **Day 7**: Testing and refinement
   - Responsive design testing
   - Performance optimization
   - Bug fixes

## Key Component Implementation Details

## DaysiUI 5 theme implememtation:
[🎉 daisyUI 5.0 upgrade guide](https://daisyui.com/docs/upgrade/)

# daisyUI themes

How to use daisyUI themes?

daisyUI comes with 35 built-in themes that instantly transform your website’s entire look - a time-saver that lets you focus on building rather than deciding on colors.

You can also create your own custom themes or customize built-in themes.

You can manage themes by adding brackets in front of `@plugin "daisyui"` in your CSS file.

app.css

```
  @import "tailwindcss";
- @plugin "daisyui";
+ @plugin "daisyui" {
+   themes: light --default, dark --prefersdark;
+ }
```

`themes` is a comma-separated list of theme names you want to enable.

You can set `--default` flag for a theme to make it the default theme.

You can also set `--prefersdark` flag for a theme to make it the default theme for dark mode (prefers-color-scheme: dark).

## Enable a built-in theme

By default, `light` and `dark` themes are enabled. Let’s enable `cupcake` theme:

app.css

```
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark, cupcake;
}
```

And set `cupcake` theme for the page:

index.html

```
<html data-theme="cupcake"></html>
```

> I suggest using [theme-change](https://github.com/saadeghi/theme-change), so you can switch themes and save selected theme in local storage.

## List of themes

Try them:

light

A

A

A

A

dark

A

A

A

A

cupcake

A

A

A

A

bumblebee

A

A

A

A

emerald

A

A

A

A

corporate

A

A

A

A

synthwave

A

A

A

A

retro

A

A

A

A

cyberpunk

A

A

A

A

valentine

A

A

A

A

halloween

A

A

A

A

garden

A

A

A

A

forest

A

A

A

A

aqua

A

A

A

A

lofi

A

A

A

A

pastel

A

A

A

A

fantasy

A

A

A

A

wireframe

A

A

A

A

black

A

A

A

A

luxury

A

A

A

A

dracula

A

A

A

A

cmyk

A

A

A

A

autumn

A

A

A

A

business

A

A

A

A

acid

A

A

A

A

lemonade

A

A

A

A

night

A

A

A

A

coffee

A

A

A

A

winter

A

A

A

A

dim

A

A

A

A

nord

A

A

A

A

sunset

A

A

A

A

caramellatte

A

A

A

A

abyss

A

A

A

A

silk

A

A

A

A

## Enable all themes

Enable all 35 built-in themes by setting `themes` to `all`:

app.css

```
@import "tailwindcss";
@plugin "daisyui" {
  themes: all;
}
```

## Disable a theme

To disable `dark` theme for example, remove it from the list. Now only light theme is included:

app.css

```
 @import "tailwindcss";
 @plugin "daisyui" {
-  themes: light --default, dark --prefersdark;
+  themes: light --default;
 }
```

If for some reason you want to disable all themes and remove all daisyUI colors, set `themes` to `false`:

app.css

```
@import "tailwindcss";
@plugin "daisyui" {
  themes: false;
}
```

## How to use a theme only for a section of a page?

Add `data-theme='THEME_NAME'` to any element and everything inside will have your theme.You can nest themes and there is no limit!You can force a section of your HTML to only use a specific theme.

index.html

```
<html data-theme="dark">
  <div data-theme="light">
    This div will always use light theme
    <span data-theme="retro">This span will always use retro theme!</span>
  </div>
</html>
```

## How to add a new custom theme?

To add a new theme, use `@plugin "daisyui/theme" {}` in your CSS file, with the following structure:

app.css

```
@import "tailwindcss";
@plugin "daisyui";
@plugin "daisyui/theme" {
  name: "mytheme";
  default: true; /* set as default */
  prefersdark: false; /* set as default dark mode (prefers-color-scheme:dark) */
  color-scheme: light; /* color of browser-provided UI */

  --color-base-100: oklch(98% 0.02 240);
  --color-base-200: oklch(95% 0.03 240);
  --color-base-300: oklch(92% 0.04 240);
  --color-base-content: oklch(20% 0.05 240);
  --color-primary: oklch(55% 0.3 240);
  --color-primary-content: oklch(98% 0.01 240);
  --color-secondary: oklch(70% 0.25 200);
  --color-secondary-content: oklch(98% 0.01 200);
  --color-accent: oklch(65% 0.25 160);
  --color-accent-content: oklch(98% 0.01 160);
  --color-neutral: oklch(50% 0.05 240);
  --color-neutral-content: oklch(98% 0.01 240);
  --color-info: oklch(70% 0.2 220);
  --color-info-content: oklch(98% 0.01 220);
  --color-success: oklch(65% 0.25 140);
  --color-success-content: oklch(98% 0.01 140);
  --color-warning: oklch(80% 0.25 80);
  --color-warning-content: oklch(20% 0.05 80);
  --color-error: oklch(65% 0.3 30);
  --color-error-content: oklch(98% 0.01 30);

  /* border radius */
  --radius-selector: 1rem;
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;

  /* base sizes */
  --size-selector: 0.25rem;
  --size-field: 0.25rem;

  /* border size */
  --border: 1px;

  /* effects */
  --depth: 1;
  --noise: 0;
}
```

## How to customize an existing theme?

To customize a built-in theme, you can use the same structure as adding a new theme, but with the same name as the built-in theme. For example, to customize the `light` theme:

app.css

```
@import "tailwindcss";
@plugin "daisyui";
@plugin "daisyui/theme" {
  name: "light";
  default: true;
  --color-primary: blue;
  --color-secondary: teal;
}
```

All the other values will be inherited from the original theme.

## How to add custom styles for a specific theme?

You can write custom style for your elements only for a specific theme.In this example, .my-btn class only will have this style on light theme.

app.css

```
[data-theme="light"] {
  .my-btn {
    background-color: #1EA1F1;
    border-color: #1EA1F1;
  }
  .my-btn:hover {
    background-color: #1C96E1;
    border-color: #1C96E1;
  }
}
```

## How to apply Tailwind's 'dark:' selector for specific themes

daisyUI can be configured to use Tailwind's \`dark:\` prefixFor example if you want a padding only for a daisyUI dark theme you can use \`dark:p-10\`In the example below, 'night' is darkmode theme so we add it to \`@variant dark\`

app.css

```
@import "tailwindcss";
@plugin "daisyui" {
  themes: winter --default, night --prefersdark;
}

@custom-variant dark (&:where([data-theme=night], [data-theme=night] *));
```

index.html

```
<div class="p-10 dark:p-20">
  I will have 10 padding on winter theme and 20 padding on night theme
</div>
```

[PrevColors](https://daisyui.com/docs/colors/)

[NextBase style](https://daisyui.com/docs/base/)

Do you have a question? [Ask on GitHub](https://github.com/saadeghi/daisyui/discussions) or [Discord server](https://daisyui.com/discord/)

Do you see a bug? [open an issue on GitHub](https://github.com/saadeghi/daisyui/issues?q=Themes)

Do you like daisyUI? [Post about it!](https://x.com/intent/post?text=daisyUI%20%0D%0AComponents%20for%20Tailwind%20CSS%20%0D%0Ahttps://daisyui.com)

Support daisyUI's development: [Open Collective](https://opencollective.com/daisyui)

[Edit this page on GitHub](https://github.com/saadeghi/daisyui/blob/v5/packages/docs/src/routes/(routes)/docs/themes/+page.md?plain=1)

[Text version for AI prompts](https://raw.githubusercontent.com/saadeghi/daisyui/refs/heads/v5/packages/docs/src/routes/(routes)/docs/themes/+page.md?plain=1)

![daisyUI store](https://img.daisyui.com/images/store/figma.webp)

## Official daisyUI  Figma Library

## Available on daisyUI store

[More details](https://daisyui.com/store/)

[Please upgrade your browser](https://www.wikihow.com/Update-Your-Browser)s

### 2. TailwindCSS
[Home](https://tailwindcss.com/) v4.0

`⌘K`  `Ctrl K` [Docs](https://tailwindcss.com/docs) [Blog](https://tailwindcss.com/blog) [Showcase](https://tailwindcss.com/showcase) [Plus](https://tailwindcss.com/plus?ref=top) [GitHub repository](https://github.com/tailwindlabs/tailwindcss)

January 22, 2025

# Tailwind CSS v4.0

![](https://tailwindcss.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadamwathan.8adb7a70.jpg&w=96&q=75)

Adam Wathan

[@adamwathan](https://twitter.com/adamwathan)

![Tailwind CSS v4.0](https://tailwindcss.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcard.22502194.jpg&w=3840&q=75)

Holy shit it's actually done — we just tagged Tailwind CSS v4.0.

Tailwind CSS v4.0 is an all-new version of the framework optimized for performance and flexibility, with a reimagined configuration and customization experience, and taking full advantage of the latest advancements the web platform has to offer.

- [New high-performance engine](https://tailwindcss.com/blog/tailwindcss-v4#new-high-performance-engine) — where full builds are up to 5x faster, and incremental builds are over 100x faster — and measured in microseconds.
- [Designed for the modern web](https://tailwindcss.com/blog/tailwindcss-v4#designed-for-the-modern-web) — built on cutting-edge CSS features like cascade layers, registered custom properties with `@property`, and `color-mix()`.
- [Simplified installation](https://tailwindcss.com/blog/tailwindcss-v4#simplified-installation) — fewer dependencies, zero configuration, and just a single line of code in your CSS file.
- [First-party Vite plugin](https://tailwindcss.com/blog/tailwindcss-v4#first-party-vite-plugin) — tight integration for maximum performance and minimum configuration.
- [Automatic content detection](https://tailwindcss.com/blog/tailwindcss-v4#automatic-content-detection) — all of your template files are discovered automatically, with no configuration required.
- [Built-in import support](https://tailwindcss.com/blog/tailwindcss-v4#built-in-import-support) — no additional tooling necessary to bundle multiple CSS files.
- [CSS-first configuration](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration) — a reimagined developer experience where you customize and extend the framework directly in CSS instead of a JavaScript configuration file.
- [CSS theme variables](https://tailwindcss.com/blog/tailwindcss-v4#css-theme-variables) — all of your design tokens exposed as native CSS variables so you can access them anywhere.
- [Dynamic utility values and variants](https://tailwindcss.com/blog/tailwindcss-v4#dynamic-utility-values-and-variants) — stop guessing what values exist in your spacing scale, or extending your configuration for things like basic data attributes.
- [Modernized P3 color palette](https://tailwindcss.com/blog/tailwindcss-v4#modernized-p3-color-palette) — a redesigned, more vivid color palette that takes full advantage of modern display technology.
- [Container queries](https://tailwindcss.com/blog/tailwindcss-v4#container-queries) — first-class APIs for styling elements based on their container size, no plugins required.
- [New 3D transform utilities](https://tailwindcss.com/blog/tailwindcss-v4#new-3d-transform-utilities) — transform elements in 3D space directly in your HTML.
- [Expanded gradient APIs](https://tailwindcss.com/blog/tailwindcss-v4#expanded-gradient-apis) — radial and conic gradients, interpolation modes, and more.
- [@starting-style support](https://tailwindcss.com/blog/tailwindcss-v4#starting-style-support) — a new variant you can use to create enter and exit transitions, without the need for JavaScript.
- [not-\* variant](https://tailwindcss.com/blog/tailwindcss-v4#not-variant) — style an element only when it doesn't match another variant, custom selector, or media or feature query.
- [Even more new utilities and variants](https://tailwindcss.com/blog/tailwindcss-v4#even-more-new-utilities-and-variants) — including support for `color-scheme`, `field-sizing`, complex shadows, `inert`, and more.

Start using Tailwind CSS v4.0 today by [installing it in a new project](https://tailwindcss.com/docs/installation), or playing with it directly in the browser on [Tailwind Play](https://play.tailwindcss.com/).

For existing projects, we've published a comprehensive [upgrade guide](https://tailwindcss.com/docs/upgrade-guide) and built an [automated upgrade tool](https://tailwindcss.com/docs/upgrade-guide#using-the-upgrade-tool) to get you on the latest version as quickly and painlessly as possible.

* * *

## [New high-performance engine](https://tailwindcss.com/blog/tailwindcss-v4\#new-high-performance-engine)

Tailwind CSS v4.0 is a ground-up rewrite of the framework, taking everything we've learned about the architecture over the years and optimizing it to be as fast as possible.

When benchmarking it on our own projects, we've found full rebuilds to be over 3.5x faster, and incremental builds to be over 8x faster.

Here are the median build times we saw when we benchmarked Tailwind CSS v4.0 against [Catalyst](https://tailwindui.com/templates/catalyst):

|  | v3.4 | v4.0 | Improvement |
| --- | --- | --- | --- |
| Full build | 378ms | 100ms | 3.78x |
| Incremental rebuild with new CSS | 44ms | 5ms | 8.8x |
| Incremental rebuild with no new CSS | 35ms | 192µs | 182x |

The most impressive improvement is on incremental builds that don't actually need to compile any new CSS — these builds are over 100x faster and complete in _microseconds_. And the longer you work on a project, the more of these builds you run into because you're just using classes you've already used before, like `flex`, `col-span-2`, or `font-bold`.

* * *

## [Designed for the modern web](https://tailwindcss.com/blog/tailwindcss-v4\#designed-for-the-modern-web)

The platform has evolved a lot since we released Tailwind CSS v3.0, and v4.0 takes full advantage of many of these improvements.

CSS

```
@layer theme, base, components, utilities;@layer utilities {  .mx-6 {    margin-inline: calc(var(--spacing) * 6);  }  .bg-blue-500\/50 {    background-color: color-mix(in oklab, var(--color-blue-500) 50%, transparent);  }}@property --tw-gradient-from {  syntax: "<color>";  inherits: false;  initial-value: #0000;}
```

We're leveraging modern CSS features like:

- **Native cascade layers** — giving us more control than ever over how different style rules interact with each other.
- **Registered custom properties** — making it possible to do things like animate gradients, and significantly improving performance on large pages.
- **color-mix()** — which lets us adjust the opacity of any color value, including CSS variables and `currentColor`.
- **Logical properties** — simplifying RTL support and reducing the size of your generated CSS.

Many of these features have even simplified Tailwind internally, reducing the surface area for bugs and making the framework easier for us to maintain.

* * *

## [Simplified installation](https://tailwindcss.com/blog/tailwindcss-v4\#simplified-installation)

We've streamlined the setup process a ton in v4.0, reducing the number of steps and removing a lot of boilerplate.

1\. Install Tailwind CSS

```
npm i tailwindcss @tailwindcss/postcss;
```

2\. Add the PostCSS plugin

```
export default {  plugins: ["@tailwindcss/postcss"],};
```

3\. Import Tailwind in your CSS

```
@import "tailwindcss";
```

With the improvements we've made to this process for v4.0, Tailwind feels more light-weight than ever:

- **Just one-line of CSS** — no more `@tailwind` directives, just add `@import "tailwindcss"` and start building.
- **Zero configuration** — you can start using the framework without configuring anything, not even the paths to your template files.
- **No external plugins required** — we bundle `@import` rules for you out of the box, and use [Lightning CSS](https://lightningcss.dev/) under the hood for vendor prefixing and modern syntax transforms.

Sure you only go through this once per project, but it adds up when you're starting and abandoning a different side-project every weekend.

## [First-party Vite plugin](https://tailwindcss.com/blog/tailwindcss-v4\#first-party-vite-plugin)

If you're a Vite user, you can now integrate Tailwind using [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite) instead of PostCSS:

vite.config.ts

```
import { defineConfig } from "vite";import tailwindcss from "@tailwindcss/vite";export default defineConfig({  plugins: [    tailwindcss(),  ],});
```

Tailwind CSS v4.0 is incredibly fast when used as a PostCSS plugin, but you'll get even better performance using the Vite plugin.

## [Automatic content detection](https://tailwindcss.com/blog/tailwindcss-v4\#automatic-content-detection)

You know how you always had to configure that annoying `content` array in Tailwind CSS v3? In v4.0, we came up with a bunch of heuristics for detecting all of that stuff automatically so you don’t have to configure it at all.

For example, we automatically ignore anything in your `.gitignore` file to avoid scanning dependencies or generated files that aren’t under version control:

.gitignore

```
/node_modules/coverage/.next//build
```

We also automatically ignore all binary extensions like images, videos, .zip files, and more.

And if you ever need to explicitly add a source that's excluded by default, you can always add it with the `@source` directive, right in your CSS file:

CSS

```
@import "tailwindcss";@source "../node_modules/@my-company/ui-lib";
```

The `@source` directive uses the same heuristics under the hood, so it will exclude binary file types for example as well, without you having to specify all of the extensions to scan explicitly.

Learn more about in our new documentation on [detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files).

* * *

## [Built-in import support](https://tailwindcss.com/blog/tailwindcss-v4\#built-in-import-support)

Before v4.0, if you wanted to inline other CSS files using `@import` you'd have to configure another plugin like `postcss-import` to handle it for you.

Now we handle this out of the box, so you don't need any other tools:

postcss.config.js

```
export default {  plugins: [    "postcss-import",    "@tailwindcss/postcss",  ],};
```

Our import system is purpose-built for Tailwind CSS, so we've also been able to make it even faster by tightly integrating it with our engine.

* * *

## [CSS-first configuration](https://tailwindcss.com/blog/tailwindcss-v4\#css-first-configuration)

One of the biggest changes in Tailwind CSS v4.0 is the shift from configuring your project in JavaScript to configuring it in CSS.

Instead of a `tailwind.config.js` file, you can configure all of your customizations directly in the CSS file where you import Tailwind, giving you one less file to worry about in your project:

CSS

```
@import "tailwindcss";@theme {  --font-display: "Satoshi", "sans-serif";  --breakpoint-3xl: 1920px;  --color-avocado-100: oklch(0.99 0 0);  --color-avocado-200: oklch(0.98 0.04 113.22);  --color-avocado-300: oklch(0.94 0.11 115.03);  --color-avocado-400: oklch(0.92 0.19 114.08);  --color-avocado-500: oklch(0.84 0.18 117.33);  --color-avocado-600: oklch(0.53 0.12 118.34);  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);  /* ... */}
```

The new CSS-first configuration lets you do just about everything you could do in your `tailwind.config.js` file, including configuring your design tokens, defining custom utilities and variants, and more.

To learn more about how it all works, read the new [theme variables](https://tailwindcss.com/docs/theme) documentation.

* * *

## [CSS theme variables](https://tailwindcss.com/blog/tailwindcss-v4\#css-theme-variables)

Tailwind CSS v4.0 takes all of your design tokens and makes them available as CSS variables by default, so you can reference any value you need at run-time using just CSS.

Using the example `@theme` from earlier, all of these values will be added to your CSS to as regular custom properties:

Generated CSS

```
:root {  --font-display: "Satoshi", "sans-serif";  --breakpoint-3xl: 1920px;  --color-avocado-100: oklch(0.99 0 0);  --color-avocado-200: oklch(0.98 0.04 113.22);  --color-avocado-300: oklch(0.94 0.11 115.03);  --color-avocado-400: oklch(0.92 0.19 114.08);  --color-avocado-500: oklch(0.84 0.18 117.33);  --color-avocado-600: oklch(0.53 0.12 118.34);  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);  /* ... */}
```

This makes it easy to reuse these values as inline styles or pass them to libraries like [Motion](https://motion.dev/docs/react-animation#css-variables) to animate them.

* * *

## [Dynamic utility values and variants](https://tailwindcss.com/blog/tailwindcss-v4\#dynamic-utility-values-and-variants)

We've simplified the way many utilities and variants work in v4.0 by effectively allowing them to accept certain types of arbitrary values, _without_ the need for any configuration or dropping down to the arbitrary value syntax.

For example, in Tailwind CSS v4.0 you can create grids of any size out of the box:

HTML

```
<div class="grid grid-cols-15">  <!-- ... --></div>
```

You can also target custom boolean data attributes without needing to define them:

HTML

```
<div data-current class="opacity-75 data-current:opacity-100">  <!-- ... --></div>
```

Even spacing utilities like `px-*`, `mt-*`, `w-*`, `h-*`, and more are now dynamically derived from a single spacing scale variable and accept any value out of the box:

Generated CSS

```
@layer theme {  :root {    --spacing: 0.25rem;  }}@layer utilities {  .mt-8 {    margin-top: calc(var(--spacing) * 8);  }  .w-17 {    width: calc(var(--spacing) * 17);  }  .pr-29 {    padding-right: calc(var(--spacing) * 29);  }}
```

The upgrade tool we released alongside v4.0 will even simplify most of these utilities for you automatically if it notices you using an arbitrary value that's no longer needed.

* * *

## [Modernized P3 color palette](https://tailwindcss.com/blog/tailwindcss-v4\#modernized-p3-color-palette)

We've upgraded the entire default color palette from `rgb` to `oklch`, taking advantage of the wider gamut to make the colors more vivid in places where we were previously limited by the sRGB color space.

We've tried to keep the balance between all the colors the same as it was in v3, so even though we've refreshed things across the board, it shouldn't feel like a breaking change when upgrading your existing projects.

* * *

## [Container queries](https://tailwindcss.com/blog/tailwindcss-v4\#container-queries)

We've brought container query support into core for v4.0, so you don't need the `@tailwindcss/container-queries` plugin anymore:

HTML

```
<div class="@container">  <div class="grid grid-cols-1 @sm:grid-cols-3 @lg:grid-cols-4">    <!-- ... -->  </div></div>
```

We've also added support for max-width container queries using the new `@max-*` variant:

HTML

```
<div class="@container">  <div class="grid grid-cols-3 @max-md:grid-cols-1">    <!-- ... -->  </div></div>
```

Like our regular breakpoint variants, you can also stack `@min-*` and `@max-*` variants to define container query ranges:

HTML

```
<div class="@container">  <div class="flex @min-md:@max-xl:hidden">    <!-- ... -->  </div></div>
```

Learn more in our all-new [container queries](https://tailwindcss.com/docs/responsive-design#container-queries) documentation.

* * *

## [New 3D transform utilities](https://tailwindcss.com/blog/tailwindcss-v4\#new-3d-transform-utilities)

We've finally added APIs for doing 3D transforms, like `rotate-x-*`, `rotate-y-*`, `scale-z-*`, `translate-z-*`, and tons more.

![](https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80)

Mar 16, 2020

![](https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80)Michael Foster

Boost your conversion rate

```
<div class="perspective-distant">  <article class="rotate-x-51 rotate-z-43 transform-3d ...">    <!-- ... -->  </article></div>
```

Check out the updated [`transform-style`](https://tailwindcss.com/docs/transform-style), [`rotate`](https://tailwindcss.com/docs/rotate), [`perspective`](https://tailwindcss.com/docs/perspective), and [`perspective-origin`](https://tailwindcss.com/docs/perspective-origin) documentation to get started.

* * *

## [Expanded gradient APIs](https://tailwindcss.com/blog/tailwindcss-v4\#expanded-gradient-apis)

We've added a ton of new gradient features in v4.0, so you can pull off even fancier effects without having to write any custom CSS.

### [Linear gradient angles](https://tailwindcss.com/blog/tailwindcss-v4\#linear-gradient-angles)

Linear gradients now support angles as values, so you can use utilities like `bg-linear-45` to create a gradient on a 45 degree angle:

```
<div class="bg-linear-45 from-indigo-500 via-purple-500 to-pink-500"></div>
```

You may notice we've renamed `bg-gradient-*` to `bg-linear-*` too — you'll see why shortly!

### [Gradient interpolation modifiers](https://tailwindcss.com/blog/tailwindcss-v4\#gradient-interpolation-modifiers)

We've added the ability to control the color interpolation mode for gradients using a modifier, so a class like `bg-linear-to-r/srgb` interpolates using sRGB, and `bg-linear-to-r/oklch` interpolates using OKLCH:

```
<div class="bg-linear-to-r/srgb from-indigo-500 to-teal-400">...</div><div class="bg-linear-to-r/oklch from-indigo-500 to-teal-400">...</div>
```

Using polar color spaces like OKLCH or HSL can lead to much more vivid gradients when the `from-*` and `to-*` colors are far apart on the color wheel. We're using OKLAB by default in v4.0 but you can always interpolate using a different color space by adding one of these modifiers.

### [Conic and radial gradients](https://tailwindcss.com/blog/tailwindcss-v4\#conic-and-radial-gradients)

We've added new `bg-conic-*` and `bg-radial-*` utilities for creating conic and radial gradients:

```
<div class="size-24 rounded-full bg-conic/[in_hsl_longer_hue] from-red-600 to-red-600"></div><div class="size-24 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"></div>
```

These new utilities work alongside the existing `from-*`, `via-*`, and `to-*` utilities to let you create conic and radial gradients the same way you create linear gradients, and include modifiers for setting the color interpolation method and arbitrary value support for controlling details like the gradient position.

* * *

## [@starting-style support](https://tailwindcss.com/blog/tailwindcss-v4\#starting-style-support)

The new `starting` variant adds support for the new CSS [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) feature, making it possible to transition element properties when an element is first displayed:

```
<div>  <button popovertarget="my-popover">Check for updates</button>  <div popover id="my-popover" class="transition-discrete starting:open:opacity-0 ...">    <!-- ... -->  </div></div>
```

With `@starting-style`, you can finally animate elements as they appear on the page without the need for any JavaScript at all. [Browser support](https://caniuse.com/mdn-css_at-rules_starting-style) probably isn't quite there yet for most teams, but we're getting close!

* * *

## [not-\* variant](https://tailwindcss.com/blog/tailwindcss-v4\#not-variant)

We've added a new `not-*` variant which finally adds support for the CSS `:not()` pseudo-class:

HTML

```
<div class="not-hover:opacity-75">  <!-- ... --></div>
```

CSS

```
.not-hover\:opacity-75:not(*:hover) {  opacity: 75%;}@media not (hover: hover) {  .not-hover\:opacity-75 {    opacity: 75%;  }}
```

It does double duty and also lets you negate media queries and `@supports` queries:

HTML

```
<div class="not-supports-hanging-punctuation:px-4">  <!-- ... --></div>
```

CSS

```
.not-supports-hanging-punctuation\:px-4 {  @supports not (hanging-punctuation: var(--tw)) {    padding-inline: calc(var(--spacing) * 4);  }}
```

Check out the new [`not-*` documentation](https://tailwindcss.com/docs/hover-focus-and-other-states#not) to learn more.

* * *

## [Even more new utilities and variants](https://tailwindcss.com/blog/tailwindcss-v4\#even-more-new-utilities-and-variants)

We've added a ton of other new utilities and variants to v4.0 too, including:

- **New [`inset-shadow-*`](https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow) and [`inset-ring-*`](https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring) utilities** — making it possible to stack up to four layers of box shadows on a single element.
- **New [`field-sizing`](https://tailwindcss.com/docs/field-sizing) utilities** — for auto-resizing textareas without writing a single line of JavaScript.
- **New [`color-scheme`](https://tailwindcss.com/docs/color-scheme) utilities** — so you can finally get rid of those ugly light scrollbars in dark mode.
- **New [`font-stretch`](https://tailwindcss.com/docs/font-stretch) utilities** — for carefully tweaking variable fonts that support different widths.
- **New [`inert`](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-inert-elements) variant** — for styling non-interactive elements marked with the `inert` attribute.
- **New [`nth-*`](https://tailwindcss.com/docs/hover-focus-and-other-states#first-last-odd-and-even) variants** — for doing really clever things you'll eventually regret.
- **New [`in-*`](https://tailwindcss.com/docs/hover-focus-and-other-states#implicit-groups) variant** — which is a lot like `group-*`, but without the need for the `group` class.
- **Support for [`:popover-open`](https://tailwindcss.com/docs/hover-focus-and-other-states#openclosed-state)** — using the existing `open` variant to also target open popovers.
- **New [descendant variant](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-all-descendants)** — for styling all descendant elements, for better or for worse.

Check out the relevant documentation for all of these features to learn more.

* * *

**And that's it — that's Tailwind CSS v4.0.** It's been years of work to get to this point, but we're all extremely proud of this release and we can't wait to see what you build with it.

Check it out, play with it, maybe even break it, and definitely let us know what you think.

Just no bug reports until tomorrow please — let us at least enjoy one celebratory team dinner and maybe relax in the hot tub at this hotel for a bit believing that somehow we really did ship flawless software.

## Get all of our updates directly to your inbox.  Sign up for our newsletter.

Subscribe

Copyright © 2025 Tailwind Labs Inc.· [Trademark Policy](https://tailwindcss.com/brand)

### 4. PostCard Component

```astro
---
// src/components/blog/PostCard.astro
import { Image } from 'astro:assets';
import { Icon } from 'astro-icon/components';
import { formatDate } from '../../utils/helpers';

const { post } = Astro.props;
const { title, description, date, image, authors, tags } = post.data;
const postUrl = `/${post.slug}`;
---

<article class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
  <a href={postUrl} class="block">
    <div class="relative aspect-video overflow-hidden">
      <Image 
        src={image} 
        alt={title} 
        width={800} 
        height={450} 
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  </a>
  
  <div class="p-5">
    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
      <span class="flex items-center">
        <Icon name="mdi:calendar" class="w-4 h-4 mr-1" />
        {formatDate(date)}
      </span>
      
      {authors && authors.length > 0 && (
        <span class="flex items-center ml-4">
          <Icon name="mdi:account" class="w-4 h-4 mr-1" />
          {authors[0]}
        </span>
      )}
    </div>
    
    <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400">
      <a href={postUrl}>{title}</a>
    </h2>
    
    {description && (
      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
    )}
    
    {tags && tags.length > 0 && (
      <div class="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => (
          <a 
            href={`/tags/${tag}`} 
            class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900"
          >
            #{tag}
          </a>
        ))}
      </div>
    )}
  </div>
</article>
```

### 5. Homepage Implementation

```astro
---
// src/pages/index.astro
import { getCollection } from 'astro:content';
import DefaultLayout from '../layouts/DefaultLayout.astro';
import FeaturedPost from '../components/blog/FeaturedPost.astro';
import PostGrid from '../components/blog/PostGrid.astro';
import { getConfigValue } from '../utils/helpers';

// Get site config
const site = getConfigValue('site');
const settings = getConfigValue('settings');

// Get all published posts
const allPosts = await getCollection('posts', ({ data }) => {
  return !data.draft;
});

// Sort posts by date (newest first)
const sortedPosts = allPosts.sort((a, b) => {
  return new Date(b.data.date) - new Date(a.data.date);
});

// Get featured post (newest post)
const featuredPost = sortedPosts[0];

// Get remaining posts for the grid
const remainingPosts = sortedPosts.slice(1, settings.pagination || 9);
---

<DefaultLayout title={site.title} description={site.description}>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Latest Articles</h1>
    
    {featuredPost && <FeaturedPost post={featuredPost} />}
    
    <div class="mt-12">
      <PostGrid posts={remainingPosts} />
    </div>
    
    {sortedPosts.length > settings.pagination && (
      <div class="text-center mt-8">
        <a 
          href="/page/2" 
          class="inline-block bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
        >
          View More Articles
        </a>
      </div>
    )}
  </div>
</DefaultLayout>
```

## Next Steps

After reviewing this implementation plan, we'll proceed with the following steps:

1. Create the necessary directory structure
2. Implement the core components
3. Build the layouts and pages
4. Add functionality for dark mode, pagination, and other features
5. Test and refine the implementation

Would you like me to make any adjustments to this plan before we proceed with implementation?