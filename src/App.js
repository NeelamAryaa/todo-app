import React, { Component, Fragment } from "react";
import "./App.css";

class App extends Component {
  state = {
    todo: "",
    todo_list: [],
    isEditable: false,
    index: -1,
    updated_text: "",
  };

  deleteTodo = (todo) => {
    const { todo_list } = this.state;
    const remaining_todos = todo_list.filter((el) => el !== todo);
    this.setState({ todo_list: remaining_todos });
  };

  addTodo = () => {
    if (this.state.todo !== "") {
      console.log("addtodo fn");
      const { todo_list, todo } = this.state;
      this.setState({ todo_list: [...todo_list, todo], todo: "" });
    }
  };

  editTodo = (idx, obj) => {
    this.setState({ isEditable: true, index: idx, updated_text: obj });
  };

  updateText = () => {
    const { todo_list, updated_text } = this.state;

    todo_list.splice(this.state.index, 1, updated_text);

    this.setState({
      todo_list: todo_list,
      isEditable: false,
      updated_text: "",
    });
  };

  render() {
    const { todo_list, isEditable, index } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="heading">What's the plan for today ?</div>
          <div className="input-container">
            <input
              type="text"
              className="add-todo"
              placeholder="Add To do"
              value={this.state.todo}
              onChange={(e) => this.setState({ todo: e.target.value })}
            />
            <button
              className="add-btn btn btn-outline-secondary"
              type="button"
              onClick={this.addTodo}
            >
              Add
            </button>
          </div>
          <div className="scrollfeature">
            <div className="todos-container mostly-customized-scrollbar">
              {todo_list.length
                ? todo_list.map((obj, idx) => (
                    <div className="todo-container" key={idx}>
                      {isEditable && index === idx ? (
                        <div className="todo-container upd-container">
                          <input
                            type="text"
                            className="add-todo"
                            onChange={(e) =>
                              this.setState({ updated_text: e.target.value })
                            }
                            value={this.state.updated_text}
                          />
                          <input
                            className="add-btn btn btn-outline-secondary"
                            type="button"
                            value="Update"
                            onClick={() => this.updateText(obj)}
                          />
                        </div>
                      ) : (
                        <Fragment>
                          <div className="todo mostly-customized-scrollbar">
                            {idx + 1 + ". " + obj}
                          </div>
                          <button
                            className="edit-btn"
                            type="button"
                            onClick={() => this.editTodo(idx, obj)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            className="delete-btn"
                            type="button"
                            onClick={() => this.deleteTodo(obj)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </Fragment>
                      )}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
