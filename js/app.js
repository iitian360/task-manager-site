showtask();


let addbtn=document.getElementById('addbtn');
addbtn.addEventListener('click', function(e){
   let addtxt=document.getElementById('addtxt');
   let titletext=document.getElementById('title-text');

   let task=localStorage.getItem('task');
   if (task==null) {
      taskobj=[]; 
   }
   else{
   taskobj=JSON.parse(task);
   }

   let myobj={
       title:titletext.value,
       text:addtxt.value
   }

   taskobj.push(myobj);
   localStorage.setItem("task",JSON.stringify(taskobj));
   addtxt.value="";
   titletext.value="";
   showtask();
})

function showtask(){
    let task=localStorage.getItem('task');

    if (task==null) {
        taskobj=[]; 
     }
     else{
     taskobj=JSON.parse(task);
     }
     let html="";
    taskobj.forEach(function(element,index) {
        html+=`
        <div class=" notecard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 style="font-family:'Ubuntu', sans-serif; color:yellow;" class="card-title">${element.title}</h5>
                <p class="card-text" style="font-family:'Ubuntu', sans-serif;color:white;"> ${element.text}</p>
                <button id="${index}" onclick="delet(this.id)" class="btn btn-outline-danger">Delet Task</button>
            </div>
        </div>
        `;
    });

    let taskelm=document.getElementById('task');
    if (taskobj.length!=0) {
        taskelm.innerHTML=html;
    }
    else{
        taskelm.innerHTML=`<h6 style="font-family:'Ubuntu', sans-serif; background:white; border:1px solid black;
        border-radius:3px; color:black;text-align:center;width:90%;padding:10px 20px;">No task yet, click "Add Task" to add first task</h6>`;
      
    }

}
//function to delet task//

function delet(index){
    let task=localStorage.getItem('task');
    if (task==null) {
        taskobj=[]; 
     }
     else{
     taskobj=JSON.parse(task);
     }
     taskobj.splice(index,1);
     localStorage.setItem("task",JSON.stringify(taskobj));
     showtask();
}

let searchtxt=document.getElementById('searchtxt');
searchtxt.addEventListener('input',function(){
    let inputval=searchtxt.value.toLowerCase();
    notecard=document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function(element){
        let cardtxt=element.getElementsByTagName("p")[0].innerText;
        let titltxt=element.getElementsByTagName("h5")[0].innerText;
        if (cardtxt.includes(inputval)||titltxt.includes(inputval)){
          element.style.display="block";  
        }

        else{
            element.style.display="none";
        }
    })
})