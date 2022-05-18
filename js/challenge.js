document.addEventListener('DOMContentLoaded', () => {
    let counter = document.querySelector('#counter');
    const plusButton = document.querySelector('#plus');
    const minusButton = document.querySelector('#minus');
    const pauseButton = document.querySelector('#pause');
    const heartButton = document.querySelector('#heart');
    const allButtons = document.querySelectorAll('button');
    let interval; //variable to store a setInterval function 

    counterControl(); //Invoke function once when the DOM loads to set off the counter.
    
    plusButton.addEventListener('click', () => {
        counter.textContent = Number(counter.textContent) + 1
    });
    
    minusButton.addEventListener('click', () => {
        if (counter.textContent = '0') return null
        counter.textContent = Number(counter.textContent) - 1;
    });
    
    pauseButton.addEventListener('click', counterControl);
    
    //Function that pauses or resumes the counter.
    function counterControl() {
        const buttonArray = Array.from(allButtons);
        //Checks if interval is defined (i.e. if it has the value of an interval ID returned by the setInterval function)
        // If not defined, set 'interval' to the value of a setInterval function to start/resume the counter, return value of setInterval function is an interval ID number.
        //If defined, use clearInterval to cancel the recurring code and set interval value to null.
        if (!interval) {
            interval = setInterval(() => {
                counter.textContent = Number(counter.textContent) + 1
            }, 1000)
            buttonArray.forEach(button => button.disabled = false)
            pauseButton.textContent = 'pause';
        } else if (interval) {
            clearInterval(interval);
            interval = null;
            buttonArray.forEach(button => {
                if (button !== pauseButton) {
                    button.disabled = true;
                }
            })
            pauseButton.textContent = 'resume';
        };

    };

})

