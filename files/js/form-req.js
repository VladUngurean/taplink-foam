//Константи для бота телеграм
const TOKEN = '6855972104:AAFuq94wNJy0a-mIbpEY_qY_PtJQT1Xz63I';
const CHAT_ID = '-1001977981015';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const PIXEL = '722611993163770';
const ADS = 'Veaceslav';




const loadButton =
	`<div class="dot-pulse">
	<div class="dot-pulse__dot"></div>
</div>`;
const myForm = document.querySelector( '.order__form' );
let nameInput = myForm.querySelector( '#name' );
let buttonOrderSend = myForm.querySelector( '.order__form-btn' );
//перевірка номеру
let inputPhone = myForm.querySelector( '#phone' );
// Маска для телефона
const mask = new IMask( inputPhone, {
	mask: '+373(00)00-00-00',
	lazy: false
} );

inputPhone.addEventListener( "change", () => {
	let span = inputPhone.nextElementSibling;
	if ( mask.masked.isComplete ) {
		span.classList.remove( 'fail-span' );
		inputPhone.classList.remove( 'fail' );
	} else {
		span.classList.add( 'fail-span' );
		inputPhone.classList.add( 'fail' );
	}
} );
nameInput.addEventListener( "change", () => {
	let span = nameInput.nextElementSibling;
	if ( nameInput.value == "" || nameInput.value.length < 3 ) {
		nameInput.classList.add( 'fail' );
	} else {
		nameInput.classList.remove( 'fail' );
		span.classList.remove( 'fail-span' );
	}
} );

inputPhone.addEventListener( "input", () => {
	let span = inputPhone.nextElementSibling;
	if ( mask.masked.isComplete ) {
		span.classList.remove( 'fail-span' );
		inputPhone.classList.remove( 'fail' );
		span.classList.add( 'good-span' );
	}
} );



// відправка повідомлення
myForm.addEventListener( 'submit', function ( e ) {
	e.preventDefault();
	if ( nameInput.value == "" || !mask.masked.isComplete ) {
		if ( nameInput.value.length < 3 ) {
			let span = nameInput.nextElementSibling;
			nameInput.classList.add( 'fail' );
			nameInput.classList.remove( 'good' );
			span.classList.add( 'fail-span' );
			span.innerHTML = 'Введите Имя';
		}
		if ( !mask.masked.isComplete ) {
			let span = inputPhone.nextElementSibling;
			inputPhone.classList.add( 'fail' );
			inputPhone.classList.remove( 'good' );
			span.classList.add( 'fail-span' );
			span.innerHTML = 'Введите номер телефона';
		}

	} else {
// Отримати значення з форми або будь-якого іншого елементу
	let infoName = nameInput.value;
	let infoPhone = inputPhone.value

	// Зберегти дані в Local Storage
	localStorage.setItem('infoName', infoName);
	localStorage.setItem('infoPhone', infoPhone);


		let massage = `<b>Заявка з сайта: ${document.querySelector('.title').textContent }</b> \n`;
		massage += `<b>Имя: ${nameInput.value} </b>\n`;
		massage += `<b>Номер: ${inputPhone.value}</b>\n`;
		massage += `<b>Pixel: ${PIXEL}</b>\n`;
		massage += `<b>Реклама: ${ADS}</b>\n`;
		buttonOrderSend.style = 'pointer-events: none;'
		buttonOrderSend.classList.add( 'load' );
		// Анімація загрузки 
		axios.post( URI_API, {
				chat_id: CHAT_ID,
				parse_mode: 'html',
				text: massage
			} )
			.then( ( res ) => {
				// massageText.innerHTML = 'Дякуємо за замовлення! <br> Наші менеджери зв\'яжуться з вами вже найближчим часом для уточнення деталей';
				setTimeout( () => {
					myForm.reset();
					buttonOrderSend.classList.remove( 'load' )
					buttonOrderSend.innerHTML = 'Успешно отправлено';
					location.href = "thank-you-page.html";
				}, 500 );

			} )
			.catch( ( err ) => {
				myForm.reset();
				buttonOrderSend.classList.remove( 'load' )
				buttonOrderSend.innerHTML = 'Помилка';

			} )
			.finally( ( err ) => {} );
	}
} )