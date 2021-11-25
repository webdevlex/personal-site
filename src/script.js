// Scrolls to top on landing or refresh
window.scrollTo(0, 0);

// helpers
function getElement(className) {
	return document.querySelector(className);
}

// Setup mobile menu button to open on click
const mobileMenuButton = getElement('.mobile-menu-button');
mobileMenuButton.addEventListener('click', () => toggleMenu());

let menuOpen = false;
function toggleMenu() {
	menuOpen = !menuOpen;
	toggleFade();
	animateMenuButton();
	toggleLockScroll();
}

function toggleFade() {
	getElement('.navbar-menu').classList.toggle('fade');
}

function animateMenuButton() {
	getElement('.top-line').classList.toggle('animate-top-line');
	getElement('.bottom-line').classList.toggle('animate-bottom-line');
}

function toggleLockScroll() {
	let body = document.getElementsByTagName('body')[0];
	body.classList.toggle('stop-scrolling');
}

// Setup navigation buttons to scroll to section on click
const navbar = getElement('.navbar-menu');
navbar.addEventListener('click', (e) => handleNavbarClick(e.target.id));

function handleNavbarClick(id) {
	if (buttonIsScroller(id)) {
		let section = `.home-${id}`;
		smoothScrollTo(section);
	}
}

function buttonIsScroller(id) {
	return id !== 'contact';
}

function smoothScrollTo(section) {
	if (menuOpen) toggleMenu();
	let pos = getPosOf(section);
	window.scrollTo(pos);
}

function getPosOf(section) {
	let element = getElement(section);
	let pos = element.getBoundingClientRect().top + window.scrollY;
	let scrollObject = { top: pos, left: 0, behavior: 'smooth' };
	return scrollObject;
}

// Setup contact window buttons to open contact form when clicked
document
	.querySelectorAll('.contact-btn')
	.forEach((button) =>
		button.addEventListener('click', () => toggleContactWindow())
	);

function toggleContactWindow() {
	toggleSlideIn();
	toggleLockScroll();
	toggleBackground();
}

function toggleSlideIn() {
	const contactWindow = getElement('.contact-container');
	if (contactWindow.classList.contains('hide-contact')) {
		contactWindow.classList.remove('hide-contact');
		contactWindow.classList.add('slide-in');
	} else {
		contactWindow.classList.add('hide-contact');
		contactWindow.classList.remove('slide-in');
	}
}

function toggleBackground() {
	getElement('.contact-bg').classList.toggle('show-bg');
}

// Setup projects carousel to shift left or right on click
document
	.querySelectorAll('.left-scroller')
	.forEach((scroller) => scroller.addEventListener('click', () => shiftLeft()));
document
	.querySelectorAll('.right-scroller')
	.forEach((scroller) =>
		scroller.addEventListener('click', () => shiftRight())
	);

function shiftLeft() {
	temporarlyTurnOffPointerEvents();

	const leftProject = getElement('.left-project');
	const centerProject = getElement('.center-project');
	const rightProject = getElement('.right-project');

	shiftLeftProjectToCenter(leftProject);
	shiftCenterProjectToRight(centerProject);
	shiftRightProjectToLeft(rightProject);
}

function rotateIfLogoNotFacingUser() {
	const centerProject = document.querySelector('.center-project');
	const logoFacingUser = centerProject.getAttribute('isLogoFacingUser');

	if (logoFacingUser === 'false') {
		toggleRotate(centerProject);
	}
}

function shiftLeftProjectToCenter(leftProject) {
	leftProject.classList.remove('left-project');
	leftProject.classList.add('center-project');
}

function shiftCenterProjectToRight(centerProject) {
	centerProject.classList.remove('center-project');
	centerProject.classList.add('right-project');
}

function shiftRightProjectToLeft(rightProject) {
	rightProject.classList.remove('right-project');
	rightProject.classList.add('left-project');
}

function shiftRight() {
	temporarlyTurnOffPointerEvents();

	const leftProject = getElement('.left-project');
	const centerProject = getElement('.center-project');
	const rightProject = getElement('.right-project');

	shiftLeftProjectToRight(leftProject);
	shiftCenterProjectToLeft(centerProject);
	shiftRightProjectToCenter(rightProject);
}

function shiftLeftProjectToRight(leftProject) {
	leftProject.classList.remove('left-project');
	leftProject.classList.add('right-project');
}

function shiftCenterProjectToLeft(centerProject) {
	centerProject.classList.remove('center-project');
	centerProject.classList.add('left-project');
}

function shiftRightProjectToCenter(rightProject) {
	rightProject.classList.remove('right-project');
	rightProject.classList.add('center-project');
}

function temporarlyTurnOffPointerEvents() {
	turnOffPointerEvents();
	setTimeout(() => turnOnPointerEvents(), 600);
}

function turnOffPointerEvents() {
	document
		.querySelectorAll('.scroll-button')
		.forEach((button) => (button.style.pointerEvents = 'none'));
	document
		.querySelectorAll('.scroller')
		.forEach((scroller) => (scroller.style.pointerEvents = 'none'));
}

function turnOnPointerEvents() {
	document
		.querySelectorAll('.scroll-button')
		.forEach((button) => (button.style.pointerEvents = 'all'));
	document
		.querySelectorAll('.scroller')
		.forEach((scroller) => (scroller.style.pointerEvents = 'all'));
}

// Setup center project to rotate on hover and click
const projects = document.querySelectorAll('.project');

projects.forEach((project) => {
	project.setAttribute('isLogoFacingUser', true);
	project.addEventListener('click', (e) => handleProjectClicked(e));
});

function handleProjectClicked(e) {
	const viewportWidth = getViewportWidth();
	const projectClicked = e.target;
	const centerProjectClicked =
		projectClicked.classList.contains('center-project');

	if (viewportWidth < 576 || centerProjectClicked) {
		toggleRotate(projectClicked);
	} else {
		const leftProjectClicked =
			projectClicked.classList.contains('left-project');
		const rightProjectClicked =
			projectClicked.classList.contains('right-project');

		if (leftProjectClicked) {
			shiftLeft();
		} else if (rightProjectClicked) {
			shiftRight();
		}
	}
}

function toggleRotate(element) {
	const logoFacingUser = element.getAttribute('isLogoFacingUser');
	if (logoFacingUser == 'true') {
		element.setAttribute('isLogoFacingUser', false);
	} else {
		element.setAttribute('isLogoFacingUser', true);
	}
	const elementToRotate = element.querySelector('.project-rotater');
	elementToRotate.classList.toggle('rotate');
}

function getViewportWidth() {
	return Math.max(
		document.documentElement.clientWidth || 0,
		window.innerWidth || 0
	);
}

// Setup up bottom right contact button to show when no other contact buttons are on screen
const intersectionButtons = document.querySelectorAll('.intersection');
const contactButton = getElement('.contact-button');

const options = {
	root: null,
	threshhold: 0,
	rootMargin: '0px',
};

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		contactButton.classList.toggle('show-contact-button');
	});
}, options);

intersectionButtons.forEach((button) => {
	observer.observe(button);
});

// Setup for send email button
document
	.querySelector('.send-button')
	.addEventListener('click', () => attemptToSendEmail());

function attemptToSendEmail() {
	const form = document.querySelector('.form');
	const name = form.elements['name'].value;
	const email = form.elements['email'].value;
	const subject = form.elements['subject'].value;
	const message = form.elements['message'].value;
	let fields = { name, email, subject, message };
	let errorsExist = false;

	Object.entries(fields).forEach((field) => {
		const fieldError = validateField(field);
		if (fieldError) {
			errorsExist = true;
		}
	});

	resetAnimation();
	startLoadingAnimation();
	if (!errorsExist) {
		sendEmail(fields);
	} else {
		messageFailed({ status: 0, text: 'Missing required field' });
	}
}

function validateField(field) {
	const fieldName = field[0];
	const value = field[1];

	if (!value) {
		markFieldAsError(fieldName);
		return fieldName;
	} else if (fieldName === 'email' && !validateEmail(value)) {
		markFieldAsError(fieldName);
		return fieldName;
	} else {
		removeError(fieldName);
	}
}

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function markFieldAsError(fieldName) {
	const form = document.querySelector('.form');
	form.elements[fieldName].parentNode.classList.add('error');
}

function removeError(fieldName) {
	const form = document.querySelector('.form');
	form.elements[fieldName].parentNode.classList.remove('error');
}

function sendEmail(params) {
	emailjs.send('default_service', 'template_vr6w86n', params).then(
		(response) => messageSuccess(response, params),
		(error) => messageFailed(error)
	);
}

function startLoadingAnimation() {
	let loader = document.querySelector('.loader');
	loader.classList.add('active');
}

function messageSuccess(response, params) {
	console.log('Email sent successfully!');
	sendNotification(params);
	delaySuccessAnimation(0);
	delayCloseContactWindow(1500);
	delayClearInputs(2500);
	delayResetAnimation(2000);
}

function sendNotification(params) {
	emailjs.send('default_service', 'template_tzksk1i', params).then(
		() => console.log('Notification sent successfully!'),
		() => console.log('Notification failed to send...')
	);
}

function delaySuccessAnimation(delay) {
	setTimeout(function () {
		successAnimation();
	}, delay);
}

function successAnimation() {
	let loader = document.querySelector('.loader');
	let check = document.querySelector('.check');
	loader.classList.add('success');
	check.classList.add('active');
}

function delayCloseContactWindow(delay) {
	setTimeout(function () {
		toggleContactWindow();
	}, delay);
}

function delayClearInputs(delay) {
	setTimeout(function () {
		clearInputs();
	}, delay);
}

function clearInputs() {
	const form = document.querySelector('.form');
	form.elements['name'].value = '';
	form.elements['email'].value = '';
	form.elements['subject'].value = '';
	form.elements['message'].value = '';
}

function delayResetAnimation(delay) {
	setTimeout(function () {
		resetAnimation();
	}, delay);
}

function resetAnimation() {
	const loader = document.querySelector('.loader');
	const exclamation = document.querySelector('.exclamation');
	const check = document.querySelector('.check');
	const contactWindow = document.querySelector('.contact-container');

	loader.classList.remove('active');
	loader.classList.remove('success');
	loader.classList.remove('failed');
	exclamation.classList.remove('active');
	check.classList.remove('active');
	contactWindow.classList.remove('errors');
}

function messageFailed(error) {
	console.log('Email failed to send...');
	delayFailedAnimation(10);
}

function delayFailedAnimation(delay) {
	setTimeout(function () {
		failedAnimation();
	}, delay);
}

function failedAnimation() {
	let slideIn = document.querySelector('.slide-in');
	let loader = document.querySelector('.loader');
	let exclamation = document.querySelector('.exclamation');
	exclamation.classList.add('active');
	loader.classList.add('failed');
	slideIn.classList.add('errors');
}
