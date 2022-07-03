import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';
import { toast } from 'react-toastify';

const GoalForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  // handleChange
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
      toast.error('Please enter a goal', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        style: { padding: '10px' },
        theme: 'dark',
      });
    }

    dispatch(createGoal({ text }));
    setText('');
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="goal">Goal</label>
          <input
            type="text"
            name="goal"
            id="goal"
            value={text}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};
export default GoalForm;
