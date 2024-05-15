import { useState } from "react";

const Header = (props) => <h1>{props.text}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const total = good + neutral + bad;
  if (total === 0) {
    return (
      <div>
        <Header text={props.text} />
        <div>No feedback given</div>
      </div>
    );
  }
  return (
    <div>
      <Header text={props.text} />
      <table>
        <tbody>
          <Rating text={"good"} value={good} />
          <Rating text={"neutral"} value={neutral} />
          <Rating text={"bad"} value={bad} />
          <Rating text={"all"} value={good + neutral + bad} />
          <Rating
            text={"average"}
            value={total ? (good * 1 + bad * -1) / total : 0}
          />
          <Rating
            text={"positive"}
            value={(total ? (good / total) * 100 : 0) + " %"}
          />
        </tbody>
      </table>
    </div>
  );
};

const Rating = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setFeedback = (setter, state) => () => setter(state + 1);

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={setFeedback(setGood, good)} text={"Good"} />
      <Button handleClick={setFeedback(setNeutral, neutral)} text={"Neutral"} />
      <Button handleClick={setFeedback(setBad, bad)} text={"Bad"} />
      <Statistics text={"statistics"} good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
