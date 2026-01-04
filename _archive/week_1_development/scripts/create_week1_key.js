const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer,
        AlignmentType, PageNumber, BorderStyle, WidthType, ShadingType,
        LevelFormat, HeadingLevel, PageBreak } = require('docx');
const fs = require('fs');

// Create the Answer Key document
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 120, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "1F4E79", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: "2E75B6", font: "Arial" },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 1 } },
      { id: "Normal", name: "Normal", run: { size: 22, font: "Arial" },
        paragraph: { spacing: { after: 60 } } }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1008, right: 1008, bottom: 1008, left: 1008 } } },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "AP Precalculus - Week 1 Classwork ANSWER KEY", italics: true, size: 20, color: "C00000" })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Page ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 }),
                   new TextRun({ text: " of ", size: 20 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 20 })]
      })] })
    },
    children: [
      // HEADER
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("ANSWER KEY")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
        children: [new TextRun({ text: "AP Precalculus Classwork - Week 1", size: 28, bold: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
        children: [new TextRun({ text: "Right Triangle Trigonometry, Radians, and Unit Circle Foundations", size: 22 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new TextRun({ text: "Date(s): January 7 & 9, 2026  |  Teacher: Lyles", size: 20 })] }),

      // Grading Guide
      createGradingBox(),
      new Paragraph({ children: [] }),

      // PART A SOLUTIONS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PART A: Basic Skills - Solutions")] }),

      createSolution(1,
        "Find sin(\u03B8), cos(\u03B8), and tan(\u03B8) for a right triangle with legs 5 and 12, and hypotenuse 13, where \u03B8 is opposite the side of length 5.",
        "Given: Opposite = 5, Adjacent = 12, Hypotenuse = 13\nsin(\u03B8) = 5/13\ncos(\u03B8) = 12/13\ntan(\u03B8) = 5/12",
        "sin(\u03B8) = 5/13, cos(\u03B8) = 12/13, tan(\u03B8) = 5/12",
        "Confusing opposite and adjacent sides. Students must identify which leg is across from the angle.",
        "2 points: 1 for correct setup, 1 for all three ratios correct"
      ),

      createSolution(2,
        "In a right triangle, the side opposite angle A is 8 units and the hypotenuse is 17 units. Find sin(A), cos(A), and tan(A).",
        "Step 1: Find missing side using Pythagorean theorem\n  Adjacent\u00B2 + 8\u00B2 = 17\u00B2\n  Adjacent\u00B2 = 289 - 64 = 225\n  Adjacent = 15\n\nStep 2: Calculate ratios\n  sin(A) = 8/17\n  cos(A) = 15/17\n  tan(A) = 8/15",
        "sin(A) = 8/17, cos(A) = 15/17, tan(A) = 8/15",
        "Forgetting to use Pythagorean theorem; arithmetic errors in 17\u00B2 - 8\u00B2",
        "3 points: 1 for finding adjacent side, 1 for sin/cos, 1 for tan"
      ),

      createSolution(3,
        "A right triangle has legs of length 1 and 1, with hypotenuse \u221A2. If \u03B8 is opposite one of the legs, find all three basic trig ratios.",
        "This is a 45-45-90 triangle.\nsin(\u03B8) = 1/\u221A2 = \u221A2/2\ncos(\u03B8) = 1/\u221A2 = \u221A2/2\ntan(\u03B8) = 1/1 = 1",
        "sin(\u03B8) = \u221A2/2, cos(\u03B8) = \u221A2/2, tan(\u03B8) = 1",
        "Not rationalizing the denominator (1/\u221A2 should become \u221A2/2)",
        "2 points: Accept 1/\u221A2 or \u221A2/2 for sin and cos"
      ),

      createSolution(4,
        "In a 30-60-90 triangle with hypotenuse 2, find sin(30\u00B0), cos(30\u00B0), and tan(30\u00B0).",
        "30-60-90 triangle sides: 1 (opposite 30\u00B0), \u221A3 (opposite 60\u00B0), 2 (hypotenuse)\nsin(30\u00B0) = 1/2\ncos(30\u00B0) = \u221A3/2\ntan(30\u00B0) = 1/\u221A3 = \u221A3/3",
        "sin(30\u00B0) = 1/2, cos(30\u00B0) = \u221A3/2, tan(30\u00B0) = \u221A3/3",
        "Confusing which side is opposite 30\u00B0 vs 60\u00B0",
        "2 points"
      ),

      createSolution(5,
        "If sin(\u03B8) = 7/25 and \u03B8 is in a right triangle, find cos(\u03B8) and tan(\u03B8).",
        "Step 1: sin(\u03B8) = 7/25 means opposite = 7, hypotenuse = 25\nStep 2: Find adjacent: 7\u00B2 + adj\u00B2 = 25\u00B2\n  adj\u00B2 = 625 - 49 = 576\n  adj = 24\nStep 3: cos(\u03B8) = 24/25, tan(\u03B8) = 7/24",
        "cos(\u03B8) = 24/25, tan(\u03B8) = 7/24",
        "Arithmetic errors; confusing hypotenuse for adjacent",
        "3 points"
      ),

      createSolution(6,
        "Convert 45\u00B0 to radians.",
        "45\u00B0 \u00D7 (\u03C0/180) = 45\u03C0/180 = \u03C0/4",
        "\u03C0/4 radians",
        "Not simplifying the fraction; forgetting \u03C0",
        "1 point"
      ),

      createSolution(7,
        "Convert 120\u00B0 to radians.",
        "120\u00B0 \u00D7 (\u03C0/180) = 120\u03C0/180 = 2\u03C0/3",
        "2\u03C0/3 radians",
        "Simplification errors (120/180 = 2/3)",
        "1 point"
      ),

      createSolution(8,
        "Convert 270\u00B0 to radians.",
        "270\u00B0 \u00D7 (\u03C0/180) = 270\u03C0/180 = 3\u03C0/2",
        "3\u03C0/2 radians",
        "Simplification errors",
        "1 point"
      ),

      createSolution(9,
        "Convert \u03C0/6 radians to degrees.",
        "(\u03C0/6) \u00D7 (180/\u03C0) = 180/6 = 30\u00B0",
        "30\u00B0",
        "Multiplying by \u03C0/180 instead of 180/\u03C0",
        "1 point"
      ),

      createSolution(10,
        "Convert \u03C0/3 radians to degrees.",
        "(\u03C0/3) \u00D7 (180/\u03C0) = 180/3 = 60\u00B0",
        "60\u00B0",
        "None common",
        "1 point"
      ),

      createSolution(11,
        "Convert 5\u03C0/4 radians to degrees.",
        "(5\u03C0/4) \u00D7 (180/\u03C0) = 5(180)/4 = 900/4 = 225\u00B0",
        "225\u00B0",
        "Arithmetic errors with 5 \u00D7 180 \u00F7 4",
        "1 point"
      ),

      createSolution(12,
        "Convert 7\u03C0/6 radians to degrees.",
        "(7\u03C0/6) \u00D7 (180/\u03C0) = 7(180)/6 = 1260/6 = 210\u00B0",
        "210\u00B0",
        "Arithmetic errors",
        "1 point"
      ),

      new Paragraph({ children: [new PageBreak()] }),

      // PART B SOLUTIONS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PART B: Intermediate Skills - Solutions")] }),

      createSolution(13,
        "A circle has radius 8 cm. Find the arc length subtended by a central angle of \u03C0/4 radians.",
        "s = r\u03B8 = 8 \u00D7 (\u03C0/4) = 8\u03C0/4 = 2\u03C0 cm",
        "s = 2\u03C0 cm (approximately 6.28 cm)",
        "Using degrees instead of radians; forgetting to multiply",
        "2 points"
      ),

      createSolution(14,
        "A pendulum swings through an angle of 30\u00B0. If the pendulum is 2 meters long, how far does the tip travel in one swing?",
        "Step 1: Convert 30\u00B0 to radians\n  30\u00B0 \u00D7 (\u03C0/180) = \u03C0/6 radians\n\nStep 2: Apply arc length formula\n  s = r\u03B8 = 2 \u00D7 (\u03C0/6) = 2\u03C0/6 = \u03C0/3 meters",
        "s = \u03C0/3 meters (approximately 1.05 m)",
        "Forgetting to convert degrees to radians first",
        "3 points: 1 for conversion, 2 for arc length"
      ),

      createSolution(15,
        "The minute hand of a clock is 6 inches long. How far does the tip travel in 20 minutes?",
        "Step 1: Find angle (20 min = 20/60 = 1/3 revolution)\n  \u03B8 = (1/3) \u00D7 2\u03C0 = 2\u03C0/3 radians\n\nStep 2: Arc length\n  s = r\u03B8 = 6 \u00D7 (2\u03C0/3) = 12\u03C0/3 = 4\u03C0 inches",
        "s = 4\u03C0 inches (approximately 12.57 in)",
        "Not recognizing that 20 min = 1/3 of full rotation",
        "3 points"
      ),

      createSolution(16,
        "Find the exact coordinates of the point on the unit circle at angle \u03C0/4.",
        "45-45-90 triangle has sides 1:1:\u221A2\nOn unit circle (hypotenuse = 1):\n  legs = 1/\u221A2 = \u221A2/2 each\nCoordinates: (\u221A2/2, \u221A2/2)",
        "(\u221A2/2, \u221A2/2)",
        "Not scaling the triangle to have hypotenuse 1",
        "3 points"
      ),

      createSolution(17,
        "Find the exact coordinates of the point on the unit circle at angle \u03C0/3.",
        "30-60-90 triangle has sides 1:\u221A3:2\nAngle \u03C0/3 = 60\u00B0, so the angle at the center is 60\u00B0\nOn unit circle: scale so hypotenuse = 1\n  Side opposite 30\u00B0 = 1/2 (this is x-coordinate)\n  Side opposite 60\u00B0 = \u221A3/2 (this is y-coordinate)\nCoordinates: (1/2, \u221A3/2)",
        "(1/2, \u221A3/2)",
        "Confusing which coordinate is x vs y; mixing up 30\u00B0 and 60\u00B0 values",
        "3 points"
      ),

      createSolution(18,
        "Find the exact coordinates of the point on the unit circle at angle \u03C0/6.",
        "\u03C0/6 = 30\u00B0\nUsing 30-60-90 triangle scaled to unit circle:\n  x = cos(\u03C0/6) = \u221A3/2\n  y = sin(\u03C0/6) = 1/2\nCoordinates: (\u221A3/2, 1/2)",
        "(\u221A3/2, 1/2)",
        "Swapping x and y coordinates",
        "2 points"
      ),

      createSolution(19,
        "What are the coordinates at angle \u03C0/2? Explain why these make sense geometrically.",
        "\u03C0/2 = 90\u00B0 points straight up on the unit circle\nCoordinates: (0, 1)\nGeometrically: The point is on the positive y-axis, 1 unit from the origin.",
        "(0, 1)",
        "None common for the coordinates; weak geometric explanation",
        "2 points: 1 for coordinates, 1 for explanation"
      ),

      createSolution(20,
        "Find the reference angle for 5\u03C0/6. Then find the exact coordinates of the point on the unit circle at 5\u03C0/6.",
        "5\u03C0/6 is in Quadrant II\nReference angle = \u03C0 - 5\u03C0/6 = 6\u03C0/6 - 5\u03C0/6 = \u03C0/6\n\n\u03C0/6 has coordinates (\u221A3/2, 1/2)\nIn Quadrant II, x is negative, y is positive\nCoordinates for 5\u03C0/6: (-\u221A3/2, 1/2)",
        "Reference angle: \u03C0/6; Coordinates: (-\u221A3/2, 1/2)",
        "Wrong sign pattern for Quadrant II",
        "3 points"
      ),

      createSolution(21,
        "Find the reference angle for 4\u03C0/3. Then find the exact coordinates.",
        "4\u03C0/3 is in Quadrant III (between \u03C0 and 3\u03C0/2)\nReference angle = 4\u03C0/3 - \u03C0 = 4\u03C0/3 - 3\u03C0/3 = \u03C0/3\n\n\u03C0/3 has coordinates (1/2, \u221A3/2)\nIn Quadrant III, both x and y are negative\nCoordinates for 4\u03C0/3: (-1/2, -\u221A3/2)",
        "Reference angle: \u03C0/3; Coordinates: (-1/2, -\u221A3/2)",
        "Incorrect reference angle calculation",
        "3 points"
      ),

      createSolution(22,
        "Find the reference angle for 5\u03C0/4. Then determine sin(5\u03C0/4) and cos(5\u03C0/4).",
        "5\u03C0/4 is in Quadrant III\nReference angle = 5\u03C0/4 - \u03C0 = 5\u03C0/4 - 4\u03C0/4 = \u03C0/4\n\nFor \u03C0/4: sin = \u221A2/2, cos = \u221A2/2\nQuadrant III: both negative\nsin(5\u03C0/4) = -\u221A2/2\ncos(5\u03C0/4) = -\u221A2/2",
        "sin(5\u03C0/4) = -\u221A2/2, cos(5\u03C0/4) = -\u221A2/2",
        "Forgetting to apply negative signs",
        "3 points"
      ),

      createSolution(23,
        "Find the reference angle for 11\u03C0/6. Then find sin(11\u03C0/6), cos(11\u03C0/6), and tan(11\u03C0/6).",
        "11\u03C0/6 is in Quadrant IV (between 3\u03C0/2 and 2\u03C0)\nReference angle = 2\u03C0 - 11\u03C0/6 = 12\u03C0/6 - 11\u03C0/6 = \u03C0/6\n\nFor \u03C0/6: sin = 1/2, cos = \u221A3/2, tan = 1/\u221A3 = \u221A3/3\nQuadrant IV: cos positive, sin and tan negative\nsin(11\u03C0/6) = -1/2\ncos(11\u03C0/6) = \u221A3/2\ntan(11\u03C0/6) = -\u221A3/3",
        "sin = -1/2, cos = \u221A3/2, tan = -\u221A3/3",
        "Wrong signs for Quadrant IV",
        "4 points"
      ),

      new Paragraph({ children: [new PageBreak()] }),

      // PART C SOLUTIONS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PART C: Challenge Problems - Solutions")] }),

      createSolution(24,
        "Given the point (-1/2, \u221A3/2) is on the unit circle at angle 2\u03C0/3, find all six trigonometric functions.",
        "From coordinates (x, y) = (-1/2, \u221A3/2):\nsin(2\u03C0/3) = y = \u221A3/2\ncos(2\u03C0/3) = x = -1/2\ntan(2\u03C0/3) = y/x = (\u221A3/2)/(-1/2) = -\u221A3\n\ncsc(2\u03C0/3) = 1/sin = 2/\u221A3 = 2\u221A3/3\nsec(2\u03C0/3) = 1/cos = -2\ncot(2\u03C0/3) = 1/tan = -1/\u221A3 = -\u221A3/3",
        "sin = \u221A3/2, cos = -1/2, tan = -\u221A3, csc = 2\u221A3/3, sec = -2, cot = -\u221A3/3",
        "Errors in reciprocal calculations; not rationalizing denominators",
        "5 points: 3 for basic ratios, 2 for reciprocals"
      ),

      createSolution(25,
        "If tan(\u03B8) = -3/4 and \u03B8 is in Quadrant II, find all six trigonometric functions.",
        "In QII: sin positive, cos negative, tan negative (check: -3/4 is negative)\ntan = opp/adj = -3/4 means opposite = 3, adjacent = 4 (with signs applied)\n\nHypotenuse = \u221A(3\u00B2 + 4\u00B2) = \u221A25 = 5\n\nIn Quadrant II:\nsin(\u03B8) = 3/5 (positive in QII)\ncos(\u03B8) = -4/5 (negative in QII)\ntan(\u03B8) = -3/4\ncsc(\u03B8) = 5/3\nsec(\u03B8) = -5/4\ncot(\u03B8) = -4/3",
        "sin = 3/5, cos = -4/5, tan = -3/4, csc = 5/3, sec = -5/4, cot = -4/3",
        "Wrong signs; not drawing reference triangle correctly",
        "5 points"
      ),

      createSolution(26,
        "Find all six trigonometric functions for the angle 7\u03C0/4.",
        "7\u03C0/4 = 315\u00B0, in Quadrant IV\nReference angle = 2\u03C0 - 7\u03C0/4 = \u03C0/4\n\nCoordinates: (\u221A2/2, -\u221A2/2)\nsin(7\u03C0/4) = -\u221A2/2\ncos(7\u03C0/4) = \u221A2/2\ntan(7\u03C0/4) = -1\ncsc(7\u03C0/4) = -\u221A2\nsec(7\u03C0/4) = \u221A2\ncot(7\u03C0/4) = -1",
        "sin = -\u221A2/2, cos = \u221A2/2, tan = -1, csc = -\u221A2, sec = \u221A2, cot = -1",
        "Wrong quadrant identification",
        "5 points"
      ),

      createSolution(27,
        "Ferris wheel problem with radius 40 feet, one revolution in 2 minutes.",
        "a) In 30 seconds = 30/120 = 1/4 of a revolution\n   \u03B8 = (1/4)(2\u03C0) = \u03C0/2 radians\n\nb) Arc length s = r\u03B8 = 40 \u00D7 (\u03C0/2) = 20\u03C0 feet \u2248 62.8 feet\n\nc) Linear speed = distance/time = 20\u03C0 feet / 30 sec = 2\u03C0/3 ft/sec \u2248 2.09 ft/sec",
        "a) \u03C0/2 radians, b) 20\u03C0 feet, c) 2\u03C0/3 ft/sec",
        "Incorrect time ratio; forgetting to convert to per-second rate",
        "6 points: 2 per part"
      ),

      createSolution(28,
        "Pizza problem: 8 slices, radius 7 inches.",
        "a) Central angle per slice = 2\u03C0/8 = \u03C0/4 radians\n\nb) Arc length = r\u03B8 = 7 \u00D7 (\u03C0/4) = 7\u03C0/4 inches \u2248 5.5 inches\n\nc) 3 slices = 3 \u00D7 (\u03C0/4) = 3\u03C0/4 radians = 3\u03C0/4 \u00D7 (180/\u03C0) = 135\u00B0",
        "a) \u03C0/4 radians, b) 7\u03C0/4 inches, c) 135\u00B0",
        "Mixing up 8 slices with other values",
        "5 points"
      ),

      createSolution(29,
        "ACT Practice #1: If sin A = 5/13, what is tan A?",
        "sin A = 5/13 means opposite = 5, hypotenuse = 13\nAdjacent = \u221A(13\u00B2 - 5\u00B2) = \u221A(169 - 25) = \u221A144 = 12\ntan A = opposite/adjacent = 5/12",
        "A. 5/12",
        "Choosing 5/13 (confusing sin and tan); choosing 12/5 (inverting the ratio)",
        "2 points"
      ),

      createSolution(30,
        "ACT Practice #2: Arc length 8\u03C0 cm, central angle 2\u03C0/3 radians. Find radius.",
        "s = r\u03B8\n8\u03C0 = r \u00D7 (2\u03C0/3)\nr = 8\u03C0 \u00F7 (2\u03C0/3)\nr = 8\u03C0 \u00D7 (3/2\u03C0)\nr = 24\u03C0/2\u03C0 = 12 cm",
        "C. 12 cm",
        "Multiplying instead of dividing; arithmetic errors with fractions",
        "2 points"
      ),

      new Paragraph({ children: [new PageBreak()] }),

      // BONUS SOLUTIONS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("BONUS PROBLEMS - Solutions")] }),

      createSolution("B1",
        "Why are radians considered \"natural\" units?",
        "Radians are \"natural\" because:\n1. The arc length formula s = r\u03B8 has no conversion factor needed when \u03B8 is in radians\n2. In calculus, derivatives of sin(x) and cos(x) only equal cos(x) and -sin(x) when x is in radians\n3. Radians connect angle measure directly to the unit circle's arc length (1 radian = 1 radius length along the arc)",
        "Any reasonable explanation showing understanding of why radians simplify formulas",
        "N/A",
        "2 bonus points"
      ),

      createSolution("B2",
        "Predict coordinates for \u03C0/8.",
        "Reasonable predictions might include:\n- Since \u03C0/8 is half of \u03C0/4, and \u03C0/4 has equal x and y coordinates, \u03C0/8 should have x > y\n- The coordinates should be between (1, 0) and (\u221A2/2, \u221A2/2)\n- Using half-angle formulas (advanced): cos(\u03C0/8) = \u221A((1+\u221A2/2)/2) and sin(\u03C0/8) = \u221A((1-\u221A2/2)/2)\n- Decimal approximation: approximately (0.924, 0.383)",
        "Any reasonable prediction with justification",
        "N/A",
        "2 bonus points"
      ),

      // COMMON ERRORS SUMMARY
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Summary: Common Errors to Watch For")] }),
      createCommonErrorsTable(),

      // EXTENSION IDEAS
      new Paragraph({ children: [] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Extension Ideas for Early Finishers")] }),
      new Paragraph({ children: [new TextRun({ text: "1. ", bold: true }), new TextRun("Research how radians are used in physics (angular velocity, torque)")] }),
      new Paragraph({ children: [new TextRun({ text: "2. ", bold: true }), new TextRun("Explore why sine and cosine functions have the derivative relationships they do")] }),
      new Paragraph({ children: [new TextRun({ text: "3. ", bold: true }), new TextRun("Derive the coordinates for \u03C0/12 using sum/difference formulas")] }),
      new Paragraph({ children: [new TextRun({ text: "4. ", bold: true }), new TextRun("Create a visual showing how the unit circle \"unwinds\" to form the sine wave")] }),
      new Paragraph({ children: [new TextRun({ text: "5. ", bold: true }), new TextRun("Start the Artistic Unit Circle Project (due Week 5)")] })
    ]
  }]
});

// Helper functions
function createGradingBox() {
  const border = { style: BorderStyle.SINGLE, size: 12, color: "C00000" };
  return new Table({
    columnWidths: [4680, 4680],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "FFF0F0", type: ShadingType.CLEAR },
            width: { size: 4680, type: WidthType.DXA },
            children: [
              new Paragraph({ children: [new TextRun({ text: "Grading Overview", bold: true, size: 24, color: "C00000" })] }),
              new Paragraph({ children: [new TextRun({ text: "Part A: 12 problems (17 pts)", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Part B: 11 problems (32 pts)", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Part C: 7 problems (30 pts)", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Bonus: 2 problems (+4 pts)", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Total: 79 points + 4 bonus", bold: true, size: 20 })] })
            ]
          }),
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "FFF0F0", type: ShadingType.CLEAR },
            width: { size: 4680, type: WidthType.DXA },
            children: [
              new Paragraph({ children: [new TextRun({ text: "Partial Credit Guidelines", bold: true, size: 24, color: "C00000" })] }),
              new Paragraph({ children: [new TextRun({ text: "Correct setup but arithmetic error: 75%", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Correct method, wrong sign: 75%", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "One step completed correctly: 50%", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Attempt with relevant work: 25%", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "No work shown: 0%", size: 20, italics: true })] })
            ]
          })
        ]
      })
    ]
  });
}

function createSolution(num, problem, solution, answer, commonError, points) {
  const border = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
  return new Table({
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            width: { size: 9360, type: WidthType.DXA },
            children: [
              new Paragraph({ spacing: { before: 60 }, children: [
                new TextRun({ text: `Problem ${num}: `, bold: true, size: 22, color: "1F4E79" }),
                new TextRun({ text: problem, size: 20, italics: true })
              ]}),
              new Paragraph({ children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Solution:", bold: true, size: 20 })] }),
              ...solution.split('\n').map(line =>
                new Paragraph({ children: [new TextRun({ text: line, size: 20 })] })
              ),
              new Paragraph({ children: [] }),
              new Paragraph({ children: [
                new TextRun({ text: "ANSWER: ", bold: true, size: 20, color: "006600" }),
                new TextRun({ text: answer, bold: true, size: 20, color: "006600" })
              ]}),
              new Paragraph({ children: [
                new TextRun({ text: "Common Error: ", bold: true, size: 18, color: "C00000" }),
                new TextRun({ text: commonError, size: 18, color: "C00000" })
              ]}),
              new Paragraph({ spacing: { after: 60 }, children: [
                new TextRun({ text: "Points: ", bold: true, size: 18 }),
                new TextRun({ text: points, size: 18 })
              ]})
            ]
          })
        ]
      })
    ]
  });
}

function createCommonErrorsTable() {
  const border = { style: BorderStyle.SINGLE, size: 8, color: "000000" };
  return new Table({
    columnWidths: [3120, 3120, 3120],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "FFF0F0", type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Error Type", bold: true, size: 20 })] })] }),
          new TableCell({ borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "FFF0F0", type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Example", bold: true, size: 20 })] })] }),
          new TableCell({ borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "FFF0F0", type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Remediation", bold: true, size: 20 })] })] })
        ]
      }),
      createErrorRow("Opposite vs Adjacent confusion", "Using 12 instead of 5 as opposite in 5-12-13 triangle", "Draw and label triangle before calculating", border),
      createErrorRow("Conversion direction error", "Multiplying by \u03C0/180 when converting from radians", "Write formula first; check units cancel correctly", border),
      createErrorRow("Forgetting to convert", "Using s = r\u03B8 with degrees", "Highlight that s = r\u03B8 requires radians", border),
      createErrorRow("Wrong sign pattern", "Making sin negative in Quadrant II", "Review ASTC mnemonic; draw coordinate plane", border),
      createErrorRow("Reference angle calculation", "Subtracting from wrong multiple of \u03C0", "Identify quadrant first, then apply correct formula", border),
      createErrorRow("Not simplifying", "Leaving answer as 120\u03C0/180 instead of 2\u03C0/3", "Require simplified fractions on all answers", border)
    ]
  });
}

function createErrorRow(type, example, remediation, border) {
  return new TableRow({
    children: [
      new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, width: { size: 3120, type: WidthType.DXA },
        children: [new Paragraph({ children: [new TextRun({ text: type, size: 18 })] })] }),
      new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, width: { size: 3120, type: WidthType.DXA },
        children: [new Paragraph({ children: [new TextRun({ text: example, size: 18 })] })] }),
      new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, width: { size: 3120, type: WidthType.DXA },
        children: [new Paragraph({ children: [new TextRun({ text: remediation, size: 18 })] })] })
    ]
  });
}

// Generate the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/franklyles/Documents/Claude Stuff/Disciplines/precal/week_1/Week_1_PreCal_Key_Classwork.docx", buffer);
  console.log("Answer key document created successfully!");
});
