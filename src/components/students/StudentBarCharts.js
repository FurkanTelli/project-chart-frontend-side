import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import "./style.css";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StudentBarCharts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [allStudents, setAllStudents] = useState([]);
    const [studentNames, setStudentNames] = useState([]);
    const [studentsGrades, setStudentGrades] = useState([]);



    const tableData = {

        labels: studentNames,
        datasets: [
            {
                label: "Öğrenciler",
                data: studentsGrades,
                backgroundColor: "rgba(21, 219, 186, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    useEffect(() => {
        const user = Cookies.get('username')
        const password = Cookies.get('password')
        const database = Cookies.get('database')
        const server = Cookies.get('database')
        if (!user) {
            navigate("/");
        } else {
            const getAllStudents = async () => {
                try {
                    const data = await axios.post("http://localhost:7000/allStudents", { user, password, database, server });
                    if (data.status === 200) {
                        const students = data.data
                        const sortedStudentObjects = students.sort((a, b) => a.std_id - b.std_id);
                        setAllStudents(sortedStudentObjects);
                        setStudentNames(students.map(student => student.std_fullName))
                        setStudentGrades(students.map(student => student.student_grade))
                    }

                } catch (error) {
                    console.log(error)
                }
            }
            getAllStudents()
        }
    }, [location])


    return (
        <div className='chart'>
            <Bar data={tableData} options={options} />
        </div>
    )
}

export default StudentBarCharts