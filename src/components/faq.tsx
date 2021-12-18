import React from "react";
import styled from "@emotion/styled";
import { Container, Paper, Box } from "@mui/material";

const questions = [
  {
    q: "How does this work?",
    a: `Santa was eager to inspire interest in science, technology, and worldwide cultures to children throughout the world. As a result he partnered with us and allowed for a Global Positioning Device to be placed on his sleigh to show his worldwide trip.`,
  },
  {
    q: "Why doesn't santa move constantly?",
    a: `Santa moves too fast! He is just too fast for our tracking devices to pick up all of his movements. We are only able to get his general location each minute.`,
  },
  {
    q: "What is the dashed line?",
    a: `Based on the past several Christmas's, we predict Santa's path to your community in the last hour or so of his journey there.`,
  },
  {
    q: "Why doesn't santa go directly over my house?",
    a: `He absolutely goes to your house! We are only able to calculate your community. So we just track Santa there!`,
  },
];

const FAQPaper = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: white;
  h1 {
    text-align: center;
  }
  p {
    line-height: 1.2rem;
  }
`;

const FAQ = () => {
  return (
    <Container maxWidth="md">
      <FAQPaper sx={{ mt: 2, p: 2 }}>
        <Box>
          <h1>Frequently Asked Questions</h1>
          {questions.map((question: { a: string; q: string }) => (
            <Box key={question.q} sx={{ p: 1 }}>
              <h2>{question.q}</h2>
              <p>{question.a}</p>
            </Box>
          ))}
        </Box>
      </FAQPaper>
    </Container>
  );
};

export default FAQ;
