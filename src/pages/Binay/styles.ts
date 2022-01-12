import styled from 'styled-components';

export const TreeContainer = styled.div`
  height: 600px;
  width: 100%;
  padding: 16px;
  /* border: 1px solid ${props => props.theme.color.primary}; */

  .rd3t-link {
    stroke: ${props => props.theme.color.fontColor};
    stroke-width: 2px;
  }
`;

export const NodeLabel = styled.div`
  color: ${props => props.theme.color.fontColor};
  background-color: ${({ theme }) => theme.color.backgroundCard};
  padding: 8px;
  text-align: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid ${props => props.theme.color.fontColor};

  &:hover {
    border-color: ${({ theme }) => theme.color.primary};
  }

  position: relative;
  > div {
    position: absolute;
    top: 4px;
    left: 45px;
    span {
      /* color: black; */
    }
  }
`;

interface IKeyProps {
  selected: boolean;
}

export const KeyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 16px;
  justify-content: center;
`;

export const KeyItem = styled.div<IKeyProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-left: 12px;
  margin-right: 12px;
  color: ${props =>
    props.selected ? props.theme.color.primary : props.theme.color.fontColor};
`;

export const BackButton = styled.div`
  font-size: 12px;
  position: absolute;
  top: 8px;
  /* left: 16px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.color.primary};
  }
`;
