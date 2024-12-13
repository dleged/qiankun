import React from 'react';
import styled from 'styled-components';

const Page = styled.p`
margin-top: 16px;
  padding: 12px 24px;
  font-size: 24px;
  color: red;
`;

export default function () {
  return (
    <div>
      <h2 className="app-nav-item" style={{ borderColor: 'red' }}>
        Home
      </h2>
      <Page>This is home page</Page>
    </div>
  );
}
