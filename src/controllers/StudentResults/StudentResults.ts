const studentResultsSchema = require("../../models/StudentResults/StudentResults");
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
exports.uploadResults = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
      }

      try {
        const filePath = path.join(__dirname, '../../../', 'uploads', req.file.filename);
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        const result = await studentResultsSchema.insertMany(data);
        fs.unlinkSync(filePath);
        res.status(200).json({
          message: 'Student Results uploaded successfully!',
          insertedCount: result.length,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading student results');
      }
};

exports.getStudentResults = async (req, res, next) => {
  try {
    const results = await studentResultsSchema.find();
    const calculatedResults = await results.map((student) => {
      const totalMarks = Number(student?.telugu) + Number(student?.english) + Number(student?.math) + Number(student?.science) + Number(student?.social) + Number(student?.hindi);
      const percentage = Math.round((totalMarks / 600) * 100);
      return {
        studentId: student.studentId,
        studentName: student.studentName,
        studentEmail: student.studentEmail,
        studentPhone: student.studentPhone,
        telugu: student.telugu,
        english: student.english,
        math: student.math,
        science: student.science,
        social: student.social,
        hindi: student.hindi,
        totalMarks: totalMarks,
        percentage: percentage
      };
    })
   await res.status(200).json({
      message: "Results fetched successfully!",
      data: calculatedResults,
    });
  } catch (err) {
      res.status(500).json({
          message: "Error fetching results!",
          data: err,
      });
  }
};

exports.getStudentResult = async (req, res, next) => {

  try {
    const studentId = req.query.studentId;
    const results = await studentResultsSchema.find({ studentId: studentId });
    const calculatedResults = await results.map((student) => {
      const totalMarks = Number(student?.telugu) + Number(student?.english) + Number(student?.math) + Number(student?.science) + Number(student?.social) + Number(student?.hindi);
      const percentage = Math.round((totalMarks / 600) * 100);
      return {
        studentId: student.studentId,
        studentName: student.studentName,
        studentEmail: student.studentEmail,
        studentPhone: student.studentPhone,
        telugu: student.telugu,
        english: student.english,
        math: student.math,
        science: student.science,
        social: student.social,
        hindi: student.hindi,
        totalMarks: totalMarks,
        percentage: percentage
      };
    });
   await res.status(200).json({
      message: "Result fetched successfully!",
      data: calculatedResults?.[0],
    });
  } catch (err) {
      res.status(500).json({
          message: "Error fetching results!",
          data: err,
      });
  }
  
};