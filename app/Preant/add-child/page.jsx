/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddChild() {

  const router = useRouter();

  const [parentId, setParentId] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    class1: "",
    section: ""
  });


  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);



  useEffect(() => {

    const parent = JSON.parse(localStorage.getItem("Parent"));

    if(parent){
      setParentId(parent.id);
    }

  }, []);



  const getFilters = async () => {

    try{

      const res = await fetch("/api/Teacher/student-filters");

      const data = await res.json();

      setClasses(data.classes || []);
      setSections(data.sections || []);

    }catch(error){

      console.log(error);

    }

  };


  useEffect(() => {

    getFilters();

  }, []);




  const handleChange = (e)=>{

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  };




  const handleSubmit = async(e)=>{

    e.preventDefault();


    if(!parentId){

      alert("Parent login required");
      return;

    }



    try{


      const res = await fetch("/api/ParentRegistar/add-child",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          parentId,

          ...formData

        })

      });



      const data = await res.json();



      if(res.ok){

        alert("Child Added Successfully");

        router.push("/Preant/MyStudent");

      }
      else{

        alert(data.message || "Something went wrong");

      }



    }catch(error){

      console.log(error);

      alert("Server Error");

    }


  }





return (

<div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">


<div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">


<h1 className="text-3xl font-bold mb-6 text-center">
Add Child
</h1>



<form 
onSubmit={handleSubmit}
className="space-y-5"
>


<input
type="text"
name="studentName"
placeholder="Student Name"
value={formData.studentName}
onChange={handleChange}
className="w-full border p-3 rounded-xl"
/>



<input
type="number"
name="rollNumber"
placeholder="Roll Number"
value={formData.rollNumber}
onChange={handleChange}
className="w-full border p-3 rounded-xl"
/>




<select

name="class1"

value={formData.class1}

onChange={handleChange}

className="w-full border rounded-xl p-3"

>

<option value="">
Select Class
</option>


{classes.map((item)=>(
<option 
key={item.class1}
value={item.class1}
>
Class {item.class1}
</option>
))}


</select>





<select

name="section"

value={formData.section}

onChange={handleChange}

className="w-full border rounded-xl p-3"

>


<option value="">
Select Section
</option>


{sections.map((item)=>(
<option
key={item.section}
value={item.section}
>
Section {item.section}
</option>
))}


</select>





<button

type="submit"

className="w-full bg-[#D4AF37] py-3 rounded-xl font-bold"

>

Add Child

</button>



</form>


</div>


</div>


)

}