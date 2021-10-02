import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {ChakraProvider, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Progress, Button } from "@chakra-ui/react"

function Home() {
  const [channels, setData1] = useState(null);
  const [forwards, setData2] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/channels/?is_open=true&is_active=true")
      .then(res => res.json())
      .then(channels => setData1(channels.results));
    fetch("http://127.0.0.1:8000/api/forwards/?limit=10")
      .then(res => res.json())
      .then(forwards => setData2(forwards.results));
  }, []);
  
  if (!channels) {
    return <div>Loading...</div>;
  }

  if (!forwards) {
      return <div>Loading...</div>;
  }

  return (
    <div class="Home">
      <div class="Channels">
        <Table size="sm" variant="striped" colorScheme="gray">
          <TableCaption placement="top">Channels</TableCaption>
          <Thead>
            <Tr>
              <Th>Channel ID</Th>
              <Th>Peer PubKey</Th>
              <Th>Peer Alias</Th>
              <Th isNumeric>Capacity</Th>
              <Th isNumeric>Outbound Liquidity</Th>
              <Th width="15%">Visualize</Th>
              <Th isNumeric>Inbound Liquidity</Th>
              <Th isNumeric>Unsettled Liquidity</Th>
              <Th isNumeric>Local Base Fee</Th>
              <Th isNumeric>Local Fee Rate</Th>
              <Th isNumeric>Remote Base Fee</Th>
              <Th isNumeric>Remote Base Fee</Th>
              <Th>Target</Th>
              <Th>Toggle</Th>
            </Tr>
          </Thead>
          <Tbody>
            {channels.map(channel => <tr><Td>{channel.chan_id}</Td>
              <Td>{channel.remote_pubkey}</Td>
              <Td>{channel.alias}</Td>
              <Td>{channel.capacity}</Td>
              <Td>{channel.local_balance}</Td>
              <Td><Progress hasStripe min="0" max="1" colorScheme="blue" value={channel.local_balance / channel.capacity} /></Td>
              <Td>{channel.remote_balance}</Td>
              <Td>{channel.unsettled_balance}</Td>
              <Td>{channel.local_base_fee}</Td>
              <Td>{channel.local_fee_rate}</Td>
              <Td>{channel.remote_base_fee}</Td>
              <Td>{channel.remote_fee_rate}</Td>
              <Td>{channel.auto_rebalance ? "Yes" : "No"}</Td>
              <Td><Button size="xs" colorScheme="blue" /></Td>
            </tr>)}
          </Tbody>
        </Table>
      </div>
      <div class="Forwards">
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
      </div>
    </div>
  );
}

const rootElement = document.getElementById("app");
ReactDOM.render(<ChakraProvider><Home /></ChakraProvider>, rootElement);