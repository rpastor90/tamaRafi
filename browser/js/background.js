$(document).ready(function() {
    var d = new Date();
    var n = d.getHours();
    if (n >= 5 && n <= 8)
        document.body.className = "morning";
    else if (n > 8 && n <= 10)
        document.body.className = "late-morning";
    else if (n > 10 && n <= 13)
        document.body.className = "afternoon";
    else if (n > 13 && n <= 16)
        document.body.className = "late-afternoon";
    else if (n > 16 && n <= 18)
        document.body.className = "evening";
    else if (n > 18 && n <= 20)
        document.body.className = "late-evening";
    else if (n > 20 && n <= 24)
        document.body.className = "night";
    else
        document.body.className = "late-night";
});