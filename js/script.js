window.addEventListener("DOMContentLoaded", function() {
    let info = document.getElementsByClassName('info-header')[0],
        infoTab = document.getElementsByClassName('info-header-tab'),
        infoCnt = document.getElementsByClassName('info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i< infoCnt.length; i++) {
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
           for (let i = 0; i < infoTab.length; i ++) {
               if (target == infoTab[i]) {
                   showTabContent(i);
                   break;
               }
           }
        }
    });





    // clock

    let clocksHeader = () => {
        let hours = document.querySelector('.hours');
        let minutes = document.querySelector('.minutes');
        let seconds = document.querySelector('.seconds');
        let hours_data = 1;
        let minutes_data = 1;
        let seconds_data = 5;

        let timer = setInterval(function() {
            hours.innerHTML = hours_data;
            minutes.innerHTML = minutes_data;
            seconds.innerHTML = seconds_data--;

            if(hours_data < 10) {
                hours.innerHTML = '<span>0</span>' + hours_data;
            }
            if(seconds_data < 10) {
                seconds.innerHTML = '<span>0</span>' + seconds_data;
            }
            if(minutes_data < 10) {
                minutes.innerHTML = '<span>0</span>' + minutes_data;
            }





            // что то не корректно отрабатывает счетчик


            if(seconds_data == 0) {
                minutes_data = 59;
                hours_data--;
                if(hours_data < 0) clearInterval(timer)
            }


            if(seconds_data == 0) {
                seconds_data = 59;
                minutes_data--;
                if(minutes_data < 0) clearInterval(timer)
            }








        }, 1000);

    }
    clocksHeader();

});