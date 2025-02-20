// Toggle Navigation on Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const form = document.getElementById("formdata");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    fetch('https://portfolio-ruz2.onrender.com/submit', {
        method: 'POST',
        body: JSON.stringify(formObject),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                form.reset();
            } else {
                alert(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
});


hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
