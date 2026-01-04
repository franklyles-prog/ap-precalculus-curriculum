const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType,
        HeadingLevel, BorderStyle, WidthType, ShadingType, VerticalAlign, LevelFormat } = require('docx');

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: "1F497D", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal",
        run: { size: 32, bold: true, color: "2E75B6", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal",
        run: { size: 28, bold: true, color: "4472C4", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [
      { reference: "problem-list",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      // Header
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun("AP Precalculus Classwork - Week 1")]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [new TextRun({ text: "Right Triangle Trig & Introduction to Radians", italics: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Sessions: January 7 & 9, 2026", italics: true, size: 20 })]
      }),

      // Standards
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({ text: "Standards: PC.TR.1 (Radian measure), PC.TR.2 (Radian/Degree conversion), PC.TR.3 (Unit circle), PC.TR.4 (Special angles)", italics: true, size: 20 })]
      }),

      // Learning Objectives
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Learning Objectives (SWBAT):")]
      }),
      new Paragraph({
        numbering: { reference: "problem-list", level: 0 },
        children: [new TextRun("Apply SOH-CAH-TOA to solve right triangles")]
      }),
      new Paragraph({
        numbering: { reference: "problem-list", level: 0 },
        children: [new TextRun("Convert angle measures between degrees and radians")]
      }),
      new Paragraph({
        numbering: { reference: "problem-list", level: 0 },
        children: [new TextRun("Identify and evaluate special angles (30°, 45°, 60°) on the unit circle")]
      }),
      new Paragraph({
        numbering: { reference: "problem-list", level: 0 },
        children: [new TextRun("Understand radians as arc length on the unit circle")]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("")] }),

      // Reference Box - Formulas
      createReferenceBox(),

      new Paragraph({ spacing: { after: 300 }, children: [new TextRun("")] }),

      // PART A
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("PART A: BASIC SKILLS (Procedural Fluency) - 40%")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "These problems use direct application of SOH-CAH-TOA and basic conversions. Target: 80%+ accuracy", italics: true, size: 20 })]
      }),

      // Worked Example A
      new Paragraph({
        spacing: { before: 120, after: 120 },
        children: [new TextRun({ text: "Worked Example A: Right Triangle Trig", bold: true, color: "2E75B6" })]
      }),
      createWorkedExampleA(),

      new Paragraph({ spacing: { after: 150 }, children: [new TextRun("")] }),

      // Problems 1-15
      ...createPartAProblems(),

      new Paragraph({ spacing: { after: 250 }, children: [new TextRun("")] }),

      // PART B
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("PART B: INTERMEDIATE SKILLS (Conceptual Understanding) - 40%")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "These problems require combining concepts and solving multi-step problems. Target: 60-70% accuracy", italics: true, size: 20 })]
      }),

      // Worked Example B
      new Paragraph({
        spacing: { before: 120, after: 120 },
        children: [new TextRun({ text: "Worked Example B: Arc Length Application", bold: true, color: "2E75B6" })]
      }),
      createWorkedExampleB(),

      new Paragraph({ spacing: { after: 150 }, children: [new TextRun("")] }),

      // Problems 16-30
      ...createPartBProblems(),

      new Paragraph({ spacing: { after: 250 }, children: [new TextRun("")] }),

      // PART C
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("PART C: CHALLENGE PROBLEMS (Critical Thinking & Extensions) - 20%")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "These problems require deeper thinking and connections to other concepts. Target: 40-50% accuracy is acceptable - this is growth!", italics: true, size: 20 })]
      }),

      // Problems 31-35
      ...createPartCProblems(),

      new Paragraph({ spacing: { after: 150 }, children: [new TextRun("")] }),

      // Footer
      new Paragraph({ spacing: { before: 300, after: 0 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Remember: Show all your work for partial credit. Mathematics is about process, not just answers!", italics: true, size: 20 })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/franklyles/Documents/Claude Stuff/Disciplines/precal/week_1/Week_1_PreCal_Classwork.docx", buffer);
  console.log("Classwork document created successfully!");
});

// Helper function for reference box
function createReferenceBox() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "4472C4" };
  const borders = { top: border, bottom: border, left: border, right: border };

  return new Table({
    columnWidths: [9360],
    margins: { top: 100, bottom: 100, left: 180, right: 180 },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: borders,
            shading: { fill: "D9E9F7", type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "FORMULA REFERENCE - Keep this handy!", bold: true, color: "2E75B6" })]
              }),
              new Paragraph({ spacing: { after: 100 }, children: [new TextRun("")] }),
              new Paragraph({
                spacing: { after: 80 },
                children: [new TextRun({ text: "Right Triangle Trigonometry:", bold: true })]
              }),
              new Paragraph({
                spacing: { after: 40 },
                indent: { left: 360 },
                children: [new TextRun("sin(θ) = opposite / hypotenuse      cos(θ) = adjacent / hypotenuse      tan(θ) = opposite / adjacent")]
              }),
              new Paragraph({
                spacing: { after: 160 },
                indent: { left: 360 },
                children: [new TextRun({ text: "(SOH-CAH-TOA)", italics: true })]
              }),
              new Paragraph({
                spacing: { after: 80 },
                children: [new TextRun({ text: "Degree to Radian Conversion:", bold: true })]
              }),
              new Paragraph({
                spacing: { after: 40 },
                indent: { left: 360 },
                children: [new TextRun("Radians = Degrees × (π/180)      Degrees = Radians × (180/π)")]
              }),
              new Paragraph({
                spacing: { after: 100 },
                children: [new TextRun("")] })
            ]
          })
        ]
      })
    ]
  });
}

// Worked Example A
function createWorkedExampleA() {
  const exampleBox = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const exampleBorders = { top: exampleBox, bottom: exampleBox, left: exampleBox, right: exampleBox };

  return new Table({
    columnWidths: [9360],
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: exampleBorders,
            shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                indent: { left: 360 },
                spacing: { after: 80 },
                children: [new TextRun("In a right triangle, the side opposite angle θ is 5 units, and the hypotenuse is 13 units. Find sin(θ), cos(θ), and tan(θ).")]
              }),
              new Paragraph({
                indent: { left: 360 },
                spacing: { after: 100 },
                children: [new TextRun({ text: "Solution:", bold: true })]
              }),
              new Paragraph({
                indent: { left: 720 },
                spacing: { after: 60 },
                children: [new TextRun("Step 1: Identify the sides")]
              }),
              new Paragraph({
                indent: { left: 1080 },
                spacing: { after: 80 },
                children: [new TextRun("Opposite = 5, Adjacent = 12 (use Pythagorean theorem: 5² + 12² = 13²), Hypotenuse = 13")]
              }),
              new Paragraph({
                indent: { left: 720 },
                spacing: { after: 60 },
                children: [new TextRun("Step 2: Apply SOH-CAH-TOA")]
              }),
              new Paragraph({
                indent: { left: 1080 },
                spacing: { after: 40 },
                children: [new TextRun("sin(θ) = opposite/hypotenuse = 5/13")]
              }),
              new Paragraph({
                indent: { left: 1080 },
                spacing: { after: 40 },
                children: [new TextRun("cos(θ) = adjacent/hypotenuse = 12/13")]
              }),
              new Paragraph({
                indent: { left: 1080 },
                spacing: { after: 120 },
                children: [new TextRun("tan(θ) = opposite/adjacent = 5/12")]
              }),
              new Paragraph({
                indent: { left: 360 },
                spacing: { after: 60 },
                children: [new TextRun({ text: "Answer: sin(θ) = 5/13,  cos(θ) = 12/13,  tan(θ) = 5/12", bold: true })]
              }),
              new Paragraph({
                indent: { left: 360 },
                spacing: { after: 0 },
                children: [new TextRun({ text: "Common Error to Avoid: Don't confuse 'opposite' and 'adjacent' - always label relative to angle θ!", italics: true, color: "C00000" })]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Part A Problems
function createPartAProblems() {
  const problems = [];

  const partAProblems = [
    { num: 1, text: "In a right triangle, sin(θ) = 3/5. What is cos(θ)?" },
    { num: 2, text: "Convert 45° to radians." },
    { num: 3, text: "Convert π/6 radians to degrees." },
    { num: 4, text: "In a right triangle with opposite side = 7 and hypotenuse = 25, find sin(θ)." },
    { num: 5, text: "Convert 90° to radians." },
    { num: 6, text: "In a right triangle with adjacent side = 8 and hypotenuse = 17, find cos(θ)." },
    { num: 7, text: "Convert 3π/4 radians to degrees." },
    { num: 8, text: "If tan(θ) = 5/12, and this is a right triangle, what is sin(θ)?" },
    { num: 9, text: "Convert 120° to radians." },
    { num: 10, text: "In a right triangle with opposite = 3 and adjacent = 4, find tan(θ)." },
    { num: 11, text: "Convert 2π/3 radians to degrees." },
    { num: 12, text: "What is sin(30°)?" },
    { num: 13, text: "Convert 180° to radians." },
    { num: 14, text: "What is cos(60°)?" },
    { num: 15, text: "Convert π radians to degrees." }
  ];

  partAProblems.forEach(p => {
    problems.push(
      new Paragraph({
        numbering: { reference: "problem-list", level: 0 },
        spacing: { after: 40 },
        children: [new TextRun(p.text)]
      })
    );
    problems.push(
      new Paragraph({
        indent: { left: 720 },
        spacing: { after: 120 },
        children: [new TextRun("Answer: ___________________________")]
      })
    );
  });

  return problems;
}

// Worked Example B
function createWorkedExampleB() {
  const exampleBox = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const exampleBorders = { top: exampleBox, bottom: exampleBox, left: exampleBox, right: exampleBox };

  return new Table({
    columnWidths: [9360],
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: exampleBorders,
            shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                indent: { left: 360 },
                spacing: { after: 80 },
                children: [new TextRun("A point on the unit circle is located at angle π/4 radians. Find the coordinates (x, y) of this point and calculate the arc length traveled from (1, 0) to this point.")]
              }),
              new Paragraph({
                indent: { left: 360 },
                spacing: { after: 100 },
                children: [new TextRun({ text: "Solution:", bold: true })]
              }),
              new Paragraph({
                indent: { left: 720 },
                spacing: { after: 60 },
                children: [new TextRun("Step 1: Recognize special angle")]
              }),
              new Paragraph({
                indent: { left: 1080 },
                spacing: { after: 80 },
                children: [new TextRun("π/4 radians = 45° (special angle)")]
              }),
              new Paragraph({
                indent: { left: 720 },
                spacing: { after: 60 },
                children: [new TextRun("Step 2: Find coordinates using unit circle")]
              }),
              new Paragraph({
                indent: { left: 1080 },
                spacing: { after: 40 },
                children: [new TextRun("At π/4: x = cos(π/4) = √2/2")]
              }),
              new Paragraph({
                indent: { left: 1080 },
                spacing: { after: 80 },
                children: [new TextRun("At π/4: y = sin(π/4) = √2/2")]
              }),
              new Paragraph({
                indent: { left: 720 },
                spacing: { after: 60 },
                children: [new TextRun("Step 3: Calculate arc length")]
              }),
              new Paragraph({
                indent: { left: 1080 },
                spacing: { after: 40 },
                children: [new TextRun("Arc length = θ × r (where r = 1 on unit circle)")]
              }),
              new Paragraph({
                indent: { left: 1080 },
                spacing: { after: 120 },
                children: [new TextRun("Arc length = π/4 × 1 = π/4 units")]
              }),
              new Paragraph({
                indent: { left: 360 },
                spacing: { after: 60 },
                children: [new TextRun({ text: "Answer: Coordinates = (√2/2, √2/2),  Arc length = π/4 units", bold: true })]
              }),
              new Paragraph({
                indent: { left: 360 },
                spacing: { after: 0 },
                children: [new TextRun({ text: "Common Error to Avoid: Don't confuse radian measure with arc length - on unit circle, they're equal!", italics: true, color: "C00000" })]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Part B Problems
function createPartBProblems() {
  const problems = [];

  const partBProblems = [
    { num: 16, text: "A ladder leans against a wall, making a 50° angle with the ground. If the ladder is 20 feet long, how high does it reach on the wall?" },
    { num: 17, text: "An angle of 2π/3 radians sweeps an arc on a circle with radius 5. What is the arc length?" },
    { num: 18, text: "From the top of a 100-foot building, the angle of depression to a point on the ground is 25°. How far is that point from the base of the building?" },
    { num: 19, text: "A radian measure of π/6 corresponds to what degree measure? If this angle is on a circle with radius 12, what is the arc length?" },
    { num: 20, text: "In a right triangle, one acute angle is 35° and the hypotenuse is 50 meters. Find both legs of the triangle." },
    { num: 21, text: "A Ferris wheel has a radius of 30 feet. If a passenger sits at an angle of π/3 radians from the starting position, what arc length has the wheel rotated?" },
    { num: 22, text: "Convert the following angles: (a) 225° to radians, (b) 5π/6 radians to degrees. Then explain which quadrant each angle is in." },
    { num: 23, text: "A surveyor measures the angle of elevation to the top of a building as 40° from 150 feet away. How tall is the building?" },
    { num: 24, text: "Given: cos(θ) = 3/5 in a right triangle. Find sin(θ) and tan(θ). (Hint: Use Pythagorean theorem)" },
    { num: 25, text: "A pendulum swings through an angle of 3π/8 radians. If the pendulum is 2 meters long, what distance does the bob travel?" },
    { num: 26, text: "Two angles measure 120° and 4π/3 radians. Are they equivalent? Explain why or why not." },
    { num: 27, text: "A 16-foot ramp makes a 20° angle with the horizontal. What is the vertical rise and horizontal distance?" },
    { num: 28, text: "If sin(θ) = 7/25, find cos(θ) and tan(θ) in the same right triangle." },
    { num: 29, text: "ACT Practice: A sector of a circle with radius 4 has a central angle of π/3. What is the perimeter of this sector?" },
    { num: 30, text: "An angle of 1 radian sweeps an arc on a circle. If the arc length is 8 cm, what is the radius of the circle?" }
  ];

  partBProblems.forEach(p => {
    problems.push(
      new Paragraph({
        numbering: { reference: "problem-list", level: 0 },
        spacing: { after: 40 },
        children: [new TextRun(p.text)]
      })
    );
    problems.push(
      new Paragraph({
        indent: { left: 720 },
        spacing: { after: 120 },
        children: [new TextRun("Work:")]
      })
    );
    problems.push(
      new Paragraph({
        indent: { left: 720 },
        spacing: { after: 160 },
        children: [new TextRun("")]
      })
    );
  });

  return problems;
}

// Part C Problems
function createPartCProblems() {
  const problems = [];

  const partCProblems = [
    { num: 31, text: "Prove: For any angle θ on the unit circle, sin²(θ) + cos²(θ) = 1. (Hint: Use the Pythagorean theorem and the definition of sin/cos)" },
    { num: 32, text: "Why is the radian a 'natural' unit for mathematics compared to degrees? Consider what happens in the formula Arc Length = θ × r." },
    { num: 33, text: "Find the exact value of sin(15°) by using the fact that 15° = 45° - 30°. (Hint: This will be important when we study angle difference formulas)" },
    { num: 34, text: "ACT Challenge: A circle has radius 6 cm. An angle of π/2.5 radians creates a sector. Find: (a) the degree measure, (b) the arc length, (c) the sector area. Then find the percentage of the circle covered by this sector." },
    { num: 35, text: "Extension: Consider a 3D scenario. A cone has a height of 10 and a base radius of 4. The slant height creates an angle with the base. Find this angle in both radians and degrees, then find the arc length if the slant height were wrapped around the base circle." }
  ];

  partCProblems.forEach(p => {
    problems.push(
      new Paragraph({
        numbering: { reference: "problem-list", level: 0 },
        spacing: { after: 40 },
        children: [new TextRun(p.text)]
      })
    );
    problems.push(
      new Paragraph({
        indent: { left: 720 },
        spacing: { after: 200 },
        children: [new TextRun("Work:")]
      })
    );
  });

  return problems;
}
