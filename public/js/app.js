



var weatherForm = document.querySelector('form')
var search =document.querySelector('input')
var msg1=document.querySelector('#msg1')
var msg2=document.querySelector('#msg2')



weatherForm.addEventListener('submit',function(e){
    e.preventDefault()
    const location=search.value
    msg1.textContent='Loading...'
    msg2.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then(function(response){
    response.json().then(function(data){
        if(data.error)
        {
             msg1.textContent=data.error
        }
        else 
        {
            msg1.textContent=data.location  
            msg2.textContent=data.forecast  
        }
    })

})
    
})