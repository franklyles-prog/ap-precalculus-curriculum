# Master Coordination Template for Content Creation Agents

## Purpose
This document ensures all content creation agents (classwork-creator, homework-creator, presenter-creator, test-creator) produce consistent, aligned materials for AP Precalculus.

---

## Universal Standards & Guidelines

### Student Profile
- **Grade Level**: 12th grade seniors
- **Course**: AP Precalculus
- **ACT Math Score Range**: 15-22 (below average to average)
- **Needs**: Scaffolding, remediation, visual aids, frequent review

### Content Alignment
- **AR Standards**: Reference `Disciplines/precal/standards/AR_Secondary_Math_Standards_2023_LS 2.docx`
- **AP Precalculus Framework**: All content must align to AP Precalculus standards (PC.TR.1 - PC.TR.10 for trigonometry)
- **Semester Curriculum**: Reference `Disciplines/precal/AP_Precalculus_Semester_Curriculum_Spring2026.md`
- **School Calendar**: Reference `Disciplines/precal/Spring_2026_AP_Precalculus_Calendar.md`

---

## Consistent Formatting Conventions

### Numbering System (ALL AGENTS MUST USE THIS)
- **Classwork Problems**: "Problem 1, Problem 2, Problem 3..."
- **Homework Problems**: "Problem 1, Problem 2, Problem 3..." (continues classwork numbering context but in separate assignment)
- **Slide Questions**: "Example 1, Example 2, Practice Problem 1, Practice Problem 2..."
- **Assessment Items**: "Question 1, Question 2, Question 3..."

### Difficulty Progression (ALL MATERIALS)
1. **Part A (Basic)**: 40% - Direct application, procedural
2. **Part B (Intermediate)**: 40% - Multi-step, conceptual understanding
3. **Part C (Advanced)**: 20% - Complex problem-solving, connections

### Problem Complexity for ACT 15-22 Students
- **Scaffolding Required**: Break complex problems into steps
- **Visual Aids**: Include diagrams, unit circles, graphs
- **Worked Examples**: Provide model solutions
- **Common Errors**: Address typical misconceptions
- **ACT Integration**: Include ACT-style problems regularly

---

## File Naming Conventions (CRITICAL - PREVENTS CONFLICTS)

### Weekly Materials Format
```
Week_#_CourseName_MaterialType.extension

Examples:
Week_1_PreCal_Classwork.docx
Week_1_PreCal_Homework.docx
Week_1_PreCal_Slides.pptx
Week_1_PreCal_Assessment.docx
Week_2_PreCal_Classwork.docx
```

### Supporting Materials Format
```
Week_#_CourseName_MaterialType_Description.extension

Examples:
Week_1_PreCal_Reference_UnitCircle.pdf
Week_1_PreCal_Handout_ConversionFormulas.docx
Week_1_PreCal_Key_ClassworkSolutions.docx
```

---

## Content Cross-Referencing

### How Agents Should Reference Each Other's Work

**Classwork-creator** (runs FIRST in parallel group):
- Creates: Daily practice problems
- No references needed (foundation document)

**Homework-creator** (runs FIRST in parallel group):
- Creates: Weekly homework
- References: "Building on Problem 3 from class..."
- Can reference lesson plan topics but not specific classwork problem numbers (since parallel)

**Presenter-creator** (runs FIRST in parallel group):
- Creates: Lesson slides
- References: Lesson plan content, standards
- Includes practice problems that complement classwork

**Test-creator** (runs SECOND after parallel group):
- Creates: Formative assessments, exit tickets, quizzes
- References: ALL previous materials
- Uses format: "Similar to Homework Problem 5..." or "From Slide 12..."

---

## Quality Standards

### All Materials Must Include:
1. **Learning Objectives**: Clear SWBAT statements
2. **AR Standards Alignment**: Explicit PC.TR.X references
3. **Scaffolding**: Support for struggling learners
4. **Extensions**: Challenges for advanced students
5. **ACT Connection**: ACT practice integration where appropriate

### Document Structure Requirements:
- **Header**: Week #, Date(s), Teacher: Lyles, Course: AP Precalculus
- **Standards**: Clearly listed
- **Answer Keys**: Separate documents with full solutions
- **Differentiation**: Built-in support and extension

---

## Agent-Specific Output Requirements

### @classwork-creator
- **File**: `Week_#_PreCal_Classwork.docx`
- **Content**: 25-35 problems (daily practice for the week)
- **Sections**: Part A (Basic), Part B (Intermediate), Part C (Challenge)
- **Include**: Diagrams, unit circles, graphs as needed
- **Also Creates**: `Week_#_PreCal_Key_Classwork.docx` (answer key)

### @homework-creator
- **File**: `Week_#_PreCal_Homework.docx`
- **Content**: 35-45 problems (weekly homework, due Monday)
- **Sections**: Part A, Part B, Part C, Bonus (+2 points)
- **Include**: Review problems from previous weeks (spiraling)
- **Also Creates**: `Week_#_PreCal_Key_Homework.docx` (answer key)

### @presenter-creator
- **File**: `Week_#_PreCal_Slides.pptx`
- **Content**: Complete slide deck for all sessions that week
- **Sections**: Learning objectives, examples, guided practice, exit ticket
- **Include**: Visual aids, animations, interactive elements
- **Style**: Clean, professional, consistent formatting

### @test-creator
- **File**: `Week_#_PreCal_Assessment.docx`
- **Content**: Exit tickets, quiz, formative assessments
- **Format**: Aligned to lesson plan assessment structure
- **Include**: Multiple formats (selected response, constructed response)
- **Also Creates**: `Week_#_PreCal_Key_Assessment.docx` (answer key with rubrics)

---

## Workflow Coordination

### Phase 1: Parallel Execution (Launch simultaneously)
```
Agent 1: @classwork-creator
Agent 2: @homework-creator
Agent 3: @presenter-creator
```
**Duration**: ~10-15 minutes (concurrent)

### Phase 2: Sequential Execution (Launch after Phase 1 completes)
```
Agent 4: @test-creator (references all Phase 1 outputs)
```
**Duration**: ~8-10 minutes

### Total Time: ~20-25 minutes (vs ~40-50 minutes sequential)

---

## Error Prevention

### File Conflicts Prevention:
✅ Each agent writes to DIFFERENT files (no overlaps)
✅ Use underscores in filenames (not spaces)
✅ All files go to: `/Disciplines/precal/week_#/`

### Content Conflicts Prevention:
✅ Master template defines all conventions BEFORE agents run
✅ All agents reference the same lesson plan
✅ Test-creator runs AFTER others to ensure integration

### Quality Conflicts Prevention:
✅ Curriculum-Strategist reviews all outputs before finalization
✅ Consistent templates and formatting rules
✅ Clear difficulty level guidelines for ACT 15-22 students

---

## Template Last Updated
**Date**: January 2, 2026
**Updated By**: Curriculum-Strategist
**Version**: 1.0

---

## Notes for Future Enhancements
- Consider adding @rubric-creator for detailed grading rubrics
- Consider adding @vocabulary-creator for Science of Reading word lists
- Consider adding @parent-communication-creator for weekly parent updates
- Consider adding @intervention-creator for small group reteaching materials
