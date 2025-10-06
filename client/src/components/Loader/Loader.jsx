import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    border: 4px solid rgba(0, 0, 0, 0.5);
    border-left-color: transparent;
    border-radius: 50%;
  }

  .loader {
    border: 4px solid rgba(0, 0, 0, 0.5);
    border-left-color: transparent;
    width: 25px;
    height: 25px;
  }

  .loader {
    border: 3px solid rgba(0, 0, 0, 0.5);
    border-left-color: transparent;
    width: 25px;
    height: 25px;
    animation: spin89345 1s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
