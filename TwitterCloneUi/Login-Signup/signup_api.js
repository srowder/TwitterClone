document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);

        const userData = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        const usernameInput = document.getElementById('username').value;
        localStorage.setItem('username', usernameInput);


        try {
            const response = await fetch("/api/v1/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                // Registration successful, redirect to the home page
                window.location.href = "../Ehit/home.html";
            } else {
                console.error('Registration failed:', response.status);
            }

            const data = await response.text();
            console.log(data); 
        } catch (error) {
            console.error('Error:', error);
        }
    });
});