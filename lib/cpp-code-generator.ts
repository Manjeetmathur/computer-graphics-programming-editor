import type { Shape } from '@/types/graphics'

export function generateCppCode(shapes: Shape[]): string {
  if (shapes.length === 0) {
    return `#include <stdio.h>
#include <graphics.h>
#include <conio.h>

int main()
{
    int gd = DETECT, gm;
    initgraph(&gd, &gm, "C:\\\\TURBOC3\\\\BGI");

    // No shapes added yet

    getch();
    closegraph();
    return 0;
}`
  }

  // Helper function to convert hex color to C++ color constant
  const getColorConstant = (color?: string): string => {
    if (!color) return 'BLACK'
    const colorMap: Record<string, string> = {
      '#000000': 'BLACK',
      '#FFFFFF': 'WHITE',
      '#FF0000': 'RED',
      '#00FF00': 'GREEN',
      '#0000FF': 'BLUE',
      '#FFFF00': 'YELLOW',
      '#FF00FF': 'MAGENTA',
      '#00FFFF': 'CYAN',
      '#808080': 'DARKGRAY',
      '#C0C0C0': 'LIGHTGRAY',
    }
    return colorMap[color.toUpperCase()] || 'BLACK'
  }

  let code = `#include <stdio.h>
#include <graphics.h>
#include <conio.h>

int main()
{
    int gd = DETECT, gm;
    initgraph(&gd, &gm, "C:\\\\TURBOC3\\\\BGI");

    // Set background color
    setbkcolor(WHITE);
    cleardevice();

`

  let currentColor = ''
  shapes.forEach((shape, index) => {
    const shapeColor = getColorConstant(shape.color)
    
    // Set color if it changed
    if (shapeColor !== currentColor) {
      code += `    setcolor(${shapeColor});\n`
      currentColor = shapeColor
    }
    
    code += `    // ${shape.type.charAt(0).toUpperCase() + shape.type.slice(1)} ${index + 1}\n`
    
    switch (shape.type) {
      case 'pixel':
        code += `    putpixel(${shape.x}, ${shape.y}, ${shapeColor});\n`
        break
      
      case 'line':
        code += `    line(${shape.x1}, ${shape.y1}, ${shape.x2}, ${shape.y2});\n`
        break
      
      case 'rectangle':
        code += `    rectangle(${shape.x1}, ${shape.y1}, ${shape.x2}, ${shape.y2});\n`
        break
      
      case 'circle':
        code += `    circle(${shape.x}, ${shape.y}, ${shape.radius});\n`
        break
      
      case 'arc':
        code += `    arc(${shape.x}, ${shape.y}, ${shape.startAngle}, ${shape.endAngle}, ${shape.radius});\n`
        break
      
      case 'ellipse':
        code += `    ellipse(${shape.x}, ${shape.y}, 0, 360, ${shape.radiusX}, ${shape.radiusY});\n`
        break
      
      case 'triangle':
        code += `    line(${shape.x1}, ${shape.y1}, ${shape.x2}, ${shape.y2});\n`
        code += `    line(${shape.x2}, ${shape.y2}, ${shape.x3}, ${shape.y3});\n`
        code += `    line(${shape.x3}, ${shape.y3}, ${shape.x1}, ${shape.y1});\n`
        break
      
      case 'polygon':
        if (shape.points.length >= 3) {
          const pointsArray: number[] = []
          shape.points.forEach((p) => {
            pointsArray.push(p.x, p.y)
          })
          // Close the polygon
          pointsArray.push(shape.points[0].x, shape.points[0].y)
          code += `    int poly[${pointsArray.length}] = {${pointsArray.join(', ')}};\n`
          code += `    drawpoly(${shape.points.length + 1}, poly);\n`
        }
        break
      
      case 'filledRectangle':
        code += `    bar(${shape.x1}, ${shape.y1}, ${shape.x2}, ${shape.y2});\n`
        break
      
      case 'filledCircle':
        code += `    fillellipse(${shape.x}, ${shape.y}, ${shape.radius}, ${shape.radius});\n`
        break
      
      case 'pieSlice':
        code += `    pieslice(${shape.x}, ${shape.y}, ${shape.startAngle}, ${shape.endAngle}, ${shape.radius});\n`
        break
    }
    
    code += '\n'
  })

  code += `    getch();
    closegraph();
    return 0;
}`

  return code
}

