<script setup>
import { ref, onMounted } from 'vue';
import {db,  collection,Timestamp, query, onSnapshot, setDoc, getDoc, getDocs, addDoc, deleteDoc, updateDoc, doc } from '@/firebase/index.js';

const data = ref([])
console.log(data,'data');
// Form Field Data
const FormData = ref({
  student_fname: null,
  student_lname: null,
  department: null,
  year_level: null,
  status: null,
});

// Get the Data Real Time
const renderData = async () => {
 try{
   const queryData = collection(db, "student");
  const querySnapshot = await getDocs(queryData);

    querySnapshot.forEach((item) => {
      const dateTimestamp = item.data().date_enrolled;
        if (dateTimestamp && typeof dateTimestamp.seconds === 'number' && typeof dateTimestamp.nanoseconds === 'number') {

      const date = new Date(dateTimestamp.seconds * 1000 + dateTimestamp.nanoseconds / 1e6);
         const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric',  year: 'numeric' });

      const student = {
        id: item.id,
        student_fname: item.data().student_fname,
        student_lname: item.data().student_lname,
        department: item.data().department,
        year_level: item.data().year_level,
        status: item.data().status,
        date_enrolled: formattedDate
      }
      data.value.push(student);
        console.log(student,'data2');
        } else {
    console.warn('Invalid or missing date_enrolled field in the Firestore document:', item.id);
  }

    });


 } catch(e){
console.error(e);
 }
};

// Add New Data
const addStudentData = async () => {
  FormData.value.status = false;

  const response = await addDoc(collection(db, "student"), {
    student_fname: FormData.value.student_fname,
    student_lname: FormData.value.student_lname,
    department: FormData.value.department,
    year_level: FormData.value.year_level,
    status: FormData.value.status,
    date_enrolled: Timestamp
  });

  console.log(response.id);

  if (response.id) {
    alert('Added new task!');

    FormData.value.student_fname = null;
    FormData.value.student_lname = null;
    FormData.value.department = null;
    FormData.value.year_level = null;
    FormData.value.status = null;
  }
};

// Update Student Record
const updateStudentRecord = async (id, status) => {
  if(status === false) {
    await updateDoc(doc(db, 'student', id),{status: true});
    console.log("Updated student record.");
     window.alert('Todo Application updated successfully!');
  }
};

// Delete Student Record
const deleteStudentData = async (id) => {
  const querryData = doc(db, 'student', id);
  deleteDoc(querryData)
    .then(() => {
      alert('Student record deleted.');
    })
    .catch((error) => {
      alert('Error deleting record:', error);
    });
};

// To call the renderData upon loading
onMounted(() => {
  renderData();
});

</script>

<template>
  <section class="container">
    <div class="form-container">
      <form @submit.prevent="addStudentData">
        <h1>Student Form</h1>
        <div class="input-container">
          <input v-model="FormData.student_fname" type="text" placeholder="First Name">
          <input v-model="FormData.student_lname" type="text" placeholder="Last Name">
          <input v-model="FormData.department" type="text" placeholder="Department">
          <input v-model="FormData.year_level" type="text" placeholder="Year Level">
        </div>
        <input class="button" type="submit" value="Add Student">
      </form>
    </div>

    <!-- Display Data in the Table -->
    <table>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Department</th>
        <th>Year Level</th>
        <th>Date Enrolled</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      <tr :class="student.status ? 'green' : 'red'" v-for="student in data" :key="student.fname">
        <td>{{ student.student_fname }}</td>
        <td>{{ student.student_lname }}</td>
        <td>{{ student.department }}</td>
        <td>{{ student.year_level }}</td>
        <td>{{ student.date_enrolled }}</td>
        <td>{{ student.status ? 'Enrolled' : 'Not Enrolled' }}</td>
        <td>
          <button class="btn btn-danger" type="buton" :disabled="student.status === true" @click="updateStudentRecord(student.id, student.status)">Mark as enrolled</button>
          <!-- Delete Button -->
          <button class="btn btn-wargning" type="buton"  @click="deleteStudentData(student.id)">Delete</button>
          <!-- <p>Enrolled</p> -->
        </td>
      </tr>
    </table>
  </section>
</template>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.container {
  width: 1000px;
  margin: 0 auto;
}

.form-container {
  background: #D9D9D9;
  margin-bottom: 16px;
}

.form-container > form {
  padding: 24px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.button {
  background: #202020;
  margin-top: 12px;
  padding: 14px 32px;
  outline: none;
  border: none;
  border-radius:  9px;
  color: #FFF;
  cursor: pointer;
}
.button:hover {
  background: #333333;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>