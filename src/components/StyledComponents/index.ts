import styled from "styled-components";

export const Div = styled.div``;

export const Container = styled.div`
  max-width: 1240px;
  margin: auto;
`;

export const Table = styled.table`
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
  border-collapse: collapse;
  text-align: center;
  margin-top: 15px;

`;

export const THead = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
`;

export const Tr = styled.tr`
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
`;

export const Th = styled.th`
  cursor: pointer;
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
`;



export const TBody = styled.tbody`
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
`;

export const Td = styled.td`
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
`;
