document.addEventListener("DOMContentLoaded", function() {
    const headerElement = document.getElementById('header');
    if (headerElement) {
        fetch('/includes/header.html')
            .then(response => response.text())
            .then(data => {
                headerElement.innerHTML = data;
            })
            .catch(error => console.error('Error fetching header:', error));
    }

    const footerElement = document.getElementById('footer');
    if (footerElement) {
        fetch('/includes/footer.html')
            .then(response => response.text())
            .then(data => {
                footerElement.innerHTML = data;
            })
            .catch(error => console.error('Error fetching footer:', error));
    }
});
