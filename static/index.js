let url = window.location.href;
blogno = url.replace(window.location.origin + '/', '');

if (url.includes('Blog') == true) {
    document.getElementById(blogno).classList.add('highlight')
    document.getElementById(blogno).parentElement.classList.add('highlight')
    document.getElementById('readmode').classList.add('vis');
    document.getElementById('lefthead').innerText = 'Other Blogs';
}// LeftBar Blog Number HighLight

if (url.includes('contact') == true) {

    document.getElementById('formsub').addEventListener('click', () => {

        let querry = document.getElementById('querry');
        let name = document.getElementById('name');
        let alert = document.getElementById('alert');

        if (mail.value == '' || name.value == '' || querry.value == '') {
            alert.classList.add('failed')
            alert.innerText = 'Please Enter All The Details Correctly!'
            setTimeout(() => {
                alert.classList.remove('failed')
            }, 5000);
        } else {
            alert.classList.add('success')
            alert.innerText = 'Your Request was sent successfully!'
            setTimeout(() => { alert.classList.remove('success'); }, 5000);
            setTimeout(() => {
                mail.value = '';
                name.value = '';
                querry.value = '';
            }, 1000);
        }
    })

} //Contact Form Submit

if (blogno == 'log') { //login buttons
    let formin = document.getElementById('formin');
    let formup = document.getElementById('formup');
    let alert = document.getElementById('alert');
    localStorage.removeItem('Email');


    document.getElementById('signbtn').addEventListener('click', () => {
        formin.style.setProperty('display', 'none');
        formup.style.setProperty('display', 'block');
        document.getElementById('signbtn').style.setProperty('text-shadow', 'var(--shado)');
        document.getElementById('logbtn').style.setProperty('text-shadow', 'none');
    })

    document.getElementById('logbtn').addEventListener('click', () => {
        document.getElementById('logbtn').style.setProperty('text-shadow', 'var(--shado)');
        document.getElementById('signbtn').style.setProperty('text-shadow', 'none');
        formup.style.setProperty('display', 'none');
        formin.style.setProperty('display', 'block');
    })
    
    if (document.getElementById('mssg').innerText != '') {
        alert.classList.add('failed');
        alert.innerText = document.getElementById('mssg').innerText;
        setTimeout(() => {
            alert.classList.remove('failed')
        }, 5000);
    } else {
        // console.log($('#mssg').text())
    }
}


document.getElementById('readmode').addEventListener('click', () => {
    $("#container").toggleClass('readcontainer');
    $("#left").toggleClass('hid');
    $('#readmode').text($('#readmode').text() == '🗕' ? '⛶' : '🗕');
    
}) // Reading Mode

// if localstorage empty
let val = document.getElementById('check').innerText
if(val ==""){console.log("Value Hasn't Been Set Yet")
}
else{
    localStorage.setItem('Email',val);
    console.log(val)
}
console.log(localStorage.getItem('Email'))

if(localStorage.getItem('Email')!=null){
    console.log('Logged in hai');
    document.getElementById('login').style.setProperty('display', 'none');}
else{
    document.getElementById('logout').style.setProperty('display', 'none');
}

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('Email');
    location.reload();
})
document.getElementById('n').innerText = JSON.parse(localStorage.getItem('Email')).mailid
