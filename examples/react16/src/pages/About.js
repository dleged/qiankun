import React from 'react';
import styled from 'styled-components';

const Page = styled.p`
margin-top: 16px;
  padding: 12px 24px;
  font-size: 24px;
  color: green;
`;

export default function () {
  return (
    <div>
      <h2 className="app-nav-item" style={{ borderColor: 'green' }}>
        About
      </h2>
      <Page>This is about page</Page>
    </div>
  );
}
