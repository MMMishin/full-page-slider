import { gsap, Power2 } from 'gsap'
import MicroModal from 'micromodal'
import { Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from 'swiper'
Swiper.use([ Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation ])

document.addEventListener('DOMContentLoaded', () => {

	// Меню

	const menu = document.querySelector('.nav'),
    hamburger = document.querySelector('.top-line__menu-burger'),
	menuItem = document.querySelectorAll('.nav__menu-link'),
	overlay = document.querySelector('.overlay');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('top-line__menu-burger--active');
        menu.classList.toggle('nav--open');
		overlay.classList.toggle('overlay--active');
    })

	menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('top-line__menu-burger--active');
            menu.classList.toggle('nav--open');
			overlay.classList.toggle('overlay--active');
        })
    })

	// Модальные окна

	MicroModal.init({
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableFocus: true,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true,
	})
	
	// Слайдер изображений

	const swiperImg = new Swiper('.slider-img', {
		loop: false,
		speed: 2400,
		parallax: true,
		pagination: {
			el: '.slider-count__total',
			type: 'custom',
			renderCustom: function(swiper, current, total) {
				let totalRes = total >= 10 ? total : `0${total}`
				return totalRes
			},
		},
	})

	// Слайдер текста

	const swiperText = new Swiper('.slider-text', {
		loop: false,
		speed: 2400,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},
	});

	swiperImg.controller.control = swiperText
	swiperText.controller.control = swiperImg

	// Вращающаяся шестерня

	let gear = document.querySelector('.slider-gear')

	swiperText.on('slideNextTransitionStart', function() {
		gsap.to(gear, 2.8, {
			rotation: '+=40',
			ease: Power2.easeOut,
		});
	});

	swiperText.on('slidePrevTransitionStart', function() {
		gsap.to(gear, 2.8, {
			rotation: '-=40',
			ease: Power2.easeOut,
		});
	});

	// Анимация цифр при смене слайдов

	let curnum = document.querySelector('.slider-count__current'),
		pagcur = document.querySelector('.slider-current__num')

	swiperText.on('slideChange', function() {
		let ind = swiperText.realIndex + 1,
			indRes = ind >= 10 ? ind : `0${ind}`
		gsap.to(curnum, .2, {
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function() {
				gsap.to(curnum, .1, {
					force3D: true,
					y: 10,
				})
				curnum.innerHTML = indRes;
				pagcur.innerHTML = indRes;
			}
		});
		gsap.to(curnum, .2, {
			force3D: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeOut,
			delay: .3,
		});
	});

})
