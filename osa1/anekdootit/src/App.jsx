import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

const AnecdoteBox = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
      <Anecdote anecdote={props.anecdote} votes={props.votes} />
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getMostVoted = () => {
    let maxIndex = 0;
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > votes[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex;
  };
  let mostVoted = getMostVoted();

  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  
  const addVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected]++;
    setVotes(votesCopy);
  };

  return (
    <div>
      <AnecdoteBox
        text={"Anecdote of the day"}
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button text={"vote"} handleClick={addVote} />
      <Button text={"next anecdote"} handleClick={selectRandom} />
      {votes[mostVoted] > 0 ? (
        <AnecdoteBox
          text={"Anecdote with most votes"}
          anecdote={anecdotes[mostVoted]}
          votes={votes[mostVoted]}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
