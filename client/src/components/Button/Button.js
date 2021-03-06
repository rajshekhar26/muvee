import styled from 'styled-components'

const Button = styled.button`
  background-color: ${({ noBackground }) =>
    noBackground
      ? props => props.theme.primary3
      : props => props.theme.primary2}};

  background-position: center;
  border-radius: 0.5em;

  color: ${({ noBackground }) =>
    noBackground ? props => props.theme.primary : '#fff'}};

  font-weight: 600;
  padding: 1em 1.5em;
  text-transform: capitalize;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  transition: background 0.8s;
  transition: ${({ noBackground }) =>
    noBackground && 'background-color linear 0.2s'};

  &:hover,
  &:focus {
    color: #fff;
    background: ${({ theme }) =>
      theme.primary} radial-gradient(circle, transparent 1%, ${({ theme }) =>
  theme.primary} 1%) center/15000%;
  }

  &:active {
    background-color: ${({ theme }) => theme.primary2};
    background-size: 100%;
    transition: background 0s;
  }
`

export default Button
