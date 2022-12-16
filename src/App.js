import './App.css';
import {React, useEffect, useState} from 'react'
import {Table, Button, Form } from 'react-bootstrap';

const App = () => {
  const [studentData, setStudentData] = useState([]);
  const [labData, setLabData] = useState([]);

  const [newAttendance, setNewAttendance] = useState("");
  const [newExamMark, setNewExamMark] = useState("");
  const [studentIdToDelete, setStudentIdToDelete] = useState("");
  const [studentIdToEdit, setStudentIdToEdit] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newMark, setNewMark] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [labIdToDelete, setLabIdToDelete] = useState("");
  const [labIdToEdit, setLabIdToEdit] = useState("");
  
  useEffect(() => {
    fetch("https://localhost:44356/api/Student")
      .then(res => {
        return res.json();
      })
      .then(data => {
        setStudentData(data);
      })
  }, [studentData]);

  useEffect(() => {
    fetch("https://localhost:44356/api/Lab")
      .then(res => {
        return res.json();
      })
      .then(data => {
        setLabData(data);
      })
  }, [labData]);

  function addNewStudent(e){
    e.preventDefault();
    
    const newStudent = {
      attendance: newAttendance,
      examMark: newExamMark
    }

    fetch("https://localhost:44356/api/Student", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    })
  }

  function addNewLab(e){
    e.preventDefault();
    
    const newLab = {
      title: newTitle,
      date: newDate,
      priority: newPriority,
      status: newStatus,
      mark: newMark,
      StudentID: newStudentId,
    }

    fetch("https://localhost:44356/api/Lab", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLab)
    })
  }

  function deleteStudent(e){
    fetch("https://localhost:44356/api/Student/" + studentIdToDelete, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  function deleteLab(e){
    fetch("https://localhost:44356/api/Lab/" + labIdToDelete, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  function showStudentToEditById(e) {
    e.preventDefault();
    let index = studentData.findIndex(el => el.id==studentIdToEdit);
    document.getElementById("attendance-input").value = studentData[index].attendance;
    document.getElementById("exam-mark-input").value = studentData[index].examMark;
  }

  function showLabToEditById(e) {
    e.preventDefault();
    let index = labData.findIndex(el => el.id==labIdToEdit);
    document.getElementById("title-input").value = labData[index].title;
    document.getElementById("date-input").value = labData[index].date;
    document.getElementById("priority-input").value = labData[index].priority;
    document.getElementById("status-input").value = labData[index].status;
    document.getElementById("mark-input").value = labData[index].mark;
    document.getElementById("student-id-input").value = labData[index].studentID;
  }

  function editStudent(e){
    e.preventDefault();
    
    const editedStudent = {
      id: studentIdToEdit,
      attendance: newAttendance,
      examMark: newExamMark
    }

    fetch("https://localhost:44356/api/Student", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedStudent)
    })
    .then(res => {
      return res.json()
    })
    .then(data => console.log(data))
  }

  function editLab(e){
    e.preventDefault();
    
    const editedLab = {
      id: labIdToEdit,
      title: newTitle,
      date: newDate,
      priority: newPriority,
      status: newStatus,
      mark: newMark,
      studentID: newStudentId
    }

    fetch("https://localhost:44356/api/Lab", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedLab)
    })
    .then(res => {
      return res.json()
    })
    .then(data => console.log(data))
  }

  function findLabsMark(id) {
    let labsMark=0;
    labData.forEach(el => {
      if(el.studentID == id) {
        labsMark += el.mark;
      }
    }) 
    return labsMark;
  }

  return (
    <div className='d-flex flex-column'>
    <h1>Students</h1>
    <div className='d-flex justify-content-evenly'>
      <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Attendance</th>
                <th>Exam Mark</th>
                <th>Final Mark</th>
              </tr>                         
            </thead>
            <tbody>  
              {studentData && studentData.map((s) => {
                return (
                    <tr>
                      <td>{s.id}</td>
                      <td>{s.attendance}</td>
                      <td>{s.examMark}</td>
                      <td>{findLabsMark(s.id)+s.examMark}</td>
                    </tr>
                  )            
                }
              )}               
            </tbody>
          </Table>
        </div>

      <Form className='d-flex flex-column mb-3'>
      <Form.Group className="mb-3">
        <Form.Label>Attendance</Form.Label>
        <Form.Control id="attendance-input" type="text" placeholder="Enter the attendance" onChange={(e) => setNewAttendance(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Exam Mark</Form.Label>
        <Form.Control id="exam-mark-input" type="text" placeholder="Enter exam mark" onChange={(e) => setNewExamMark(e.target.value)} />
      </Form.Group>

      <div className='d-flex justify-content-evenly'>
        <Button variant="success" type="button" onClick={addNewStudent}>
          Add
        </Button>

        <Button variant="success" type="button" onClick={editStudent}>
          Edit
        </Button>
      </div>

    </Form>

      <Form className='d-flex flex-column mb-3'>
        <Form.Group className="d-flex flex-column mb-3" >
          <Form.Label>Student Id to Edit</Form.Label>
          <Form.Control type="text" placeholder="Enter student id to edit" onChange={(e) => setStudentIdToEdit(e.target.value)}/>

          <br></br>

          <Button variant="success" type="submit" onClick={showStudentToEditById}>
            OK
          </Button>
        </Form.Group>
      </Form>

      <Form className='d-flex flex-column mb-3'>
        <Form.Group className="d-flex flex-column mb-3" controlId="formIdToDelete">
          <Form.Label>Student Id to Delete</Form.Label>
          <Form.Control type="text" placeholder="Enter student id to delete" onChange={(e) => setStudentIdToDelete(e.target.value)}/>

          <br></br>

          <Button variant="success" type="submit" onClick={deleteStudent}>
            Delete
          </Button>
        </Form.Group>
      </Form>
      
    </div>
    <h1>Labs</h1>
    <div className='d-flex justify-content-evenly'>
      <div>
      <Table striped bordered hover>
      <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Mark</th>
                <th>Student Id</th>
              </tr>                         
            </thead>
            <tbody>  
              {labData && labData.map((l) => {
                return (
                    <tr>
                      <td>{l.id}</td>
                      <td>{l.title}</td>
                      <td>{l.date}</td>
                      <td>{l.priority}</td>
                      <td>{l.status}</td>
                      <td>{l.mark}</td>
                      <td>{l.studentID}</td>
                    </tr>
                  )            
                }
              )}               
            </tbody>
      </Table>
      </div>
      
      <div>
      <Form className='d-flex flex-column mb-3'>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control id="title-input" type="text" placeholder="Enter the title" onChange={(e) => setNewTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control id="date-input" type="text" placeholder="Enter the date" onChange={(e) => setNewDate(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Priority</Form.Label>
          <Form.Control id="priority-input" type="text" placeholder="Enter the priority" onChange={(e) => setNewPriority(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control id="status-input" type="text" placeholder="Enter the status" onChange={(e) => setNewStatus(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mark</Form.Label>
          <Form.Control id="mark-input" type="text" placeholder="Enter the mark" onChange={(e) => setNewMark(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Student Id</Form.Label>
          <Form.Control id="student-id-input" type="text" placeholder="Enter student id" onChange={(e) => setNewStudentId(e.target.value)} />
        </Form.Group>

        <div className='d-flex justify-content-evenly'>
        <Button variant="success" type="button" onClick={addNewLab}>
          Add
        </Button>

        <Button variant="success" type="button" onClick={editLab}>
          Edit
        </Button>
      </div>
      </Form>
      </div>

      <Form className='d-flex flex-column mb-3'>
        <Form.Group className="d-flex flex-column mb-3" >
          <Form.Label>Lab Id to Edit</Form.Label>
          <Form.Control type="text" placeholder="Enter lab id to edit" onChange={(e) => setLabIdToEdit(e.target.value)}/>

          <br></br>

          <Button variant="success" type="submit" onClick={showLabToEditById}>
            OK
          </Button>
        </Form.Group>
      </Form>
      
      <Form className='d-flex flex-column mb-3'>
        <Form.Group className="d-flex flex-column mb-3" controlId="formIdToDelete">
          <Form.Label>Lab Id to Delete</Form.Label>
          <Form.Control type="text" placeholder="Enter lab id to delete" onChange={(e) => setLabIdToDelete(e.target.value)}/>

          <br></br>

          <Button variant="success" type="submit" onClick={deleteLab}>
            Delete
          </Button>
        </Form.Group>
      </Form>
      
      
    </div>
    </div>
  )
}

export default App
