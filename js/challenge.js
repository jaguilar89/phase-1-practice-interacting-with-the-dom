document.addEventListener('DOMContentLoaded', () => {
    const counter = document.querySelector('#counter');
    const minusButton = document.querySelector('#minus');
    const plusButton = document.querySelector('#plus');
    const heartButton = document.querySelector('#heart');
    const pauseButton = document.querySelector('#pause');
    const commentForm = document.querySelector('#comment-form');
    const allButtons = document.querySelectorAll('button');
    let intervalId; //variable to store a setInterval function 

    //Invoke function once when the DOM loads to set off the counter.
    counterControl(); 

    //Decrement counter by 1
    minusButton.addEventListener('click', () => {
        if (counter.textContent === '0') return null
        counter.textContent = Number(counter.textContent) - 1;
    });

    //Increment counter by 1
    plusButton.addEventListener('click', () => {
        counter.textContent = Number(counter.textContent) + 1
    });
    
   /*  const li = document.createElement('li')                                 //TODO: FIGURE THIS OUT
    li.setAttribute('data-likes', 0)
    li.setAttribute('data-current-number', `${counter.textContent}`)
    heartButton.addEventListener('click', () => {
        document.querySelector('ul').appendChild(li)
        li.textContent = `${counter.textContent} has been liked ${li.dataset.likes++} times`
    }) */

    //Pause counter
    pauseButton.addEventListener('click', counterControl);

    //Add comment
    commentForm.addEventListener('submit', addComment)
    
    //Function that pauses or resumes the counter.
    function counterControl() {
        const buttonArray = Array.from(allButtons);
        /* Checks if interval is defined (i.e. if it has the value of an interval ID returned by the setInterval function)
        If not defined, set 'interval' to the value of a setInterval function to start/resume the counter, return value of setInterval function is an interval ID number.
        If defined, use clearInterval to cancel the recurring code and set interval value to null. */
        if (!intervalId) {
            intervalId = setInterval(() => {
                counter.textContent = Number(counter.textContent) + 1
            }, 1000);

            buttonArray.forEach(button => button.disabled = false)
            pauseButton.textContent = 'pause';

        } else if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            buttonArray.forEach(button => {
                if (button !== pauseButton) {
                    button.disabled = true;
                }
            })
            pauseButton.textContent = 'resume';
        };

    };

    function addComment(event) {
        event.preventDefault();
        const input = document.querySelector('#comment-input').value;
        const commentDiv = document.querySelector('#list');
        const p = document.createElement('p');
        p.textContent = input;
        commentDiv.appendChild(p)
        
        commentForm.reset();
    };
})

///html/body/ul/li[3]/text()