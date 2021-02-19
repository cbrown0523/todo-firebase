import React, { useState } from "react";
import "./todoApp.css";
import firebase from './firebase';
    
    
function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);

  const datas={
        id: firebase.firestore()
        .collection("task")
        .doc().id
     }
   const db=firebase.firestore();
      db.collection('tasks')
      .doc(datas.id)
      .set({
        task:task,
        id:datas.id,
        isCompleted:false}) 
        . then(() =>{
            console.log("display")
        })
    };
        const populate = () =>{
            return firebase
            .firestore()
            .collections("task")
            .get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    let newData=doc.data();
                    if(todos.indexof(newData.id)=== -1){
                        tasklist((arr) =>{
                          return [...arr, newData]  
                        })
                    }else{
                        console.log("this is copy");
                    }
                    console.log('here are all of the todos', task);
                })
            })
        
    
    
  const handleChange = (e) => {
    setTask(e.target.value);
     
  
    };
      
    

  const AddTask = () => {
    if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
      };

      
        setTaskList([...tasklist, taskDetails]);
    }
  };
  
  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(tasklist.filter((t) => t.id != id));
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();
    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id == id);

    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };

    setTaskList(newTaskList);
  };


    console.log('tasklist', tasklist);
    return (
        <div className="todo">
      <input type="text" name="text" id="text" onChange = {(e)=> handleChange(e)} placeholder="Add a task here ..."/>
       <button className="add-btn" onClick={AddTask}>Add</button>
       <br />

       {tasklist !== [] ? (
        <ul>
          {tasklist.map((t) => (
            <li className={t.isCompleted ? "crossText" : "listitem"}>
              {t.value}
              <button className="completed"
                onClick={(e) => taskCompleted(e, t.id)}>Completed </button>  
                <button className="delete" onClick={(e) => deletetask(e, t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default TodoApp;