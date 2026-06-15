document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("headerDiv").innerHTML = data;
        });
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footerDiv").innerHTML = data;
        });
});