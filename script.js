const tipButtons = document.querySelectorAll(".tip_selection button");
var moneyInput = document.querySelector(".money_input");
var moneyInputDiv = document.querySelector(".money_input_div");
var peopleInput = document.querySelector(".people_input");
var peopleInputDiv = document.querySelector(".people_input_div");
var customTipInput = document.querySelector(".custom_input");
var bill = null,tip = null, people = null;
var peopleErrorMessage = document.querySelector(".people_error_message");
var billErrorMessage = document.querySelector(".bill_error_message");
var tipAmountField = document.querySelector(".total_tip_amount");
var billAmountField= document.querySelector(".total_amount");

moneyInput.addEventListener("focusout", ()=>{
    bill = null;
    if(isNaN(moneyInput.value)){
        moneyInput.value = "";
        billErrorMessage.innerText = "Can't be string";
        billErrorMessage.style.display = "block";
        moneyInputDiv.style.border = "2px solid red";
    }else{
        if(moneyInput.value == 0){
            billErrorMessage.innerText = "Can't be zero";
            billErrorMessage.style.display = "block";
            moneyInputDiv.style.border = "2px solid red";
            moneyInput.value = "";
        }else{
            billErrorMessage.style.display = null;
            moneyInputDiv.style.border = null;
            bill = parseFloat(moneyInput.value);
            calculate();
        }
    }
})

peopleInput.addEventListener("focusout", ()=>{
    people = null;
    if(isNaN(peopleInput.value)){
        peopleInput.value = "";
        peopleErrorMessage.innerText = "Can't be string";
        peopleErrorMessage.style.display = "block";
        peopleInputDiv.style.border = "2px solid red";
    }else{
        if(peopleInput.value == 0){
            peopleErrorMessage.innerText = "Can't be zero";
            peopleErrorMessage.style.display = "block";
            peopleInputDiv.style.border = "2px solid red";
            peopleInput.value = "";
        }else{
            peopleErrorMessage.style.display = null;
            peopleInputDiv.style.border = null;
            people = parseInt(peopleInput.value);
            calculate();
        }
    }
})

customTipInput.addEventListener("focusout", ()=>{
    tip = null;
    if(isNaN(customTipInput.value)){
        customTipInput.style.outline = "2px solid red";
    }else{
        if(customTipInput.value == 0){
            customTipInput.style.outline = "2px solid red";
        }else{
            customTipInput.style.outline = "2px solid hsl(172, 67%, 45%)";
            tip = parseFloat(customTipInput.value);
            customTipInput.value = customTipInput.value + "%";
            tipButtons.forEach((button) =>{
                button.classList.remove("active");
            })
            calculate();

        }
    }
})

customTipInput.addEventListener("focusin", ()=>{

    customTipInput.value = "";
})

tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
        tipButtons.forEach((button) =>{
            button.classList.remove("active");
            customTipInput.value = "";
            customTipInput.style.outline = null;
        })
        button.classList.add("active");
        tip = parseFloat(button.textContent.substring(0,button.textContent.indexOf("%")));
        calculate();
    });
});

function calculate(){
    if(bill == null||tip == null||people == null){
        return;
    }
    var totalTipBill = ((bill/100) * tip);
    tipAmountField.innerText = "$" + (totalTipBill / people).toFixed(2);
    billAmountField.innerText = "$" + ((bill + totalTipBill) / people).toFixed(2);
}

document.getElementById("resetButton").addEventListener("click", ()=>{
    bill = null;
    tip = null;
    people = null;

    tipAmountField.innerText = "$0.00";
    billAmountField.innerText = "$0.00";

    billErrorMessage.style.display = null;
    moneyInputDiv.style.border = null;

    peopleErrorMessage.style.display = null;
    peopleInputDiv.style.border = null;

    customTipInput.value = "";
    customTipInput.style.outline = null;

    tipButtons.forEach((button) =>{
        button.classList.remove("active");
    })

    moneyInput.value = "";
    peopleInput.value = ""

})