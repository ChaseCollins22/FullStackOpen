import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sumAllFeedback = () => good + neutral + bad;
  const getAverageFeedback = () => (good + (bad * -1)) / sumAllFeedback() || 0;
  const getPositiveFeedbackPercentage = () => (good / sumAllFeedback()) * 100 || 0;

  const statistics = () => {
    if(sumAllFeedback() === 0) return <p>No feedback given</p>
    return (
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allFeedback={sumAllFeedback()}
        averageFeedback={getAverageFeedback()}
        positiveFeebackPercentage={getPositiveFeedbackPercentage()}
      />
    )
  }
 
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)}  buttonText={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} buttonText={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} buttonText={'bad'} />
      <h1>Statistics</h1>
      {statistics()}
    </div>
  )
}

const Button = ({ handleClick, buttonText}) => {
  return <button onClick={handleClick}>{buttonText}</button>
}

const Statistic = ({ type, data, formatter='' }) => {
  return (
    <>
      <td>{type}</td>
      <td>{data}{formatter}</td>
    </>
  )
}


const Statistics = ({ good, neutral, bad, allFeedback, averageFeedback, positiveFeebackPercentage}) => {
  return (
    <table>
      <tbody>
        <tr><Statistic type={'Good'} data={good}/></tr>
        <tr><Statistic type={'Neutral'} data={neutral}/></tr>
        <tr><Statistic type={'Bad'} data={bad}/></tr>
        <tr><Statistic type={'All'} data={allFeedback}/></tr>
        <tr><Statistic type={'Average'} data={averageFeedback}/></tr>
        <tr><Statistic type={'Positive'} data={positiveFeebackPercentage} formatter={'%'}/></tr>
      </tbody>
    </table>
  )
}



export default App

