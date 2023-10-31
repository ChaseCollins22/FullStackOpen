import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getRandomIndex = () => setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteForAnecdote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  }

  const getHighestVotedAnecdoteIdx = () => votes.indexOf(Math.max.apply(null, votes));
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdoteText={anecdotes[selected]}/>
      <AnecdoteVotes numVotes={votes[selected]}/>
      <Button handleClick={voteForAnecdote} text={'Vote'}/>
      <Button handleClick={getRandomIndex} text={'Next anecdote'}/>
      <h1>Most popular ancedote</h1>
      <Anecdote anecdoteText={anecdotes[getHighestVotedAnecdoteIdx()]}/>
      <AnecdoteVotes numVotes={votes[getHighestVotedAnecdoteIdx()]}/>
    </div>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Anecdote = ({ anecdoteText }) => <p>{anecdoteText}</p>

const AnecdoteVotes = ({ numVotes }) => <p>***Total votes: {numVotes}</p>


export default App
