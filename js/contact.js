formSubmit =  function() {
    submitForm();
}
// replace default behaviour for form sumbit
const submitForm = function() {
        const formInputs = document.querySelectorAll('.form-control');
        const formObj = {};
        [].forEach.call(formInputs, (x) => {
            formObj[x.name] = x.value;
        });
        contact(formObj);
};

function contact(data) {
    return fetch('/contact', {
        method : 'POST',
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body : JSON.stringify(data)
    }).then((res) => res)
}

(function() {
    const submitBtn = document.querySelector('#sumbit-btn')
    submitBtn.addEventListener('click', formSubmit);
    const form = document.querySelector('#volunter-form');
    form.addEventListener('submit', (e) => e.preventDefault())
})()
