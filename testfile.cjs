const {getAllStudentsDB, getStudentByIdDB, insertStudentDB, updateStudentDB, deleteStudentByIdDB} = require("./models/studentData.js");

const  test = async() => {
    const students = await getAllStudentsDB();
    console.log("Students")
    console.log(students);
    
    const student1 = await getStudentByIdDB(1);
    console.log("Student 1: ");
    
    console.log(student1);

    console.log("New student")
    const [newStudent] = await insertStudentDB("John Smith", 1505.75);
    console.log(newStudent);
    console.log("Updated");
    
    const updated = await updateStudentDB(newStudent.id, "Bob Hope", 2000);
    console.log(updated);
    console.log(("All students predelete"));
    
    const newList = await getAllStudentsDB();
    console.log(newList);
    console.log("Deleting");
    
    const deletedStudent = await deleteStudentByIdDB(newStudent.id);
    console.log(deletedStudent);
    
}

test();
