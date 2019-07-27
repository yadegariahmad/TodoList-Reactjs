import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import { addTodo, editTodo, loader } from '../../store/actions';
import { SHOW_LOADER } from '../../store/actionTypes';
import './add.scss';

class AddAndEditTodo extends Component
{
  state = {
    content: '',
    editMode: false,
  };

  componentDidMount()
  {
    const { location } = this.props;
    if (location.state && location.state.edit)
    {
      this.setState({
        content: location.state.todo.content,
        editMode: true,
      });
    }
  }

  updateContent(text)
  {
    this.setState({
      content: text,
    });
  }

  submit()
  {
    const {
      _addTodo,
      _editTodo,
      _loader,
      location,
      history,
    } = this.props;
    const { editMode, content } = this.state;
    const userId = localStorage.getItem('userId');

    _loader(SHOW_LOADER);

    if (!editMode)
    {
      const todo = {
        _id: '',
        content,
        completed: false,
        userId,
      };
      _addTodo(todo, history);
    } else
    {
      const todo = {
        todoId: location.state.todo._id,
        content,
        userId,
      };
      _editTodo(todo, history);
    }
  }

  render()
  {
    const { content } = this.state;
    return (
      <div className="add">
        <div className="text-container">
          <textarea
            cols={70}
            rows={10}
            value={content}
            placeholder="TODO Content"
            className="input"
            onChange={(e) => { this.updateContent(e.target.value); }}
          />
          <br />
          <button className="btn-add" type="button" onClick={() => { this.submit(); }}><Trans i18nKey="card.SUBMIT" /></button>
        </div>
      </div>
    );
  }
}

AddAndEditTodo.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.any,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  _addTodo: PropTypes.func.isRequired,
  _editTodo: PropTypes.func.isRequired,
  _loader: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  signedUp: state.user.signedUp,
});

const mapDispatchToProps = dispatch => ({
  _addTodo: (body, history) =>
  {
    dispatch(addTodo(body, history));
  },
  _editTodo: (body, history) =>
  {
    dispatch(editTodo(body, history));
  },
  _loader: (type) =>
  {
    dispatch(loader(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAndEditTodo);
