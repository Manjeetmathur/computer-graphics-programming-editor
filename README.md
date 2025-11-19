# C++ Graphics Demo

A Next.js application that demonstrates computer graphics programming through a visual GUI interface. Create and manipulate graphics shapes (pixel, line, rectangle, circle, arc, ellipse) with real-time rendering.

## Features

- **Visual Shape Palette**: Select from various graphics shapes (Pixel, Line, Rectangle, Circle, Arc, Ellipse)
- **Property Editor**: Edit shape attributes in real-time
- **Live Rendering**: See your graphics rendered instantly on the canvas
- **Two-Panel Layout**: Editor on the left, renderer on the right

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Click on a shape from the palette (left side)
2. The shape will be added with default values
3. Edit the properties in the Property Editor
4. Watch the graphics render in real-time on the right side
5. Click on any shape in the "Added Shapes" list to edit it
6. Delete shapes by clicking the × button

## Project Structure

- `app/` - Next.js app directory with pages and layouts
- `components/` - React components (ShapePalette, PropertyEditor, GraphicsCanvas, ShapeList)
- `lib/` - Graphics rendering engine
- `types/` - TypeScript type definitions

