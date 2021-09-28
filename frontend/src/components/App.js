import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {ChakraProvider, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react"

function App() {
  const [forwards, setData1] = useState(null);
  const [payments, setData2] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/forwards/")
      .then(res => res.json())
      .then(forwards => setData1(forwards));
      fetch("http://127.0.0.1:8000/api/payments?status=2")
      .then(res => res.json())
      .then(payments => setData2(payments));
  }, []);

  if (!forwards) {
      return <div>Loading...</div>;
  }

  if (!payments) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Table size="sm" variant="striped" colorScheme="gray">
        <TableCaption placement="top">Forwards</TableCaption>
        <Thead>
          <Tr>
            <Th>From</Th>
            <Th>To</Th>
            <Th isNumeric>Amount</Th>
            <Th isNumeric>Fee</Th>
          </Tr>
        </Thead>
        <Tbody>
          {forwards.map(forward => <tr><Td>{forward.chan_in_alias}</Td>
            <Td>{forward.chan_out_alias}</Td>
            <Td>{forward.amt_out_msat}</Td>
            <Td>{forward.fee}</Td>
          </tr>)}
        </Tbody>
      </Table>
      <Table float="left" size="sm" variant="striped" colorScheme="gray">
        <TableCaption placement="top">Payments</TableCaption>
        <Thead>
          <Tr>
            <Th>Chan Out</Th>
            <Th>Chan Out Alias</Th>
            <Th isNumeric>Amount</Th>
            <Th isNumeric>Fee</Th>
            <Th>Message</Th>
          </Tr>
        </Thead>
        <Tbody>
          {payments.map(payment => <tr><Td>{payment.chan_out}</Td>
            <Td>{payment.chan_out_alias}</Td>
            <Td>{payment.value}</Td>
            <Td>{payment.fee}</Td>
            <Td>{payment.message}</Td>
          </tr>)}
        </Tbody>
      </Table>
    </div>
  );
}

const rootElement = document.getElementById("app");
ReactDOM.render(<ChakraProvider><App /></ChakraProvider>, rootElement);