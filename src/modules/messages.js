const messages = () => {
    const showsuccessMessage = (message) => {
        spanMessage.classList.add('success');
        spanMessage.classList.remove('error');
        spanMessage.textContent = message;
        spanMessage.style.display = 'block';
        spanMessage.style.backgroundColor = 'green';
        spanMessage.style.color = 'white';
        taskDescription.style.border = '1px solid green';
        setTimeout(() => {
        spanMessage.style.display = 'none';
        taskDescription.style.border = '';
        Tasks.clearInputField();
        }, 2000);// hide the success message after 2 seconds
    }
    
    const showErrorMesssage = (message) => {
        spanMessage.classList.add('error');
        spanMessage.classList.remove('success');
        spanMessage.textContent = message;
        spanMessage.style.display = 'block';
        spanMessage.style.backgroundColor = 'red';
        spanMessage.style.color = 'white';
        taskDescription.style.border = '1px solid red';
        setTimeout(() => {
        spanMessage.style.display = 'none';
        taskDescription.style.border = '';
        Tasks.clearInputField();
        }, 2000);// hide the success message after 2 seconds
    }
}

export default messages;
