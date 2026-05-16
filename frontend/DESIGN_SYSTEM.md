# ProjectMaker Platform - Modern Design System Implementation Guide

## 🎨 Overview

This guide explains the new premium design system, layout components, and navigation patterns that have been implemented to make the entire platform feel like one seamless, professional product.

---

## 📐 Design System Tokens

### Spacing System
All spacing follows a consistent 4px base unit:

```css
--spacing-1: 0.25rem  (4px)
--spacing-2: 0.5rem   (8px)
--spacing-4: 1rem     (16px)
--spacing-6: 1.5rem   (24px)
--spacing-8: 2rem     (32px)
```

**Usage:**
```jsx
// Use CSS variables instead of hardcoded values
<div className="p-6">Content with 24px padding</div>
```

### Container Sizing
Responsive containers with automatic max-widths:

```css
--container-width-sm: 640px   // Mobile
--container-width-md: 768px   // Tablet
--container-width-lg: 1024px  // Desktop
--container-width-xl: 1280px  // Large Desktop
```

---

## 🎯 Core Layout Components

### 1. Container Component
Provides consistent max-width and responsive padding:

```jsx
import Container from '../components/layout/Container';

<Container size="lg">
  <h1>Your content here</h1>
</Container>
```

**Sizes:** `sm`, `md`, `lg`, `xl`, `full`

### 2. Section Component
Manages spacing, headers, and visual hierarchy:

```jsx
import Section from '../components/layout/Section';

<Section 
  title="Projects"
  subtitle="Manage your saved projects"
  spacing="normal"
>
  {children}
</Section>
```

**Spacing Options:** `tight`, `normal`, `loose`

### 3. Breadcrumb Navigation
Auto-generated breadcrumbs that work with React Router:

```jsx
import Breadcrumb from '../components/common/Breadcrumb';

// Add to page header - automatically generates breadcrumbs from URL
<Breadcrumb />
```

---

## 🧭 Page Transitions

### Automatic Page Transitions
The `PageTransition` wrapper in App.jsx provides smooth transitions between routes:

```jsx
// Already wrapped in App.jsx
<PageTransition>
  <Routes>
    {/* Your routes */}
  </Routes>
</PageTransition>
```

**Result:** Every route change includes a smooth fade + translate animation.

### Custom Page Animations
Add animations to page elements:

```jsx
<div className="animate-fade-in-up">Content</div>
<div className="animate-slide-in-left delay-200">Staggered content</div>
```

**Animation Classes:**
- `animate-fade-in`
- `animate-fade-in-up`
- `animate-fade-in-left`
- `animate-fade-in-right`
- `animate-slide-in-left`
- `animate-scale-in`
- `animate-blur-in`

**Delay Classes:**
- `delay-100`, `delay-200`, `delay-300`, ... `delay-1000`

---

## 🗂️ Layout Components

### DashboardLayout
Modern sidebar with responsive navigation:

```jsx
import DashboardLayout from '../layouts/DashboardLayout';

<DashboardLayout>
  <YourContent />
</DashboardLayout>
```

**Features:**
- Collapsible sidebar on desktop
- Mobile drawer
- Auto-highlighted active nav items
- Smooth animations

### EditorLayout
Split-view layout for project editor:

```jsx
import EditorLayout from '../layouts/EditorLayout';

<EditorLayout
  sidebar={<ProjectSettings />}
  preview={<ProjectPreview />}
/>
```

**Features:**
- Responsive sidebar
- Full-width preview
- Mobile toggle controls
- Smooth transitions

### MainLayout
Standard layout with navbar and footer:

```jsx
import MainLayout from '../layouts/MainLayout';

<MainLayout>
  <YourContent />
</MainLayout>
```

---

## 🧭 Smart Navigation Features

### Navigation Context
Tracks navigation state and recent pages:

```jsx
import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

function MyComponent() {
  const { currentPage, previousPage, recentPages } = useContext(NavigationContext);
  
  return (
    <div>
      Current: {currentPage}
      Previous: {previousPage}
    </div>
  );
}
```

### Quick Actions Component
Context-aware actions based on current page:

```jsx
import QuickActions from '../components/navigation/QuickActions';

// Automatically shows relevant actions
<QuickActions />
```

**Example:** If on project-analyzer page, shows "Generate Full Project" action

### Recently Viewed Component
Shows recently accessed projects:

```jsx
import RecentlyViewed from '../components/navigation/RecentlyViewed';

<RecentlyViewed />
```

### Continue Working Component
Shows the project currently being worked on:

```jsx
import ContinueWorking from '../components/navigation/ContinueWorking';

<ContinueWorking />
```

---

## 🎨 Premium Component Styles

### Cards
```jsx
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Title</h3>
    <p className="card-subtitle">Subtitle</p>
  </div>
  <div className="card-content">Content</div>
  <div className="card-footer">Footer</div>
</div>
```

**Card Variants:**
```jsx
<div className="card card-sm">Small card</div>
<div className="card card-lg">Large card</div>
```

### Buttons
```jsx
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-outlined">Outlined</button>
<button className="btn btn-ghost">Ghost</button>

// Sizes
<button className="btn btn-sm">Small</button>
<button className="btn btn-lg">Large</button>
<button className="btn btn-block">Full Width</button>
```

### Forms
```jsx
<div className="form-group">
  <label className="form-label">Email</label>
  <input className="form-input" type="email" placeholder="you@example.com" />
  <span className="form-help">We'll never share your email</span>
</div>

<textarea className="form-textarea"></textarea>
```

### Badges
```jsx
<span className="badge">Default</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-error">Error</span>
```

### Alerts
```jsx
<div className="alert alert-info">Info message</div>
<div className="alert alert-success">Success message</div>
<div className="alert alert-warning">Warning message</div>
<div className="alert alert-error">Error message</div>
```

---

## 🔲 Grid System

### 12-Column Responsive Grid
```jsx
<div className="grid">
  <div className="col-span-6">Half width on desktop</div>
  <div className="col-span-6">Half width on desktop</div>
</div>

// Specific columns
<div className="grid grid-cols-3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

**Grid Classes:**
- `grid` - Auto responsive 12-column grid
- `grid-cols-1` through `grid-cols-12`
- `col-span-1` through `col-span-12`
- `grid-gap-sm`, `grid-gap-lg`

---

## 📱 Responsive Utilities

### Visibility Classes
```jsx
<div className="hidden-mobile">Visible on tablet+</div>
<div className="hidden-tablet">Visible on desktop+</div>
<div className="visible-desktop">Only on desktop</div>
```

### Breakpoints
```css
--breakpoint-xs: 0px
--breakpoint-sm: 480px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
```

---

## 🎬 Animation Classes

### Utility Animation Classes
```jsx
<div className="animate-pulse">Pulsing animation</div>
<div className="animate-float">Floating animation</div>
<div className="animate-spin">Spinning animation</div>
<div className="animate-shimmer">Shimmer animation</div>
```

### Transition Classes
```jsx
<div className="transition-fast">Fast transitions</div>
<div className="transition-normal">Normal transitions</div>
<div className="transition-slow">Slow transitions</div>
```

---

## 📚 Common Page Setup Example

```jsx
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import MainLayout from '../layouts/MainLayout';
import Breadcrumb from '../components/common/Breadcrumb';

function MyPage() {
  return (
    <MainLayout>
      <Container size="lg">
        <Breadcrumb />
        
        <Section title="My Content" spacing="normal">
          <div className="grid grid-cols-3 gap-6">
            <div className="card">
              <h3 className="card-title">Card 1</h3>
              <p>Content</p>
            </div>
            <div className="card">
              <h3 className="card-title">Card 2</h3>
              <p>Content</p>
            </div>
            <div className="card">
              <h3 className="card-title">Card 3</h3>
              <p>Content</p>
            </div>
          </div>
        </Section>

        <Section title="Another Section" spacing="loose">
          <div className="stagger-children">
            {items.map(item => (
              <div key={item.id} className="animate-fade-in-up">
                {item.name}
              </div>
            ))}
          </div>
        </Section>
      </Container>
    </MainLayout>
  );
}
```

---

## 🚀 Best Practices

### 1. Use the Design System
✅ Use CSS variables for all values:
```css
color: var(--text-color);
padding: var(--spacing-6);
border-radius: var(--radius-md);
```

❌ Avoid hardcoded values:
```css
color: white;
padding: 24px;
border-radius: 16px;
```

### 2. Consistent Spacing
✅ Use the spacing system consistently:
```jsx
<div className="mb-6">Margin bottom 24px</div>
```

### 3. Responsive Images
```jsx
<img 
  srcSet="mobile.jpg 480px, tablet.jpg 768px, desktop.jpg 1024px"
  alt="Responsive image"
/>
```

### 4. Semantic HTML
```jsx
// Good
<main className="main-content">
  <article>Content</article>
</main>

// Also good
<div className="main-content">
  <section>Content</section>
</div>
```

### 5. Animation Performance
Use `transform` and `opacity` for animations (GPU-accelerated):

```jsx
// Good - GPU accelerated
.animate-slide {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
}

// Avoid - CPU intensive
.animate-position {
  animation: moveRight 0.3s ease-out;
}

@keyframes moveRight {
  from {
    left: -20px;
  }
}
```

---

## 🔧 Customization

### Modifying Design Tokens
Update `src/styles/designSystem.css`:

```css
:root {
  --spacing-8: 2rem;      /* Change spacing */
  --radius-md: 16px;       /* Change border radius */
  --primary-color: #00d9ff; /* Change primary color */
}
```

### Adding New Colors
```css
:root {
  --brand-purple: #7c3aed;
  --brand-gradient: linear-gradient(135deg, var(--brand-purple), var(--primary-color));
}
```

### Custom Animations
Add to `src/styles/animations.css`:

```css
@keyframes myAnimation {
  from { /* start state */ }
  to { /* end state */ }
}

.animate-my {
  animation: myAnimation 0.3s ease-out;
}
```

---

## 🐛 Troubleshooting

### Animations Not Working
✅ Make sure animation imports are in `index.css`
✅ Use GPU-accelerated properties (transform, opacity)
✅ Check z-index if animations are hidden

### Layout Breaking on Mobile
✅ Use `Container` component for responsive padding
✅ Use responsive classes (`hidden-mobile`, `visible-desktop`)
✅ Test at multiple breakpoints

### Scrollbar Issues
✅ Customize scrollbar in CSS for better appearance
✅ Use webkit prefixes for browser compatibility

---

## 📖 File Reference

### Core Files
- `src/styles/designSystem.css` - Design tokens and grid system
- `src/styles/animations.css` - Animation definitions
- `src/App.css` - Global component styles
- `src/index.css` - Import all stylesheets

### Layout Components
- `src/layouts/MainLayout.jsx` - Main page layout
- `src/layouts/DashboardLayout.jsx` - Dashboard layout
- `src/layouts/EditorLayout.jsx` - Editor split view

### Reusable Components
- `src/components/layout/Container.jsx` - Responsive container
- `src/components/layout/Section.jsx` - Section with header
- `src/components/common/Breadcrumb.jsx` - Navigation breadcrumb
- `src/components/common/PageTransition.jsx` - Page transitions
- `src/components/navigation/QuickActions.jsx` - Context actions
- `src/components/navigation/RecentlyViewed.jsx` - Recent projects
- `src/components/navigation/ContinueWorking.jsx` - Current project

### Context
- `src/context/NavigationContext.jsx` - Navigation state management

---

## 🎓 Further Learning

1. Review existing page implementations
2. Check component usage in `src/pages/`
3. Examine CSS for patterns and conventions
4. Test responsive behavior at all breakpoints
5. Use browser DevTools to inspect components

---

**Version:** 1.0  
**Last Updated:** May 16, 2026  
**Maintained By:** Development Team
