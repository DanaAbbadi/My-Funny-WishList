'use strict';



// build constructor

function Wish(wishName,wishDate){
    this.wishName= wishName;
    this.wishDate=wishDate;
    this.funnyDate;

    Wish.all.push(this);


}

Wish.all=[];


//extract info from form

var form1 = document.getElementById('form');

form1.addEventListener("submit", function(event){
    event.preventDefault();
    var wishName = event.target.wish.value;
    var wishDate = event.target.date.value;

    //send to constructor
    var newWish =new Wish(wishName,wishDate);
    newWish.funnyDate = randNum(1,99);
    console.log(newWish);
    storeWish();
    renderTable();

});


function randNum(min,max){
    min = Math.ceil(min);
   max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function storeWish(){
    var wishArray = JSON.stringify(Wish.all);
    localStorage.setItem('wish', wishArray);

}

function getWish(){
    var wishArray = localStorage.getItem('wish');
    if(wishArray){
        Wish.all= JSON.parse(wishArray);
        renderTable();
    }
}

// Table

var tableE01 = document.getElementById('table');


function renderTable(){
    tableE01.textContent = ' ';
    
    var rowE01 = document.createElement('tr');
    tableE01.appendChild(rowE01);
    rowE01.setAttribute('id','tableHeader');

    
    var head1 = document.createElement('th');
    rowE01.appendChild(head1);
    head1.textContent= 'Wish Title';
    
    var head2 = document.createElement('th');
    rowE01.appendChild(head2);
    head2.textContent= 'Expected Date';
    
    var head3 = document.createElement('th');
    rowE01.appendChild(head3);
    head3.textContent= 'Your wish will come true after xD';
    
    var head4 = document.createElement('th');
    rowE01.appendChild(head4);
    head4.textContent= 'Remove';

    
    for(var i=0; i<Wish.all.length;i++){
        var rowE02 = document.createElement('tr');
        var index= 'd'+i;
        rowE02.setAttribute('id',index);
        tableE01.appendChild(rowE02);

        var tdE01 = document.createElement('td');
         rowE02.appendChild(tdE01);
         tdE01.textContent= Wish.all[i].wishName;

         var tdE02 = document.createElement('td');
         rowE02.appendChild(tdE02);
         tdE02.textContent= Wish.all[i].wishDate;

         var tdE03 = document.createElement('td');
         rowE02.appendChild(tdE03);
         tdE03.textContent= `${Wish.all[i].funnyDate}  years`;

         
         var removex = document.createElement('a');
         removex.setAttribute('id',i);
         removex.textContent= 'X';
         
         // removex.textContent= 'X';
          var tdE04 = document.createElement('td');
          tdE04.appendChild(removex);
        rowE02.appendChild(tdE04);

        
         removex.addEventListener('click', function(event){
             var index1 = event.target.id;
             index1= 'd'+ index1;
             var deleteRow= document.getElementById(index1);
             deleteRow.remove();
             deleteFromLocal(index1);
            

         });
         




    }









}








function deleteFromLocal(i){
    Wish.all.splice(i,1);
    storeWish();

}



















getWish();