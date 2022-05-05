import styled, { createGlobalStyle } from "styled-components"

const dark = "#333138"
const light = "#fffffa"

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.darkMode ? dark : light};
  }
`

export const Section = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Card = styled.div`
  padding: 25px;
  display: inline-block;
  border-radius: 8px;
  background-color: ${props => props.darkMode ? dark : light };
  border: 1px solid ${props => props.darkMode ? light : dark };
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`

export const Legend = styled.legend`
  font-size: 1.5em;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.darkMode ? "#fffffa" : "#333138" };
`

export const Input = styled.input`
  padding: 12px 20px;
  width: 100%;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  border-bottom: 2px solid #ff312e;
  background-color: ${props => props.darkMode ? "#515052" : "#f8f8f4"};
  &::placeholder {
    color: ${props => props.darkMode ? "#fffffa" : "#333138" };
  }
}
`

export const CtaButton = styled.button`
  width: 100%;
  background: #ff312e; 
  color: #fff;
  padding: 12px 20px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`
