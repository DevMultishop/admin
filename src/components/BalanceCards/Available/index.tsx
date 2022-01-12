import React from 'react';

import { useGetCardBalanceSumQuery } from '../../../graphql/generated/graphql';
import Placeholder from '../Placeholder';
import { Container, Content, Footer } from '../styles';

export default function Avalilable(): JSX.Element {
  const { data, loading } = useGetCardBalanceSumQuery({
    variables: { card: 'available' },
  });

  if (loading) return <Placeholder />;

  return (
    <Container className="hover-animate">
      <Content>
        <p>Available</p>
        <h3>{data?.getCardBalanceSum}</h3>
      </Content>
      <Footer />
    </Container>
  );
}
