var input1 = document.getElementById("proudctName");
var input2 = document.getElementById("proudctPrice");
var input3 = document.getElementById("proudctCat");
var input4 = document.getElementById("proudctDec");

document.getElementById("myUpadteBtn").style.display ="none"
var currentIndex ;

var myStore = [];



if( localStorage.getItem("myStoreStorage" ) ==null   )
{
    myStore = [];
    console.log("no data")
}
else
{              
    myStore = JSON.parse(localStorage.getItem("myStoreStorage"));
    displayProudct();
}


 
function addProudct(){

    var oneProudct = { name : input1.value , price : input2.value , cat : input3.value , dec : input4.value }
        myStore.push( oneProudct );
        

    
    localStorage.setItem( "myStoreStorage" ,  JSON.stringify(myStore)  )

    displayProudct()

     clearInput()
  
      
}
    
function clearInput(){
    input1.value= "";
    input2.value= "";
    input3.value= "";
    input4.value= "";
}


function displayProudct()
{
    var AllTrs = ``;

    for(var i=0 ;i< myStore.length ;i++  )
    {
        AllTrs += `
                     <tr>
                     <td> ` + myStore[i].name +`</td>
                     <td> ` + myStore[i].price +`</td>
                     <td> ` + myStore[i].cat +`</td>
                     <td> ` + myStore[i].dec +`</td>
                     <td> <button onclick="deleteProudct(`+i+`)" class=" btn btn-danger"> Delete</button> </td>
                     <td> <button onclick="showUpdateData(`+i+`)" class=" btn btn-warning"> Update</button> </td>
                     </tr>
                      `
    }
    document.getElementById("tBody").innerHTML = AllTrs;



}


function showUpdateData(proIndex)
{
    currentIndex = proIndex; 
   
    input1.value = myStore[proIndex].name
    input2.value = myStore[proIndex].price
    input3.value = myStore[proIndex].cat
    input4.value = myStore[proIndex].dec

    document.getElementById("myAddBtn").style.display = "none"
    
    document.getElementById("myUpadteBtn").style.display ="inline-block"

}



function saveUpdateProduct()
{            
    myStore[currentIndex].name = input1.value ; 
    myStore[currentIndex].price = input2.value ; 
    myStore[currentIndex].cat = input3.value ; 
    myStore[currentIndex].dec = input4.value ; 
    
 
    displayProudct();
    localStorage.setItem("myStoreStorage" , JSON.stringify(myStore))
    clearInput();
    document.getElementById("myAddBtn").style.display = "inline-block"
    document.getElementById("myUpadteBtn").style.display ="none"
  

}




function deleteProudct( proudctIndex){
    myStore.splice( proudctIndex , 1)

    displayProudct()

    localStorage.setItem( "myStoreStorage" ,  JSON.stringify(myStore)  )
}




function searchProudct( userWord)
{
    var exsitproudects =[];

    for( var i=0 ; i< myStore.length ; i++ )
    {
        if( myStore[i].name.toLowerCase()  .includes(userWord.toLowerCase()))
        {
            var newObject = myStore[i];
            newObject["searchIndex"] = i
            exsitproudects .push( newObject )

        }
       

    }

    var AllTrs = ``;

    for(var i=0 ;i<  exsitproudects.length ;i++  )
    {
        AllTrs += `
                     <tr>
                    
                     <td> ` +  exsitproudects[i].name +`</td>
                     <td> ` +  exsitproudects[i].price +`</td>
                     <td> ` +  exsitproudects[i].cat +`</td>
                     <td> ` +  exsitproudects[i].dec +`</td>
                     <td> <button onclick="deleteProudct(`+ exsitproudects[i].searchIndex+`)" class=" btn btn-danger"> Delete</button> </td>
                     <td> <button onclick="showUpdateData(`+ exsitproudects[i].searchIndex+`)" class=" btn btn-warning"> Update</button> </td>
                     </tr>
                      `
    }
    document.getElementById("tBody").innerHTML = AllTrs;
   

}

