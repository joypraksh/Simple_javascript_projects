let product_amount = document.querySelector('#product_amount');
let shipping_charge = document.querySelector('#shipping_charge');
let product_total_amount = document.querySelector('#product_total_amount');

const decreaseNum = (incdec, itemprice) => {
    let text_box = document.getElementById(incdec);
    let item_price = document.getElementById(itemprice);
    // console.log(text_box.value);
    if (text_box.value <= 0) {
        text_box.value = 0;
        alert('Negative quantity not allowed');
    } else {
        text_box.value = parseInt(text_box.value) - 1;
        text_box.style.background = '#f5f5f5';
        text_box.style.color = 'black';
        item_price.innerHTML = parseInt(item_price.innerHTML) - 15;
        product_amount.innerHTML = parseInt(product_amount.innerHTML) - 15;
        product_total_amount.innerHTML = parseInt(product_amount.innerHTML) + parseInt(shipping_charge.innerHTML);
    }
};

const increaseNum = (incdec, itemprice) => {
    let text_box = document.getElementById(incdec);
    let item_price = document.getElementById(itemprice);
    if (text_box.value >= 5) {
        text_box.value = 5;
        alert('Max 5 item You can select');
        text_box.style.background = 'red';
        text_box.style.color = 'white';
    } else {
        text_box.value = parseInt(text_box.value) + 1;
        item_price.innerHTML = parseInt(item_price.innerHTML) + 15;
        product_amount.innerHTML = parseInt(product_amount.innerHTML) + 15;
        product_total_amount.innerHTML = parseInt(product_amount.innerHTML) + parseInt(shipping_charge.innerHTML);
    }
};

const apply_coupn = () => {
    let coupn = document.querySelector('#coupn');
    let code = document.querySelector('#code');
    let total_amt_current = parseInt(product_total_amount.innerHTML);
    //    console.log(total_amt_current);
    if (coupn.value === 'khanjan123') {
        let discount_amount = total_amt_current - 10;
        product_total_amount.innerHTML = discount_amount;
        code.innerHTML = 'You have successfully applyed this code';
    } else {
        code.innerHTML = 'code is incorrect';
    }
};