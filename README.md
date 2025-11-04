# 3D Portfolio - n8n Workflow Experience

An interactive 3D portfolio built with React and Three.js, featuring an n8n-style workflow visualization where portfolio sections are represented as animated nodes connected by flowing data particles.

![Phase 5 Complete](https://img.shields.io/badge/Phase-5%20Complete-success)
![Built with](https://img.shields.io/badge/Built%20with-React%20%2B%20Three.js-blue)

## 🚀 Features

### Core Experience
- **3D Interactive Workflow**: Navigate through portfolio as an n8n workflow
- **6 Portfolio Nodes**: Trigger, About, Skills, Experience, Projects, Contact
- **Animated Data Flow**: Glowing particles flow along curved connection lines
- **Interactive Nodes**: Hover effects, floating animations, and click interactions

### UI & Navigation
- **Loading Screen**: Animated loading experience with progress indicator
- **Modal System**: Detailed content for each portfolio section
- **Navigation Panel**: Mini-map and node list for quick access
- **Instructions Modal**: Interactive help guide for first-time visitors
- **Keyboard Navigation**: Arrow keys to navigate, ESC to close

### Visual Effects
- **Node Animations**: Floating, pulsing, scaling effects
- **Connection Lines**: Curved Bezier paths with glow effects
- **Particle System**: 3 animated particles per connection
- **Professional Lighting**: Multi-light setup with fog effects
- **Glassmorphism UI**: Modern backdrop blur effects

### Interactions
- **Mouse Controls**: Orbit, pan, zoom camera
- **Click Nodes**: Open detailed modals
- **Keyboard Shortcuts**: Navigate with arrow keys
- **Responsive Design**: Works on desktop and mobile

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **3D Engine**: Three.js + React Three Fiber
- **3D Utilities**: @react-three/drei, @react-three/rapier
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd 3d-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Controls

### Mouse/Trackpad
- **Left Click + Drag**: Rotate camera around scene
- **Right Click + Drag**: Pan camera view
- **Scroll Wheel**: Zoom in/out
- **Click Node**: Open detail modal

### Keyboard
- **Arrow Keys (← →)**: Navigate between nodes
- **ESC**: Close modal or navigation panel
- **Enter**: Select highlighted node (future feature)

## 📁 Project Structure

```
3d-portfolio/
├── src/
│   ├── components/
│   │   ├── nodes/              # Node components
│   │   │   ├── NodeBase.jsx
│   │   │   ├── TriggerNode.jsx
│   │   │   ├── AboutNode.jsx
│   │   │   ├── SkillsNode.jsx
│   │   │   ├── ExperienceNode.jsx
│   │   │   ├── ProjectsNode.jsx
│   │   │   └── ContactNode.jsx
│   │   ├── connections/        # Connection components
│   │   │   ├── ConnectionLine.jsx
│   │   │   └── DataFlow.jsx
│   │   ├── ui/                 # UI components
│   │   │   ├── Modal.jsx
│   │   │   ├── ModalContent.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── Instructions.jsx
│   │   ├── Scene.jsx           # Main 3D scene
│   │   ├── Camera.jsx
│   │   ├── Environment.jsx     # Lighting + fog
│   │   └── Ground.jsx          # Floor plane
│   ├── hooks/
│   │   ├── useKeyboard.js
│   │   └── useNodeInteraction.js
│   ├── utils/
│   │   ├── nodePositions.js
│   │   └── connectionCurves.js
│   ├── data/
│   │   └── portfolio.json      # Portfolio content
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Update Portfolio Content

Edit `src/data/portfolio.json` to customize your portfolio content:

```json
{
  "workflow": {
    "nodes": [
      {
        "id": "trigger",
        "type": "trigger",
        "name": "Welcome",
        "position": [0, 0, 0],
        "icon": "▶",
        "color": "#7B3FF2",
        "content": {
          "title": "Your Title",
          "subtitle": "Your Subtitle",
          "description": "Your description"
        },
        "connections": ["about"]
      }
      // ... more nodes
    ]
  }
}
```

### Node Types
- **trigger**: Entry point (purple)
- **function**: Processing nodes (blue/cyan)
- **set**: Multi-output nodes (orange/red)
- **loop**: Iteration nodes (yellow)
- **split**: Branch nodes (green)
- **output**: End nodes (purple)

### Customize Colors

Update `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      n8n: {
        purple: '#7B3FF2',
        pink: '#FF6D5A',
        blue: '#00C0FF',
      }
    }
  }
}
```

## 🎯 Development Phases

- ✅ **Phase 1**: Foundation (3D scene, camera, lighting, ground)
- ✅ **Phase 2**: Node System (6 interactive workflow nodes)
- ✅ **Phase 3**: Connections (animated data flow)
- ✅ **Phase 4**: Interactions (modals, keyboard navigation)
- ✅ **Phase 5**: Content & UI (loading, navigation, instructions)
- ✅ **Phase 6**: Polish (auto-tour, sound, analytics, SEO)

## 🎮 Phase 6 Features

### Auto-Tour Mode
- Automatic navigation through all portfolio nodes
- 5-second display per node
- Progress indicator
- Play/pause/stop controls
- Analytics tracking

### Sound Effects System
- Web Audio API tone generation
- 7 different sound effects (hover, click, open, close, navigate, success, whoosh)
- Toggle sound on/off
- Volume control (0-1)
- Frequency sweep effects

### Performance Monitoring
- Real-time FPS tracking
- Average/min/max FPS metrics
- Memory usage monitoring (if available)
- Performance rating (good/medium/low)
- Background monitoring system

### SEO Optimization
- Comprehensive meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card support
- Schema.org structured data
- Theme color configuration
- Preconnect hints for performance

### Analytics Integration
- Event tracking system
- Google Analytics 4 support
- Plausible Analytics support
- Custom event tracking
- Node interaction tracking
- Session duration tracking
- Debug mode with console logging

### Easter Eggs
- Hidden "Konami mode" (press 'K')
- Sound effect variations
- Control panel with hints
- Performance stats viewer

## 🚧 Future Enhancements

- [ ] Resume/CV download feature
- [ ] Project demo embeds (iframes/videos)
- [ ] Blog/writing integration (RSS feed)
- [ ] Dark/light mode toggle
- [ ] Multi-language support
- [ ] Custom cursor effects
- [ ] Particle trails on mouse movement

## 📄 License

MIT License - Feel free to use this project for your own portfolio!

## 🙏 Acknowledgments

- Built with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- Inspired by [n8n.io](https://n8n.io) workflow design
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

Built with ❤️ using React, Three.js, and modern web technologies
