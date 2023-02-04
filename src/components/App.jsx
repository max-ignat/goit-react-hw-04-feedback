import {  useState} from 'react';
import { Box } from './Box';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';
import { Container } from './App.styled';


const App = () => {
  const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
  });

const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    const total = good + neutral + bad;
    return total;
  };
const onLeaveFeedback = feedback => {
    setFeedback(prevState => {
  return {  ...prevState, [feedback ]: prevState[feedback] +1}
    });
  };
  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    return Math.round((good / countTotalFeedback()) * 100);
  }; 
  const  makeOptions = () => {
      let options = Object.keys(feedback);
      return options;
    };
  
  const { good, neutral, bad } = feedback;
  return (
    <Box as="main" py={3} width="100%">
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={makeOptions()}
            onLeaveFeedback={onLeaveFeedback}
          />
        </Section>
        {countTotalFeedback() ? (
          <Section title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          </Section>
        ) : (
          <Notification text="There is no feedback yet!" />
        )}
      </Container>
    </Box>
  );
}
export default App;
