document.addEventListener("DOMContentLoaded", function () {

    // Global DOM elements
    const amountInput = document.getElementById("amountInput");
    const percentInput = document.getElementById("percentInput");
    const vatInput = document.getElementById("vatInput");

    const totalAmount = document.getElementById("totalAmount");
    const netOfVAT = document.getElementById("netOfVAT");
    const lessOfVAT = document.getElementById("lessOfVAT");

    const calculateBtn = document.getElementById("calculateBtn");
    const clearBtn = document.getElementById("clearBtn");

    calculateBtn.addEventListener("click", function () {

        let amount = parseFloat(amountInput.value);
        let percent = parseFloat(percentInput.value);
        let vat = parseFloat(vatInput.value);

        if (isNaN(amount)) {
            alert("Please enter a valid amount.");
            return;
        }

        if (isNaN(percent)) percent = 100;
        if (isNaN(vat)) vat = 12;

        let total = amount * (percent / 100);
        let net = total / ((vat / 100) + 1);
        let less = total - net;

        totalAmount.value = total.toFixed(2);
        netOfVAT.value = net.toFixed(2);
        lessOfVAT.value = less.toFixed(2);

    });

    clearBtn.addEventListener("click", function () {

        amountInput.value = "";
        percentInput.value = "";
        vatInput.value = "";

        totalAmount.value = "";
        netOfVAT.value = "";
        lessOfVAT.value = "";

    });

});