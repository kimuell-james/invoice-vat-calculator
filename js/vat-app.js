document.addEventListener("DOMContentLoaded", function () {

    const amountInput = document.getElementById("amountInput");
    const percentInput = document.getElementById("percentInput");
    const vatInput = document.getElementById("vatInput");

    const totalAmount = document.getElementById("totalAmount");
    const netOfVAT = document.getElementById("netOfVAT");
    const lessOfVAT = document.getElementById("lessOfVAT");

    const amountInWords = document.getElementById("amountInWords")

    const calculateBtn = document.getElementById("calculateBtn");
    const clearBtn = document.getElementById("clearBtn");

    amountInput.focus();

    calculateBtn.addEventListener("click", function () {

        let amountValue = amountInput.value.trim();
        let percentValue = percentInput.value.trim();
        let vatValue = vatInput.value.trim();

        if (amountValue === "" || isNaN(Number(amountValue)) || Number(amountValue) <= 0) {
            showAlert("Please enter a valid amount!", "danger");
            clearFields();
            amountInput.focus();
            return;
        } else {
            clearAlerts();
        }

        let amount = Number(amountValue);

        let percent = percentValue === "" ? 100 : Number(percentValue);
        let vat = vatValue === "" ? 12 : Number(vatValue);

        if (isNaN(percent)) {
            showAlert("Please enter a valid percent!", "danger");
            clearFields();
            return;
        }

        if (isNaN(vat)) {
            showAlert("Please enter a valid VAT!", "danger");
            clearFields();
            return;
        }

        let total = amount * (percent / 100);
        let net = total / ((vat / 100) + 1);
        let less = total - net;

        totalAmount.value = total.toLocaleString('en-PH', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });

        netOfVAT.value = net.toLocaleString('en-PH', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });

        lessOfVAT.value = less.toLocaleString('en-PH', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });

        amountInWords.value = numberToWords(total);

    });

    function numberToWords(n) {
        if (n === 0) return 'Zero';
        const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const scales = ['', 'Thousand', 'Million', 'Billion'];

        let whole = Math.floor(n);
        let decimal = Math.round((n - whole) * 100);

        let words = '';
        let scaleIndex = 0;

        while (whole > 0) {
            if (whole % 1000 !== 0) {
            let chunk = whole % 1000;
            let chunkWords = '';
            if (chunk >= 100) {
                chunkWords += units[Math.floor(chunk / 100)] + ' Hundred ';
                chunk %= 100;
            }
            if (chunk >= 20) {
                chunkWords += tens[Math.floor(chunk / 10)] + ' ';
                chunk %= 10;
            }
            if (chunk >= 10) {
                chunkWords += teens[chunk - 10] + ' ';
                chunk = 0;
            } else if (chunk > 0) {
                chunkWords += units[chunk] + ' ';
            }
            words = chunkWords + scales[scaleIndex] + ' ' + words;
            }
            whole = Math.floor(whole / 1000);
            scaleIndex++;
        }

        if (decimal > 0) {
            return words.trim() + " and " + decimal + "/100";
        } else {
            return words.trim();
        }

    }

    function showAlert(message, type = "warning", duration = 5000) {
        const alertPlaceholder = document.getElementById('alertPlaceholder');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        alertPlaceholder.append(wrapper);

        // Automatically remove after duration
        setTimeout(() => {
            const alertElement = bootstrap.Alert.getOrCreateInstance(wrapper.querySelector('.alert'));
            alertElement.close();  // dismiss alert
        }, duration);
    }

    function clearAlerts() {
        const alertPlaceholder = document.getElementById('alertPlaceholder');
        alertPlaceholder.innerHTML = "";  // remove all alerts
    }

    function clearFields() {
        amountInput.value = "";
        percentInput.value = "";
        vatInput.value = "";

        totalAmount.value = "";
        netOfVAT.value = "";
        lessOfVAT.value = "";
        amountInWords.value = "";

        amountInput.focus();

    }

    clearBtn.addEventListener("click", clearFields);

});