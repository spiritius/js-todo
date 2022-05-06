"use strict";

class Todo {
	constructor(target) {
		this.tasks = new Map(localStorage.list ? JSON.parse(localStorage.list) : []);
		document.querySelector(target).append(this.render());
	}
	
	render() {
		let body = document.createElement('div');

		body.innerHTML = `<form>
			<div class="d-flex">
				<input type="text" name="input" class="form-control me-2" placeholder="добавить задачу">
				<button type="submit" class="btn btn-dark">записать</button>
			</div>
			<p id="alert" class="d-none text-danger my-2"></p>
		</form>
		<button type="button" id="clean" class="btn btn-outline-dark d-none">очистить выполненные</button>
		<ul class="list-unstyled mt-4"></ul>`;
		
		this.body = body;
		this.form = this.body.querySelector('form');
		this.list = this.body.querySelector('ul');
		this.alert = this.body.querySelector('#alert');
		this.cleanBtn = this.body.querySelector('#clean');
		
		this.renderList();
		this.handlers();
		this.removeBtn();
		
		return this.body;
	}
	
	renderList() {
		if (this.tasks.size > 0) {
			let tasks = [];
			for (let item of this.tasks) {
				if (item[1]) {
					tasks.push(`<li style="text-decoration: line-through;"><input type="checkbox" checked class="me-2" />${item[0]}</li>`);
				} else {
					tasks.push(`<li><input type="checkbox" class="me-2"/>${item[0]}</li>`);
				}
			}
			this.list.innerHTML = tasks.join('');
		} else {
			this.list.innerHTML = '';
		}
		this.saveToLocalStorage();
	}

	addTask(val) {
		if (this.tasks.has(val)) {
			this.alert.textContent = "Такая задача уже есть в списке";
			this.alert.classList.remove("d-none");
			return;
		} else if (val === '') {
			this.alert.textContent = "Нужно ввести текст задачи";
			this.alert.classList.remove("d-none");
			return;
		} else {
			this.tasks.set(val, false);
			this.form.input.value = "";
			this.alert.classList.add("d-none");
		}

		this.renderList();
		this.removeBtn();
	}

	saveToLocalStorage() {
		localStorage.list = JSON.stringify(Array.from(this.tasks.entries()));
	}

	completeTask(e) {
		if (e.target.tagName === 'INPUT' && e.target.checked) {
			e.target.closest('li').style.textDecoration = "line-through";
			this.tasks.set(e.target.parentNode.textContent, true);
		}
		if (e.target.tagName === 'INPUT' && !e.target.checked) {
			e.target.closest('li').style.textDecoration = "";
			this.tasks.set(e.target.parentNode.textContent, false);
		}
		this.removeBtn();
		this.saveToLocalStorage();
	}

	removeBtn() {
		if ( this.list.querySelector('input[type="checkbox"]:checked') ) {
			this.cleanBtn.classList.remove('d-none');
		} else {
			this.cleanBtn.classList.add('d-none');
		}
	}

	cleanDoneTasks() {
		for (let item of this.tasks) {
			if (item[1]) this.tasks.delete(item[0]);
		}
		this.renderList();
		this.removeBtn();
	}

	handlers() {
		this.form.addEventListener('submit', e => {
			e.preventDefault();
			this.addTask(this.form.input.value);
		});
		this.list.addEventListener('click', e => this.completeTask(e));
		this.cleanBtn.addEventListener('click', e => this.cleanDoneTasks(e));
	}
}