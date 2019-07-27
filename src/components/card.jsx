import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import { deleteTodo, getTodos, toggleTodo } from '../store/actions';
import miscs from '../utils/miscs';
import './card.scss';

export class Card extends Component
{
  componentDidMount()
  {
    const { _getTodos, todos } = this.props;

    if (!todos.length)
    {
      _getTodos();
    }
  }

  todoItems = () =>
  {
    const { todos } = this.props;
    const { _deleteTodo } = this.props;
    const { _toggleTodo } = this.props;
    let retVal = null;

    if (todos)
    {
      retVal = todos.map(todo => (
        <CSSTransition key={todo._id} timeout={1} classNames="move">
          <li className="list-item" key={todo._id} id={todo._id}>
            <div>
              <button type="button" className="list-item__del-icon" onClick={() => _deleteTodo(todo._id)}>
                <i className="fas fa-times fa-sm" />
              </button>
              <span className={`list-item__title ${(todo.completed ? 'completed' : '')}`}>
                <Link
                  to={{ pathname: '/Add', state: { edit: true, todo } }}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  {todo.content}
                </Link>
              </span>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                className="list-item__check"
                id={`checkbox-${todo._id}`}
                checked={todo.completed}
                onChange={() => _toggleTodo(todo._id)}
              />
              <label htmlFor={`checkbox-${todo._id}`} />
            </div>
          </li>
        </CSSTransition>
      ));
    }

    return retVal;
  }

  render()
  {
    return (
      <div className="card">
        <div className="card-header">
          <h1 className="card-header__date">
            {miscs.convertEnNumberToFa(miscs.date())}
          </h1>
        </div>
        <div className="card-main">
          <h2 className="card-main__title"><Trans i18nKey="card.TITLE" /></h2>

          <ul className="card-main__list">
            <TransitionGroup>
              {this.todoItems()}
            </TransitionGroup>
          </ul>

          <Link to="/Add">
            <button type="button" className="card-main__add-btn">
              <i className="fas fa-plus fa-3x" style={{ color: 'white' }} />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.any).isRequired,
  _getTodos: PropTypes.func.isRequired,
  _deleteTodo: PropTypes.func.isRequired,
  _toggleTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todo,
  userId: state.user.userId,
});

const mapDispatchToProps = dispatch => ({
  _getTodos: () =>
  {
    dispatch(getTodos());
  },
  _deleteTodo: (id) =>
  {
    dispatch(deleteTodo(id));
  },
  _toggleTodo: (id) =>
  {
    dispatch(toggleTodo(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('translations')(Card));
