const dropDownBtn = () => {
	const btns = document.querySelectorAll(".dropDown-btn");
	btns.forEach((el) => {
		let dropDownBtnName = el.dataset.path;
		let dropDownList = document.querySelector(`[data-target=${dropDownBtnName}]`);
		el.onclick = function(){
			this.classList.toggle("dropActive");
			dropDownList.classList.toggle("open");
			window.onclick = (ev) => {
				if (
					ev.target === document.querySelector(`[data-path=${dropDownBtnName}`) ||
					ev.target === dropDownList
				) {
					return;
				} else {
					dropDownList.classList.remove('open');
					this.classList.remove("dropActive");
				}
			}
		}	
	})
}

export default dropDownBtn;