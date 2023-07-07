const toggleNavBtn = () => {
	let navBtns = document.querySelectorAll('.btn');
	navBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			if (!btn.classList.contains('btn-active')) {
				navBtns.forEach((btn) => btn.classList.remove('btn-active'));
				btn.classList.add('btn-active');
			}
		});
	});
};

export default toggleNavBtn;
