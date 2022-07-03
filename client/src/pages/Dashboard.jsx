import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGoals } from '../features/goals/goalSlice';
import Spinner from '../components/Spinner';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth.user);
  const { goals, isLoading, isError, message } = useSelector(
    (store) => store.goals
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getGoals());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}!</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have no goals :/</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
