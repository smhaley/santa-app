import React from "react";
import styled from "@emotion/styled";
import { Container, Paper, Box } from "@mui/material";
import {faqContent} from '../content/faq.content'


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
    <Container maxWidth="md" sx = {{mb:3}}>
      <FAQPaper sx={{ mt: 2, p: 2 }}>
        <Box>
          <h1>Frequently Asked Questions</h1>
          {faqContent.map((question: { a: string; q: string }) => (
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
