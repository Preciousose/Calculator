class Calculator {
    constructor (previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear (){
        this.currentOperand =''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number ==='.' && this.currentOperand.includes('.'))return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    chooseOperation(operation) {
        if (this.currentOperand === '')return
        if (this.previousOperand !== ''){
            this.equals()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    equals() {
        const previous = Number(this.previousOperand)
        const current = Number(this.currentOperand)
        let result = undefined
        if (isNaN(previous)||isNaN(current)){
            return
        }
switch(this.operation){
    case "+": result = previous+current
    break;
    case "*": result = previous*current
    break;
    case "-": result = previous-current
    break;
    case "÷": result = previous/current
    break;
    default: return;
}
this.previousOperand = ""
    this.operation = undefined
    this.currentOperand = result
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelectorAll('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calc = new Calculator (previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calc.appendNumber(button.innerText)  
      calc.updateDisplay() 
    })
})
allClearButton.forEach(button => {
    button.addEventListener('click', () => {  
      window.location.reload()
    })
})
deleteButton.addEventListener('click', (button) => {  
   calc.delete()
   calc.updateDisplay()
  })
  equalsButton.addEventListener('click', (button) => {  
    calc.equals()
    calc.updateDisplay()
   })
operationButton.forEach(button => {
        button.addEventListener ('click', () => {
          calc.chooseOperation(button.innerText)  
          calc.updateDisplay() 
        })
})
