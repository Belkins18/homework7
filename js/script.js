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
}


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