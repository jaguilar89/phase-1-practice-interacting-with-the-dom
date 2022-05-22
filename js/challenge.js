document.addEventListener('DOMContentLoaded', () => {
    const counter = document.querySelector('#counter');
    const minusButton = document.querySelector('#minus');
    const plusButton = document.querySelector('#plus');
    const heartButton = document.querySelector('#heart');
    const pauseButton = document.querySelector('#pause');
    const commentForm = document.querySelector('#comment-form');
    const allButtons = document.querySelectorAll('button');
    let intervalId; //variable to store a setInterval function 

    //Invoke function once the DOM loads to set off the counter.
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
    
    heartButton.addEventListener('click', addLikes) 

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
            if (document.getElementById('restart')) {
                document.getElementById('restart').remove();
            }

        } else if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            buttonArray.forEach(button => {
                if (button !== pauseButton) {
                    button.disabled = true;
                }
            })
            pauseButton.textContent = 'resume';
            
            const restart = document.createElement('button');
            restart.setAttribute('id', 'restart')
            restart.textContent = 'restart'
            pauseButton.insertAdjacentElement('afterend', restart);

            restart.addEventListener('click', () => location.reload());
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



    const list = []
    const li = document.createElement('li')
    function addLikes() {
        let currentNumber = Number(counter.textContent)
        const found = list.some(obj => obj.id === currentNumber)
        if (!found) {
            list.push({id: currentNumber, likes: 0})            
            li.textContent = `${currentNumber} has been liked 1 time`
            document.querySelector('.likes').appendChild(li)
        } else {
            let num = list.find(obj => obj.id === currentNumber)
            num.likes = Number(num.likes) + 1
            li.textContent = `${currentNumber} has been liked ${num.likes} times`
            document.querySelector('.likes').appendChild(li)
        }
    }
})

