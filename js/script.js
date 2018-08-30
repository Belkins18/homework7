let eventListeners = {
    tabs() {
        let info = document.getElementsByClassName('info-header')[0],
            infoTab = document.getElementsByClassName('info-header-tab'),
            infoCnt = document.getElementsByClassName('info-tabcontent');

        function hideTabContent(a) {
            for (let i = a; i < infoCnt.length; i++) {
                infoCnt[i].classList.remove('show');
                infoCnt[i].classList.add('hide');
            }
        }
        hideTabContent(1);

        function showTabContent(b) {
            if (infoCnt[b].classList.contains('hide')) {
                hideTabContent(0);
                infoCnt[b].classList.remove('hide');
                infoCnt[b].classList.add('show');
            }
        }

        info.addEventListener('click', function (event) {
            let target = event.target;
            if (target.className == 'info-header-tab') {
                for (let i = 0; i < infoTab.length; i++) {
                    if (target == infoTab[i]) {
                        showTabContent(i);
                        break;
                    }
                }
            }
        });
    }
}
let timesParam = {
    downDate: "Aug 25, 2018 23:59:59",
    domElements: {
        hours: document.querySelector('#timer .hours'),
        minutes: document.querySelector('#timer .minutes'),
        seconds: document.querySelector('#timer .seconds'),
        timerAction:  document.querySelector('.timer .timer-action'),
    },
    ms() {
        return this.getDifferent();
    },
    days() {
        return this.getDays(this.getDifferent());
    },
    hours(ms) {
        return this.getHours(this.getDifferent());
    },
    minutes(ms) {
        return this.getMinutes(this.getDifferent());
    },
    seconds(ms) {
        return this.getSeconds(this.getDifferent());
    },

    getCurDate() {
        return new Date().getTime();
    },
    getDownDate() {
        return new Date(this.downDate).getTime();
    },
    getDifferent() {
        return this.getDownDate() - this.getCurDate();
    },
    getDays(ms) {
        return Math.floor(ms / (1000 * 60 * 60 * 24));
    },
    getHours(ms) {
        return Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    },
    getMinutes(ms) {
        return Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    },
    getSeconds(ms) {
        return Math.floor((ms % (1000 * 60)) / 1000);
    }
};

window.addEventListener("DOMContentLoaded", function() {
    eventListeners.tabs();
});

document.addEventListener("DOMContentLoaded", function(){
    let t = setInterval(function(obj = timesParam) {
        let res = {
            different() {
                return obj.getDifferent();
            },
            hours() {
                return (obj.hours() < 10) ? `0${obj.hours()}` : obj.hours();
            },
            minutes() {
                return (obj.minutes() < 10) ? `0${obj.minutes()}` : obj.minutes();
            },
            seconds() {
                return (obj.seconds() < 10) ? `0${obj.seconds()}` : obj.seconds();
            }
        }
        obj.domElements.hours.textContent = `${res.hours()}`;
        obj.domElements.minutes.textContent = `${res.minutes()}`;
        obj.domElements.seconds.textContent = `${res.seconds()}`;

        if (res.different() < 0) {
            clearInterval(t),
                obj.domElements.hours.textContent = `00`;
            obj.domElements.minutes.textContent = `00`;
            obj.domElements.seconds.textContent = `00`;
            obj.domElements.timerAction.textContent = `EXPIRED`;
        }
    }, 1000);
});


document.addEventListener("DOMContentLoaded", function(){
    let moreBtn = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    moreBtn.addEventListener('click', function () {
        this.classList.add('more-splash');
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';

    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        moreBtn.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
});




document.addEventListener("DOMContentLoaded", function(){
    //FORM
    let massage = new Object();
    massage.domLoading = 'Загрузка...';
    massage.success = 'Спасибо! Скоро с Вами свяжутся';
    massage.failure = 'Что-то пошло не так';

    let form = document.getElementsByClassName('main-form')[0],
        form2 = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            //AJAX
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php')
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            let formData = new FormData(form);
            request.send(formData);

            request.onreadystatechange = function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = massage.loading;
                } else if (request.readyState === 4) {
                    if (request.status == 200 && request.status < 300) {
                        statusMessage.innerHTML = massage.success;
                    }
                    else {
                        statusMessage.innerHTML = massage.failure;
                    }
                }
            }
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        })

    form2.addEventListener('submit', function (event) {
        event.preventDefault();
        form2.appendChild(statusMessage);

        //AJAX
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php')
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form2);
        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = massage.loading;
            } else if (request.readyState === 4) {
                if (request.status == 200 && request.status < 300) {
                    statusMessage.innerHTML = massage.success;
                }
                else {
                    statusMessage.innerHTML = massage.failure;
                }
            }
        }
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    })
});



document.addEventListener("DOMContentLoaded", function(){

    // Slider
    let slideIndex = 1,
        slides = document.getElementsByClassName('slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotWrap = document.querySelector('.slider-dots'),
        dots = document.getElementsByClassName('dot');

        showSlides(slideIndex);

        function showSlides(n) {
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }

            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove('dot-active');
            }

            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
        }
        
        function plusSlides(n) {
            showSlides(slideIndex += n)
        }

        function currentSlide(n) {
            showSlides(slideIndex = n)
        }

        prev.addEventListener('click', function() {
            plusSlides(-1);
        });

        next.addEventListener('click', function() {
            plusSlides(1);
        });

        dotWrap.addEventListener('click', function (event) {
            for (let i = 0; i < dots.length + 1; i++) {
                if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                    currentSlide(i);
                }
            }
        });



    // Calculator
    let persons = document.getElementsByClassName('counter-block-input')[0],
        resDays = document.getElementsByClassName('counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function () {
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;
            if (resDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        resDays.addEventListener('change', function () {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;
            if (persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function () {
            if (resDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        })


});





