import styled from "styled-components";

export const BodyContainer = styled.div`
  width: 100%;
  height: 93vh;
  margin-top: 7vh;
  display: flex;
`

export const ComponentContainer = styled.div`
  width: fit-content;
  flex-grow: 1;
  height: 93vh;
  padding: 10px;
  background-color: #d9d9d9;
`

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: #FFFFFF;
    border-radius: 15px;
    overflow-y: auto;
`

export const CustomHeading = styled.h1`
  font-size: 25px;
  height: 40px;
  padding: 0px;
  display: flex;
  align-items: center;
`

export const CustomTable = styled.table`
  width: 100%;
  height: fit-content;
  border-radius: 15px;
  overflow-y: auto;
`

export const TableBody = styled.tbody``;

export const TableContainer = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar{
      width: 7px;
  }
  &::-webkit-scrollbar-track{
      background: transparent;
  }
`

export const TableData = styled.td`
  padding: 8px;
`

export const TableHead = styled.thead`
  border-radius: 15px;
`

export const TableHeader = styled.th`
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
  margin: 5px;
  height: 20%;
  background-color: #363946;
  color: #fff;
  border: none;
  position: sticky;
  top: 0;
`

export const TableRow = styled.tr`
  border-bottom: 1px solid #D9D9D9;
    &:hover {
        background-color: #D9D9D9;
    }
`

export const TrashContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0px;
  background-color: #fff;
`