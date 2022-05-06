
describe("работа с задачами", function () {
	
	beforeEach(function(){
		todo.tasks.clear();
		todo.renderList();
	});
	
	
	it("добавляет задачу 'тест'", function() {
		todo.addTask('тест');
		
		let content = document.querySelector('#root ul li').textContent;
		
		expect(content).toEqual('тест');
	});
	
	it("не добавляет одинаковые задачи", function(){
		todo.addTask('тест2');
		todo.addTask('тест2');
		todo.addTask('тест2');

		let equalTasksLength = document.querySelectorAll('#root ul li').length;
		
		expect(equalTasksLength).toEqual(1);
	});
	
	it("не добавляет пустую задачу", function(){
		todo.addTask('');

		let emptyTaskLength = document.querySelectorAll('#root ul li').length;
		
		expect(emptyTaskLength).toEqual(0);
	});

	it("добавить задачи, пометить одну как выполненную", function() {
		todo.addTask('задача 1');
		todo.addTask('задача 2');

		let task = document.querySelector('#root ul li input[type="checkbox"]');
		task.setAttribute('checked', true);

		let checkedLength = document.querySelectorAll('#root input:checked').length;

		expect(checkedLength).toEqual(1);
	})

	it("добавить задачу, пометить как выполненную, удалить выполненную задачу", async () => {
		todo.addTask('задача');

		let task = document.querySelector('#root ul li input[type="checkbox"]');
		task.setAttribute('checked', true);
		let btnClean = document.querySelector('#clean');

		await btnClean.click();

		let checkedLength = document.querySelectorAll('#root input:checked').length;

		expect(checkedLength).toEqual(0);
	})

	it("записывает задачи в localstorage", function(){
		localStorage.list = [];
		todo.addTask('to localstorage!');

		let localStorageResult =  JSON.parse(localStorage.list);

		expect(localStorageResult[0][0]).toEqual('to localstorage!');
	})
});