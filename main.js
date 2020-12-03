var filters = {
    'all': function(todos) {
      return todos;
    },
    active: function(todos) {
      return todos.filter(function(todo) {
        return !todo.completed;
      });
    },
    completed: function(todos) {
      return todos.filter(function(todo) {
        return todo.completed;
      });
    }

  }

  new Vue({
    'el': '.todoapp',
    data: {
      newTodo: '',
      visibility: 'all',
      editingTodo: null,
      oldEditingTodoTitle: null,
      todos: [{
          title: 'test 1',
          completed: true
        },
        {
          title: 'test 2',
          completed: false
        },
      ]
    },
    computed: {
      filterdTodos: function() {
        return filters[this.visibility](this.todos);
      },
      remaningTodos: function() {
        return filters.active(this.todos).length;
      },
      remaningText: function() {
        if (filters.active(this.todos).length > 1)
          return 'items';

        return 'item';
      },
      allDone: {
        get: function() {
          return this.remaningTodos === 0;
        },
        set: function(value) {
          this.todos.forEach(function(todo) {
            todo.completed = value;
          });
        }
      }
    },
    methods: {
      deleteTodo: function(todo) {
        this.todos.splice(todo, 1);
      },
      addTodo: function() {
        if (this.newTodo == '')
          return;

        this.todos.push({
          'title': this.newTodo,
          'completed': false,
        });
        this.newTodo = '';
      },
      removeCompleted() {
        this.todos = filters.active(this.todos);
      },

      editTodo(todo) {
        this.editingTodo = todo;
        this.oldEditingTodoTitle = todo.title;
      },
      doneEditing() {
        if (this.editingTodo.title == '')
          this.deleteTodo(this.editingTodo);

        this.editingTodo = null;
      },
      cancelEditing() {
        this.editingTodo.title = this.oldEditingTodoTitle;
        this.editingTodo = null;
      }
    }
  });