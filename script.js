function displaySection(sectionId){

    const sections = document.querySelectorAll('.section'); //don't forget to select all sections otherwise the code won't work

    const slideShow = document.querySelector('.slideShow');

    slideShow.style.display = 'none';
    
    sections.forEach(section => {
        section.style.display = 'none';
        
    });

    const selectedSection = document.getElementById(sectionId);

    selectedSection.style.display = 'block';
    }

    function displayInnerSection(sectionId){

        const sections = document.querySelectorAll('.section2'); //don't forget to select all sections otherwise the code won't work

        const slideShow = document.querySelector('.slideShow');

        slideShow.style.display = 'none';
        
        sections.forEach(section => {
            section.style.display = 'none';
        });
    
        const selectedSection = document.getElementById(sectionId);
    
        selectedSection.style.display = 'block';
        }


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------        

//---------------------------------------------------Generating orders ----------------------------------------------------------------------------------------------

const orders = [];

render();

function addOrder(itemName, price, action) {
    let existingOrder = orders.find(order => order.itemName === itemName);

    if(action === 'add'){

   /*1*/  if (existingOrder) {
        existingOrder.quantity++;
    } else {
        orders.push({ itemName: itemName, price: price, quantity: 1 });
    }


   /*2*/ }else if(action === 'remove'){

        if(existingOrder && existingOrder.quantity > 1){
            existingOrder.quantity--;
        }
    }

    render();
}

function render(){   //Note: always seperate the codes responsible for generating html in a function alone

    let ordersHTML = '';

    for (let i = 0; i < orders.length; i++) {
        const currentOrder = orders[i];
        
        ordersHTML += `
            <div class="an-order">
                Item Name: ${currentOrder.itemName}
                <br>
                Price: ${currentOrder.price} 
                <br>
                Quantity: ${currentOrder.quantity}

                <button class="Cancel" onclick="
                orders.splice(${i},1);
                render();
                ">
                    <p>Cancel</p>
                </button>
            </div>
        `;
    }

    document.querySelector('.all-orders').innerHTML = ordersHTML;

    calculateTotal();

}


//----------------------------------------------------------------Calculate Total--------------------------------------------------------------------------------


function calculateTotal(){

    let total = 0;

    for( let i = 0; i < orders.length; i++){

        const currentOrder = orders[i];
        
        const roundNumber = (currentOrder.price * 100) * currentOrder.quantity;

        const roundBack = roundNumber / 100;

        total += roundBack;
    }

    document.querySelector('.total').innerHTML = `
    The total of all your items would be: $${total};
    `;
}

//-------------------------------------------------------------------Generate Feedbacks-----------------------------------------------------------------------

const feedbacks = [];

renderFeedbacks();


function addFeedback(){

    const inputElement = document.querySelector('.txt-feedback');
    const text = inputElement.value;

    feedbacks.push({
        text: text,
    });

    

    inputElement.value = '';

    renderFeedbacks();

}

function renderFeedbacks (){

    let feedbacksHTML = '';

    for(let i = 0; i < feedbacks.length; i++){

        const myFeedback = feedbacks[i];
        const theFeedback = myFeedback.text;


        feedbacksHTML +=`
        <div class="feedback">
        <p>${theFeedback}</p>
        </div>
        `;

        
    }

    document.querySelector('.all-feedbacks').innerHTML = feedbacksHTML;
    
}


//-------------------------------HIGHLIGHT-FUNCTION-------------------------------------------------------------------

//Sections

const buttons = document.querySelectorAll('.section-button');

buttons.forEach(button => {
    button.addEventListener('click',()=>{
        buttons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');
    })
})

//Inner Sections

const innerButtons = document.querySelectorAll('.innerSection');

innerButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        innerButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');
    })
})

//-------------------------------------------SLIDE SHOW-------------------------------------------------

let i = 0; //start point

let images = [];

let time = 2000;

// Image List 

images[0] = 'img1.jpg.jpg';
images[1] = 'img2.jpg.jpg';
images[2] = 'img3.jpg.jpg';
images[3] = 'img4.jpg.jpg';
images[4] = 'img5.jpg.jpg';
images[5] = 'img6.jpg.jpg';

//change Image

function changeImg (){
    document.slide.src=images[i];

    if(i < images.length - 1){
        i++;
    }else{
        i=0;
    }

    setTimeout("changeImg()",time);
}

window.onload = changeImg;

