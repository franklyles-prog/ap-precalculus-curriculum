const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer,
        AlignmentType, PageNumber, BorderStyle, WidthType, ShadingType, VerticalAlign,
        LevelFormat, HeadingLevel, PageBreak } = require('docx');
const fs = require('fs');

// Create the Classwork document
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
        paragraph: { spacing: { after: 80 } } }
    ]
  },
  numbering: {
    config: [
      { reference: "partA-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "partB-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "partC-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullet-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022",
        alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1008, right: 1008, bottom: 1008, left: 1008 } } },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "AP Precalculus - Week 1 Classwork", italics: true, size: 20 })]
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
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("AP Precalculus Classwork - Week 1")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
        children: [new TextRun({ text: "Right Triangle Trigonometry, Radians, and Unit Circle Foundations", size: 24, bold: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new TextRun({ text: "Date(s): January 7 & 9, 2026  |  Teacher: Lyles", size: 20 })] }),

      // Standards and Learning Targets Box
      createInfoBox("Standards", "PC.TR.1 (Radian measure as arc length)  |  PC.TR.2 (Degree-radian conversions)\nPC.TR.3 (Unit circle for all trig functions)  |  PC.TR.4 (Special triangles for exact values)"),
      new Paragraph({ children: [] }),
      createInfoBox("Learning Targets", "By the end of this week, you will be able to:\n- Apply SOH-CAH-TOA to find trigonometric ratios in right triangles\n- Convert between degrees and radians using conversion formulas\n- Calculate arc length using s = r\u03B8\n- Find exact coordinates for special angles on the unit circle\n- Use reference angles to find coordinates in all four quadrants\n- Determine all six trigonometric functions from unit circle coordinates"),

      new Paragraph({ children: [] }),

      // FORMULA REFERENCE BOX
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Formula Reference")] }),
      createFormulaBox(),

      new Paragraph({ children: [new PageBreak()] }),

      // PART A: BASIC SKILLS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PART A: Basic Skills (40% of grade)")] }),
      new Paragraph({ children: [new TextRun({ text: "Instructions: Complete each problem, showing all work. Use the formula reference as needed.", italics: true })] }),
      new Paragraph({ children: [new TextRun({ text: "Target: 80% accuracy or higher", bold: true, color: "2E75B6" })] }),
      new Paragraph({ children: [] }),

      // Worked Example for Part A
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Worked Example")] }),
      createWorkedExample(
        "Find sin(\u03B8), cos(\u03B8), and tan(\u03B8) for the right triangle with sides 3, 4, and 5 where \u03B8 is the angle opposite the side of length 3.",
        "Step 1: Identify the sides relative to angle \u03B8\n  - Opposite side = 3 (across from \u03B8)\n  - Adjacent side = 4 (next to \u03B8, not hypotenuse)\n  - Hypotenuse = 5 (longest side, opposite right angle)\n\nStep 2: Apply SOH-CAH-TOA\n  - sin(\u03B8) = Opposite/Hypotenuse = 3/5\n  - cos(\u03B8) = Adjacent/Hypotenuse = 4/5\n  - tan(\u03B8) = Opposite/Adjacent = 3/4",
        "sin(\u03B8) = 3/5, cos(\u03B8) = 4/5, tan(\u03B8) = 3/4"
      ),
      new Paragraph({ children: [] }),

      // Part A Problems (1-12)
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Right Triangle Trigonometry (Problems 1-5)")] }),
      new Paragraph({ children: [new TextRun({ text: "Hint: Use SOH-CAH-TOA. Identify opposite, adjacent, and hypotenuse first!", color: "5B9BD5" })] }),
      new Paragraph({ children: [] }),

      createProblem(1, "Find sin(\u03B8), cos(\u03B8), and tan(\u03B8) for a right triangle with legs 5 and 12, and hypotenuse 13, where \u03B8 is opposite the side of length 5."),
      createWorkSpace(3),

      createProblem(2, "In a right triangle, the side opposite angle A is 8 units and the hypotenuse is 17 units. Find sin(A), cos(A), and tan(A). (Hint: Use the Pythagorean theorem to find the missing side.)"),
      createWorkSpace(4),

      createProblem(3, "A right triangle has legs of length 1 and 1, with hypotenuse \u221A2. If \u03B8 is opposite one of the legs, find all three basic trig ratios."),
      createWorkSpace(3),

      createProblem(4, "In a 30-60-90 triangle with hypotenuse 2, find sin(30\u00B0), cos(30\u00B0), and tan(30\u00B0). (Hint: The sides are 1, \u221A3, and 2.)"),
      createWorkSpace(3),

      createProblem(5, "If sin(\u03B8) = 7/25 and \u03B8 is in a right triangle, find cos(\u03B8) and tan(\u03B8)."),
      createWorkSpace(4),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Degree to Radian Conversions (Problems 6-8)")] }),
      new Paragraph({ children: [new TextRun({ text: "Formula: radians = degrees \u00D7 (\u03C0/180)", color: "5B9BD5" })] }),
      new Paragraph({ children: [] }),

      createProblem(6, "Convert 45\u00B0 to radians. Express your answer in terms of \u03C0."),
      createWorkSpace(2),

      createProblem(7, "Convert 120\u00B0 to radians. Express your answer in terms of \u03C0."),
      createWorkSpace(2),

      createProblem(8, "Convert 270\u00B0 to radians. Express your answer in terms of \u03C0."),
      createWorkSpace(2),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Radian to Degree Conversions (Problems 9-12)")] }),
      new Paragraph({ children: [new TextRun({ text: "Formula: degrees = radians \u00D7 (180/\u03C0)", color: "5B9BD5" })] }),
      new Paragraph({ children: [] }),

      createProblem(9, "Convert \u03C0/6 radians to degrees."),
      createWorkSpace(2),

      createProblem(10, "Convert \u03C0/3 radians to degrees."),
      createWorkSpace(2),

      createProblem(11, "Convert 5\u03C0/4 radians to degrees."),
      createWorkSpace(2),

      createProblem(12, "Convert 7\u03C0/6 radians to degrees."),
      createWorkSpace(2),

      new Paragraph({ children: [new PageBreak()] }),

      // PART B: INTERMEDIATE SKILLS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PART B: Intermediate Skills (40% of grade)")] }),
      new Paragraph({ children: [new TextRun({ text: "Instructions: These problems require multiple steps. Show all work clearly.", italics: true })] }),
      new Paragraph({ children: [new TextRun({ text: "Target: 60-70% accuracy", bold: true, color: "2E75B6" })] }),
      new Paragraph({ children: [] }),

      // Worked Example for Part B
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Worked Example")] }),
      createWorkedExample(
        "A Ferris wheel has a radius of 20 feet. If a passenger travels through an angle of \u03C0/3 radians, how far has the passenger traveled along the arc?",
        "Step 1: Identify given values\n  - Radius r = 20 feet\n  - Central angle \u03B8 = \u03C0/3 radians\n\nStep 2: Apply the arc length formula s = r\u03B8\n  - s = 20 \u00D7 (\u03C0/3)\n  - s = 20\u03C0/3 feet\n\nStep 3: Calculate (if decimal approximation needed)\n  - s \u2248 20.94 feet",
        "s = 20\u03C0/3 feet (approximately 20.94 feet)"
      ),
      new Paragraph({ children: [] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Arc Length Problems (Problems 13-15)")] }),
      new Paragraph({ children: [new TextRun({ text: "Formula: s = r\u03B8 (where \u03B8 must be in radians!)", color: "5B9BD5" })] }),
      new Paragraph({ children: [] }),

      createProblem(13, "A circle has radius 8 cm. Find the arc length subtended by a central angle of \u03C0/4 radians."),
      createWorkSpace(3),

      createProblem(14, "A pendulum swings through an angle of 30\u00B0. If the pendulum is 2 meters long, how far does the tip travel in one swing? (Remember to convert to radians first!)"),
      createWorkSpace(4),

      createProblem(15, "The minute hand of a clock is 6 inches long. How far does the tip of the minute hand travel in 20 minutes?"),
      createWorkSpace(4),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Unit Circle Coordinates (Problems 16-19)")] }),
      new Paragraph({ children: [new TextRun({ text: "Use special triangles: 30-60-90 has sides 1:\u221A3:2 and 45-45-90 has sides 1:1:\u221A2", color: "5B9BD5" })] }),
      new Paragraph({ children: [] }),

      createProblem(16, "Find the exact coordinates of the point on the unit circle at angle \u03C0/4. Show how you derived this using the 45-45-90 triangle."),
      createWorkSpace(4),

      createProblem(17, "Find the exact coordinates of the point on the unit circle at angle \u03C0/3. Show how you derived this using the 30-60-90 triangle."),
      createWorkSpace(4),

      createProblem(18, "Find the exact coordinates of the point on the unit circle at angle \u03C0/6."),
      createWorkSpace(3),

      createProblem(19, "What are the coordinates at angle \u03C0/2? Explain why these make sense geometrically."),
      createWorkSpace(3),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Reference Angles and All Quadrants (Problems 20-23)")] }),
      new Paragraph({ children: [new TextRun({ text: "Remember: Reference angle is always positive and less than \u03C0/2. Use \"All Students Take Calculus\" for signs!", color: "5B9BD5" })] }),
      new Paragraph({ children: [] }),

      createProblem(20, "Find the reference angle for 5\u03C0/6. Then find the exact coordinates of the point on the unit circle at 5\u03C0/6."),
      createWorkSpace(4),

      createProblem(21, "Find the reference angle for 4\u03C0/3. Then find the exact coordinates of the point on the unit circle at 4\u03C0/3."),
      createWorkSpace(4),

      createProblem(22, "Find the reference angle for 5\u03C0/4. Then determine sin(5\u03C0/4) and cos(5\u03C0/4)."),
      createWorkSpace(4),

      createProblem(23, "Find the reference angle for 11\u03C0/6. Then find sin(11\u03C0/6), cos(11\u03C0/6), and tan(11\u03C0/6)."),
      createWorkSpace(4),

      new Paragraph({ children: [new PageBreak()] }),

      // PART C: CHALLENGE PROBLEMS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("PART C: Challenge Problems (20% of grade)")] }),
      new Paragraph({ children: [new TextRun({ text: "Instructions: These problems require critical thinking. It is okay to find these challenging!", italics: true })] }),
      new Paragraph({ children: [new TextRun({ text: "Target: 40-50% accuracy. Partial credit for showing reasoning.", bold: true, color: "2E75B6" })] }),
      new Paragraph({ children: [] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("All Six Trigonometric Functions (Problems 24-26)")] }),
      createProblem(24, "Given the point (-1/2, \u221A3/2) is on the unit circle at angle 2\u03C0/3, find all six trigonometric functions: sin, cos, tan, csc, sec, and cot."),
      createWorkSpace(5),

      createProblem(25, "If tan(\u03B8) = -3/4 and \u03B8 is in Quadrant II, find all six trigonometric functions. (Hint: Draw a reference triangle.)"),
      createWorkSpace(6),

      createProblem(26, "Find all six trigonometric functions for the angle 7\u03C0/4."),
      createWorkSpace(5),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Real-World Applications (Problems 27-28)")] }),
      createProblem(27, "A Ferris wheel with radius 40 feet rotates at a constant speed, completing one revolution in 2 minutes.\na) How many radians does the wheel rotate in 30 seconds?\nb) How far does a passenger travel along the arc in 30 seconds?\nc) What is the passenger's linear speed in feet per second?"),
      createWorkSpace(7),

      createProblem(28, "A pizza is cut into 8 equal slices. If the pizza has a radius of 7 inches:\na) What is the central angle of each slice in radians?\nb) What is the arc length (crust length) of each slice?\nc) If you eat 3 slices, through how many degrees have you eaten?"),
      createWorkSpace(6),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("ACT Practice Problems (Problems 29-30)")] }),
      new Paragraph({ children: [new TextRun({ text: "ACT Practice: These are similar to actual ACT Math questions. Time yourself - aim for 1 minute per problem.", color: "C00000", bold: true })] }),
      new Paragraph({ children: [] }),

      createProblem(29, "ACT Practice #1: In the right triangle shown below, if sin A = 5/13, what is the value of tan A?\n\n[Triangle ABC with right angle at C, where side opposite A is 5, hypotenuse is 13]\n\nA. 5/12\nB. 5/13\nC. 12/13\nD. 12/5\nE. 13/5"),
      createWorkSpace(4),

      createProblem(30, "ACT Practice #2: An arc of a circle has length 8\u03C0 cm and is subtended by a central angle of 2\u03C0/3 radians. What is the radius of the circle?\n\nA. 6 cm\nB. 8 cm\nC. 12 cm\nD. 16 cm\nE. 24 cm"),
      createWorkSpace(4),

      new Paragraph({ children: [new PageBreak()] }),

      // BONUS SECTION
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("BONUS PROBLEMS (+2 points each)")] }),
      new Paragraph({ children: [new TextRun({ text: "Challenge yourself! These are extension problems for students who want extra practice.", italics: true })] }),
      new Paragraph({ children: [] }),

      createProblem("B1", "Why are radians considered \"natural\" units in mathematics? Write 2-3 sentences explaining why radians make certain formulas (like arc length s = r\u03B8) simpler than using degrees."),
      createWorkSpace(5),

      createProblem("B2", "The coordinates for \u03C0/4 on the unit circle are (\u221A2/2, \u221A2/2). Using symmetry and the half-angle relationships, can you predict what the coordinates might be for \u03C0/8? (You do not need to prove this - just make an educated guess and explain your reasoning.)"),
      createWorkSpace(5),

      // UNIT CIRCLE REFERENCE
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Unit Circle Reference (Fill in as you learn)")] }),
      new Paragraph({ children: [new TextRun({ text: "Complete this unit circle with coordinates for each special angle. This will be your study reference!", italics: true })] }),
      new Paragraph({ children: [] }),

      createUnitCircleTemplate(),

      new Paragraph({ children: [] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Quick Reference: Special Triangle Values")] }),
      createSpecialTrianglesTable()
    ]
  }]
});

// Helper functions
function createInfoBox(title, content) {
  const border = { style: BorderStyle.SINGLE, size: 12, color: "1F4E79" };
  return new Table({
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "E7F3FF", type: ShadingType.CLEAR },
            width: { size: 9360, type: WidthType.DXA },
            children: [
              new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 24, color: "1F4E79" })] }),
              ...content.split('\n').map(line =>
                new Paragraph({ children: [new TextRun({ text: line, size: 20 })] })
              )
            ]
          })
        ]
      })
    ]
  });
}

function createFormulaBox() {
  const border = { style: BorderStyle.SINGLE, size: 8, color: "666666" };
  return new Table({
    columnWidths: [4680, 4680],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "FFF9E6", type: ShadingType.CLEAR },
            width: { size: 4680, type: WidthType.DXA },
            children: [
              new Paragraph({ children: [new TextRun({ text: "Trigonometric Ratios (SOH-CAH-TOA)", bold: true, size: 22 })] }),
              new Paragraph({ children: [new TextRun({ text: "sin(\u03B8) = Opposite / Hypotenuse", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "cos(\u03B8) = Adjacent / Hypotenuse", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "tan(\u03B8) = Opposite / Adjacent", size: 20 })] }),
              new Paragraph({ children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Reciprocal Functions", bold: true, size: 22 })] }),
              new Paragraph({ children: [new TextRun({ text: "csc(\u03B8) = 1/sin(\u03B8) = Hyp/Opp", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "sec(\u03B8) = 1/cos(\u03B8) = Hyp/Adj", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "cot(\u03B8) = 1/tan(\u03B8) = Adj/Opp", size: 20 })] })
            ]
          }),
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "FFF9E6", type: ShadingType.CLEAR },
            width: { size: 4680, type: WidthType.DXA },
            children: [
              new Paragraph({ children: [new TextRun({ text: "Conversion Formulas", bold: true, size: 22 })] }),
              new Paragraph({ children: [new TextRun({ text: "Degrees to Radians:", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "  radians = degrees \u00D7 (\u03C0/180)", size: 20, italics: true })] }),
              new Paragraph({ children: [new TextRun({ text: "Radians to Degrees:", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "  degrees = radians \u00D7 (180/\u03C0)", size: 20, italics: true })] }),
              new Paragraph({ children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Arc Length Formula", bold: true, size: 22 })] }),
              new Paragraph({ children: [new TextRun({ text: "s = r\u03B8", size: 20, italics: true })] }),
              new Paragraph({ children: [new TextRun({ text: "(where \u03B8 is in radians)", size: 18 })] })
            ]
          })
        ]
      })
    ]
  });
}

function createWorkedExample(problem, solution, answer) {
  const border = { style: BorderStyle.SINGLE, size: 8, color: "2E75B6" };
  return new Table({
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "E8F4E8", type: ShadingType.CLEAR },
            width: { size: 9360, type: WidthType.DXA },
            children: [
              new Paragraph({ children: [new TextRun({ text: "WORKED EXAMPLE", bold: true, size: 22, color: "2E75B6" })] }),
              new Paragraph({ children: [new TextRun({ text: "Problem: ", bold: true, size: 20 }), new TextRun({ text: problem, size: 20 })] }),
              new Paragraph({ children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Solution:", bold: true, size: 20 })] }),
              ...solution.split('\n').map(line =>
                new Paragraph({ children: [new TextRun({ text: line, size: 20 })] })
              ),
              new Paragraph({ children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Answer: ", bold: true, size: 20, color: "006600" }), new TextRun({ text: answer, size: 20, bold: true, color: "006600" })] })
            ]
          })
        ]
      })
    ]
  });
}

function createProblem(number, text) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    children: [
      new TextRun({ text: `Problem ${number}: `, bold: true, size: 22 }),
      new TextRun({ text: text, size: 22 })
    ]
  });
}

function createWorkSpace(lines) {
  const paragraphs = [];
  for (let i = 0; i < lines; i++) {
    paragraphs.push(new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [new TextRun({ text: "_".repeat(85), size: 20, color: "CCCCCC" })]
    }));
  }
  paragraphs.push(new Paragraph({ children: [] }));
  return paragraphs;
}

function createUnitCircleTemplate() {
  const border = { style: BorderStyle.SINGLE, size: 8, color: "000000" };
  return new Table({
    columnWidths: [2340, 2340, 2340, 2340],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "E8F4E8", type: ShadingType.CLEAR },
            width: { size: 2340, type: WidthType.DXA },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Quadrant II", bold: true, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "2\u03C0/3: (_____, _____)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "3\u03C0/4: (_____, _____)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "5\u03C0/6: (_____, _____)", size: 18 })] })
            ]
          }),
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "E8F4E8", type: ShadingType.CLEAR },
            width: { size: 2340, type: WidthType.DXA },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Quadrant I", bold: true, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "\u03C0/6: (_____, _____)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "\u03C0/4: (_____, _____)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "\u03C0/3: (_____, _____)", size: 18 })] })
            ]
          }),
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            width: { size: 2340, type: WidthType.DXA },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Axis Points", bold: true, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "0: (1, 0)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "\u03C0/2: (_____, _____)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "\u03C0: (_____, _____)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "3\u03C0/2: (_____, _____)", size: 18 })] })
            ]
          }),
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            width: { size: 2340, type: WidthType.DXA },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sign Patterns", bold: true, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "QI: (+, +)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "QII: (-, +)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "QIII: (-, -)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "QIV: (+, -)", size: 18 })] })
            ]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "FFF0F0", type: ShadingType.CLEAR },
            width: { size: 2340, type: WidthType.DXA },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Quadrant III", bold: true, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "7\u03C0/6: (_____, _____)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "5\u03C0/4: (_____, _____)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "4\u03C0/3: (_____, _____)", size: 18 })] })
            ]
          }),
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            shading: { fill: "FFF0F0", type: ShadingType.CLEAR },
            width: { size: 2340, type: WidthType.DXA },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Quadrant IV", bold: true, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "5\u03C0/3: (_____, _____)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "7\u03C0/4: (_____, _____)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "11\u03C0/6: (_____, _____)", size: 18 })] })
            ]
          }),
          new TableCell({
            columnSpan: 2,
            borders: { top: border, bottom: border, left: border, right: border },
            width: { size: 4680, type: WidthType.DXA },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\"All Students Take Calculus\"", bold: true, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "QI: All positive (sin+, cos+, tan+)", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "QII: Sine positive only", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "QIII: Tangent positive only", size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: "QIV: Cosine positive only", size: 18 })] })
            ]
          })
        ]
      })
    ]
  });
}

function createSpecialTrianglesTable() {
  const border = { style: BorderStyle.SINGLE, size: 8, color: "000000" };
  return new Table({
    columnWidths: [1560, 1560, 1560, 1560, 1560, 1560],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Angle", bold: true, size: 20 })] })] }),
          new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Radians", bold: true, size: 20 })] })] }),
          new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "sin", bold: true, size: 20 })] })] }),
          new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "cos", bold: true, size: 20 })] })] }),
          new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "tan", bold: true, size: 20 })] })] }),
          new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, width: { size: 1560, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(x, y)", bold: true, size: 20 })] })] })
        ]
      }),
      createTrigRow("30\u00B0", "\u03C0/6", "1/2", "\u221A3/2", "\u221A3/3", "(\u221A3/2, 1/2)", border),
      createTrigRow("45\u00B0", "\u03C0/4", "\u221A2/2", "\u221A2/2", "1", "(\u221A2/2, \u221A2/2)", border),
      createTrigRow("60\u00B0", "\u03C0/3", "\u221A3/2", "1/2", "\u221A3", "(1/2, \u221A3/2)", border),
      createTrigRow("90\u00B0", "\u03C0/2", "1", "0", "undef", "(0, 1)", border)
    ]
  });
}

function createTrigRow(deg, rad, sin, cos, tan, coords, border) {
  return new TableRow({
    children: [
      new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, width: { size: 1560, type: WidthType.DXA },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: deg, size: 20 })] })] }),
      new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, width: { size: 1560, type: WidthType.DXA },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: rad, size: 20 })] })] }),
      new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, width: { size: 1560, type: WidthType.DXA },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: sin, size: 20 })] })] }),
      new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, width: { size: 1560, type: WidthType.DXA },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: cos, size: 20 })] })] }),
      new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, width: { size: 1560, type: WidthType.DXA },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tan, size: 20 })] })] }),
      new TableCell({ borders: { top: border, bottom: border, left: border, right: border }, width: { size: 1560, type: WidthType.DXA },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: coords, size: 18 })] })] })
    ]
  });
}

// Generate the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/franklyles/Documents/Claude Stuff/Disciplines/precal/week_1/Week_1_PreCal_Classwork.docx", buffer);
  console.log("Classwork document created successfully!");
});
