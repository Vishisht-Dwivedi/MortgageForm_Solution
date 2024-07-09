
const form = document.querySelector('form');
const mortage = document.querySelector('#principleAmt');
const emptyOutput = document.querySelector('.emptyOutput');
const completedOutput = document.querySelector('.completedOutput');
const clrButton = document.querySelector('#clr');

mortage.addEventListener("input", (e) => {
    console.log(e.data);
    let inputVal = mortage.value;
    function isLetter(l) {
        return l.toLowerCase() != l.toUpperCase();
    }
    if (mortage.value === '' || isLetter(e.data)) {
        inputVal = 0;
        mortage.value = 0;
    } else {
        const inputNum = parseInt(inputVal.replace(/\,/g, ''), 10);
        console.log(inputNum);
        let formatter = new Intl.NumberFormat();
        let formattedValue = formatter.format(inputNum);
        mortage.value = formattedValue;
    }

})


clrButton.addEventListener('click', (e) => {
    mortage.value = 0;
    document.querySelector('#time').value = '0';
    document.querySelector('#rate').value = '0';
    document.querySelector('#repay').checked = false;
    document.querySelector('#interestOnly').checked = false;
    completedOutput.style.zIndex = '-1';
    emptyOutput.style.zIndex = '1';
})




form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { principleAmt, time, rate, repay, interestOnly } = e.target;
    const fdata = { principleAmt, time, rate, repay, interestOnly }
    fdata.formValidator = () => {
        if (!this.principleAmt.value || !this.time.value || !this.rate.value || (!this.repay.checked && !this.interestOnly.checked)) {
            return false;
        } else {
            return true;
        }
    }
    function mortgageCalc(P, r, n) {
        r = r / 100 / 12;
        n = n * 12;
        let monthly = Math.round(P * r * (1 + r) ** n / ((1 + r) ** n - 1))
        let total = monthly * n;
        return [monthly, total]
    }

    const svg = document.querySelectorAll('.addon');
    const inputLabel = document.querySelectorAll('.inputContainer');
    const errText = document.querySelectorAll('.errText');
    const monthlyText = document.querySelector('#monthly');
    const total = document.querySelector('#total');

    if (!fdata.formValidator()) {
        for (let e of svg) {
            e.classList.add('err');
        }
        for (let input of inputLabel) {
            input.classList.add('errBorder');
        }
        for (let t of errText) {
            t.style.display = 'block';
        }
    } else {
        for (let e of svg) {
            e.classList.remove('err');
        }

        for (let input of inputLabel) {
            input.classList.remove('errBorder');
        }

        for (let t of errText) {
            t.style.display = 'none';
        }
        let formatter = new Intl.NumberFormat();
        let term = fdata.time.value;
        let rate = fdata.rate.value;
        let mortageAmount = fdata.principleAmt.value;
        mortageAmount = parseInt(mortageAmount.replace(/\,/g, ''), 10);
        monthlyText.innerText = formatter.format(mortgageCalc(mortageAmount, rate, term)[0])
        total.innerText = formatter.format(mortgageCalc(mortageAmount, rate, term)[1])
        emptyOutput.style.zIndex = '-1';
        completedOutput.style.zIndex = '1';
    }
});