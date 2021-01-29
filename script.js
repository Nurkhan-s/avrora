window.addEventListener('DOMContentLoaded', () => {

    // Menu
    const mobHamburger = document.querySelector('.menu_btn'),
        menuMobile = document.querySelector('.menu_list'),
        menuCLose = document.querySelector('[data-close]');

    function openMenu() {
        menuMobile.classList.remove('menu_list')
        menuMobile.classList.add('menu-mobile--open');
        document.body.style.overflow = 'hidden';
        menuCLose.style.display = 'block';


    }

    function closeMenu() {
        menuMobile.classList.remove("menu-mobile--open");
        menuMobile.classList.add('menu_list');
        document.body.style.overflow = 'auto';
        menuCLose.style.display = 'none';

    }
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && menuMobile.classList.contains('menu-mobile--open')) {
            closeMenu();
        }
    });

    mobHamburger.addEventListener('click', openMenu);
    menuCLose.addEventListener('click', closeMenu);



    // Timer

    function timer(id, deadline) {

        function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor((t / (1000 * 60 * 60 * 24))),
                seconds = Math.floor((t / 1000) % 60),
                minutes = Math.floor((t / 1000 / 60) % 60),
                hours = Math.floor((t / (1000 * 60 * 60) % 24));

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function getZero(num) {
            if (num >= 0 && num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }

        function setClock(selector, endtime) {

            const timer = document.querySelector(selector),
                days = timer.querySelector("#days"),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

            updateClock();

            function updateClock() {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
        }

        setClock(id, deadline);
    }

    timer('.timer', '2021-02-01');


    // Slider

    const slides = document.querySelectorAll('.item'),
        slider = document.querySelector('.slider'),
        prev = document.querySelector('.left'),
        next = document.querySelector('.right'),
        slidesWrapper = document.querySelector('.slider_wrapper'),
        slidesField = document.querySelector('.slider_items'),
        width = window.getComputedStyle(slidesWrapper).width,
        indicators = document.querySelector('.indicators');


    let slideIndex = 1;
    let offset = 0;


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    })

    function translateSlides() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    // Arrows listener
    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2)
        }
        translateSlides();



        dots[slideIndex - 1].style.backgroundColor = '#2192BF';
    });
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        translateSlides();

        dots[slideIndex - 1].style.backgroundColor = '#2192BF';
    });
    const dots = [];

    for (let i = 0; i < slides.length; i++) {
        var dot = document.createElement('li');
        dot.textContent = '.';
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.backgroundColor = '#2192BF';
        }
        indicators.append(dot);
        dots.push(dot);
    }


    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const swipeZone = document.querySelector('[data-slider]');

    swipeZone.addEventListener('touchstart', function (e) {
        touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
    }, false);

    swipeZone.addEventListener('touchend', function (e) {
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        handleGesure();
        // for (let i = 0; i < slides.length; i++){
        //     e.target.setAttribute('data-swipe-to', i);
        // }
        // console.log(e.target)

    }, false);

    
    
    
    function swipeLeft() {
       
        if (touchendX < touchstartX) {
            if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +width.slice(0, width.length - 2)
            }
            if (slideIndex == slides.length) {
                slideIndex = 1;
                dots[slides.length-1].style.backgroundColor = "#c4c4c4";
                
            } else {
                slideIndex++;
            }
            dots[slideIndex-1].style.backgroundColor = '#2192BF';
            dots[Math.abs(slideIndex-2)].style.backgroundColor = "#c4c4c4";
            // dots.forEach(dot => dot.style.backgroundColor = "#c4c4c4");
           
            
                        
            translateSlides();
            
        }
    }

    function swipeRight() {
        
        if (touchendX > touchstartX) {
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            } else {
                offset -= +width.slice(0, width.length - 2);
            }
            if (slideIndex == 1) {
                dots[slideIndex-1].style.backgroundColor = '#c4c4c4';
                slideIndex = slides.length;
                
            }else {
                slideIndex--;
                dots[slides.length-1].style.backgroundColor = "#c4c4c4";
                
            }      
             
            dots[slideIndex-1].style.backgroundColor = '#2192BF';
            dots[Math.abs(slideIndex-2)].style.backgroundColor = "#c4c4c4";
            // dots.forEach(dot => dot.style.backgroundColor = "#c4c4c4");
            
           
            
            
            translateSlides();
        }
    }

    function handleGesure() {
        swipeLeft();
        swipeRight();
        
        // dots[index].style.backgroundColor = '#2192BF';
        // dots.forEach(dot => dot.style.backgroundColor = "#c4c4c4");
    }
    // Dot's listener
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            translateSlides();



            dots.forEach(dot => dot.style.backgroundColor = '#c4c4c4');
            dots[slideIndex - 1].style.backgroundColor = '#2192BF';
        });
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }


    // Mask 


    const mask = (selector) => {

        let setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = '+7 (___) ___ __ __',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll(selector);

        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    };

    mask('[name = "phone"]');

    // Buttons do not rerun the page
    document.querySelectorAll('#btn').forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
        });
    });







});