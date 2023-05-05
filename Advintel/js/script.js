// Строгий режим
"use strict"

document.addEventListener("click",
	function (e) {
	const targetElement = e.target;

	if (targetElement.closest('.menu-icon')) {
		document.documentElement.classList.toggle('menu-open');
		e.preventDefault();
	}

})

window.addEventListener("load", pageLoaded);
function pageLoaded(e) {
	//textType();
}

function textType(element) {
	let textTypeElements = [];
	if (element) {
		textTypeElements.push(element);
	} else {
		textTypeElements = document.querySelectorAll(`[data-text-type]`);
	}
	// якщо такі елементи є
	if (textTypeElements.length) {
		// працюємо
		textTypeElements.forEach(textTypeElement => {
			textTypeItem(textTypeElement);
		});
		// Обробка окремого тексту
		function textTypeItem(text) {
			// str.trim() - прибирає пробіли на початку і в кінці рядка
			text.classList.add('typing');
			const textValue = text.textContent.trim();
			const textValueLength = textValue.length - 1;
			const textValueSpeed = +text.dataset.textType ? +text.dataset.textType : 200;
			const textValueDelay = +text.dataset.textTypeDelay;
			const textValueNext = text.dataset.textTypeNext ? document.querySelector(text.dataset.textTypeNext) : null;

			let index = 0;

			text.innerHTML = ``;

			setTimeout(() => {
				let interval = setInterval(() => {
					text.insertAdjacentHTML("beforeend", `${textValue[index]}`);

					if (index === textValueLength) {
						clearInterval(interval);
						text.classList.add('done');
						textValueNext ? textType(textValueNext) : null;
					}
					++index;
				}, textValueSpeed);
			}, textValueDelay);
		}
	}
}


//textType(element)


let options = {
	root: null,
	rootMargin: "0px 0px 0px 0px",
	threshold: 0.3,
};

let callback = (entries, observer) => {
	entries.forEach((entry) => {
		const targetElement = entry.target;
		if (entry.isIntersecting) {
			if (!targetElement.classList.contains('typing')) {
				textType(targetElement);
			}
			//console.log('я тебе бачу');
		} else {
			//console.log('я тебе не бачу');
		}
	});
}

let observer = new IntersectionObserver(callback, options);


// або якщо багато об'єктів
let someElements = document.querySelectorAll("[data-text-type]");
someElements.forEach(someElement => {
	observer.observe(someElement);
});