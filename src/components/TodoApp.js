import React, { useState } from "react";
import "./todoApp.css";
import firebase from './firebase';
    
    
function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]); 
  const [idOfUpdate, setIdOfUpdate]= useState(null);
  const [truth, setTruth] = useState();
 
  const markCompleteGlobal = () => {
    let id = idOfUpdate;
    const itemtoupdate = firebase
    .firestore()
    .collection("tasks")
    .doc(id);
    
    itemtoupdate.update({
    completed: truth,
    });
    // debugger
    setIdOfUpdate(null);
    setTruth(null);
    };
    const markComplete = (id) => {

       
        console.log("First", idOfUpdate);
        setIdOfUpdate(id);
        
        setTask(
        task.map((tasks) => {
        if (tasks.id === id) {
        tasks.completed = !tasks.completed;
        
        setTimeout(function() {
        setTruth(tasks.completed);
        }, 1000);
        }
        return tasks;
        })
        )
        console.log("Second", idOfUpdate, truth);
        };

  const AddTask=(title)=>{
  const datas={
        id: firebase.firestore()
        .collection("tasks")
        .doc().id
  };
   const db=firebase.firestore();
      db.collection('tasks')
      .doc(datas.id)
      .set({
        task:task,
        id:datas.id,
        isCompleted:false}) 
        .then(() =>{
            populate();
        });
};
        const populate = (data) =>{
            setTaskList([]);
            return firebase
            .firestore()
            .collection("tasks")
            .get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    let newData=doc.data();
                    if(tasklist.indexOf(newData.id)=== -1){
                        setTaskList((arr) =>{
                          return [...arr, newData]  
                        })
                    }else{
                        console.log("this is copy");
                    }
                    console.log('here are all of the todos', tasklist);
                });
            })
             
        };
    
    
  const handleChange = (e) => {
    setTask(e.target.value);
     
  
    };
      
    

  /*const AddTask = () => {
    if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
      };

      
        setTaskList([...tasklist, taskDetails]);
    }
  };*/

 const deletetask = (e, id) => {
 e.preventDefault();
  setTaskList(tasklist.filter((t) => t.id != id));
   
  };
  const delTodo = (id) => {
const db = firebase.firestore();
db.collection("tasks")
.doc(id)
.delete()
/*.then(() => { setTaskList(tasklist.filter((task) => task.id != id));

})*/
.catch((error) => {
console.error(id, "Error removing document: ", error);
})
.then((res) =>setTaskList([...task.filter((task) => task.id !== id)]));
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
                onClick={(e) => markComplete(e, t.id)}>Completed </button>  
                <button className="delete" onClick={(e) => delTodo(e, t.id)}>
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

///onChange={props.markComplete.bind(this, props.todo.id)}
