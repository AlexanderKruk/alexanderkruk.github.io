# Elena Kruk - Painter Website

A beautiful, mobile-first website showcasing the work of painter Elena Kruk. Built with pure HTML, CSS, and JavaScript, featuring smooth animations and a watercolor-inspired design.

## 🎨 Features

### Design
- **Mobile-first responsive design** - Optimized for all screen sizes
- **Watercolor-inspired color palette** - Blues and greens from the business card
- **Smooth animations** - CSS transitions and JavaScript-powered scroll effects
- **Modern typography** - Playfair Display for headings, Inter for body text
- **Clean, minimalist layout** - Inspired by contemporary art gallery websites

### Functionality
- **Smooth scrolling navigation** - Seamless page transitions
- **Horizontal gallery scrolling** - Touch-friendly artwork browsing
- **Parallax effects** - Subtle background movement on scroll
- **Intersection Observer animations** - Elements animate as they enter viewport
- **Contact form with validation** - Professional inquiry handling
- **Mobile hamburger menu** - Responsive navigation
- **Image lazy loading** - Performance optimization
- **Notification system** - User feedback for interactions

## 🏗️ Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md          # Documentation
```

## 🎯 Sections

### 1. Hero Section
- Large typography with Elena's name
- Watercolor gradient background
- Animated text entrance
- Scroll indicator

### 2. Featured Works
- Three main artworks with detailed descriptions
- Hover effects with overlay buttons
- Responsive grid layout
- High-quality artwork images

### 3. Gallery
- Horizontal scrolling collection
- Navigation controls
- Touch/swipe support
- Artwork titles and medium information

### 4. About Section
- Artist biography and background
- Professional details (education, style, experience)
- Portrait image
- Two-column responsive layout

### 5. Contact Section
- Contact information from business card
- Working contact form with validation
- Professional inquiry handling
- Social media links

## 🎨 Color Palette

Based on Elena Kruk's business card:

- **Primary Blue**: `#4A90A4` - Main brand color
- **Secondary Blue**: `#6BB6C7` - Accent and hover states
- **Light Blue**: `#A8D5E2` - Backgrounds and gradients
- **Accent Green**: `#7FB069` - Subtle accents
- **Cream**: `#F8F6F0` - Background sections
- **Dark Text**: `#2C3E50` - Primary text color
- **Light Text**: `#5D6D7E` - Secondary text color

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1199px
- **Large Desktop**: ≥ 1200px

## ⚡ Performance Features

- **CSS Custom Properties** - Efficient styling system
- **Intersection Observer** - Optimized scroll animations
- **Debounced scroll events** - Smooth performance
- **Image lazy loading** - Faster initial load
- **Minimal dependencies** - Pure vanilla JavaScript

## 🚀 Getting Started

1. **Clone or download** the files to your web server
2. **Open index.html** in a web browser
3. **Customize content** by editing the HTML
4. **Modify colors** by updating CSS custom properties
5. **Add real images** by replacing Unsplash placeholder URLs

## 🛠️ Customization

### Adding New Artworks

1. **Featured Works**: Add new `<article>` elements in the `.featured-grid`
2. **Gallery**: Add new `.gallery-item` divs in the `.gallery-scroll`
3. **Images**: Replace Unsplash URLs with actual artwork images

### Updating Contact Information

Edit the contact section in `index.html`:
```html
<div class="contact-item">
    <h4>Email</h4>
    <a href="mailto:your-email@domain.com">your-email@domain.com</a>
</div>
```

### Modifying Colors

Update CSS custom properties in `styles.css`:
```css
:root {
    --primary-blue: #4A90A4;
    --secondary-blue: #6BB6C7;
    /* Add your custom colors */
}
```

## 📧 Contact Form

The contact form includes:
- **Client-side validation** - Email format and required fields
- **Visual feedback** - Success/error notifications
- **Responsive design** - Works on all devices
- **Accessibility** - Proper labels and focus states

*Note: For production use, connect the form to a backend service or email handler.*

## 🌟 Browser Support

- **Modern browsers** - Chrome, Firefox, Safari, Edge
- **Mobile browsers** - iOS Safari, Chrome Mobile
- **CSS Grid and Flexbox** - Required for layout
- **Intersection Observer** - Required for animations

## 📄 License

This website template is created for Elena Kruk's portfolio. Feel free to use as inspiration for similar artist portfolio websites.

## 🎨 Credits

- **Design inspiration**: Katie O'Sullivan Art website
- **Typography**: Google Fonts (Playfair Display, Inter)
- **Images**: Unsplash (placeholder images)
- **Color palette**: Elena Kruk's business card design # SisterSite
