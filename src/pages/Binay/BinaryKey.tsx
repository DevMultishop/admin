import React from 'react';
import { FiArrowDownLeft, FiArrowDownRight } from 'react-icons/fi';
import { Row, Col } from '../../components/Grid';
// import Panel from '../../components/Panel';
import ShimmerEffect from '../../components/Shimmer';
import {
  GetMyBinaryKeyDocument,
  useGetMyBinaryKeyQuery,
  useUpdateMyBinaryKeyMutation,
} from '../../graphql/generated/graphql';
import { KeyContainer, KeyItem } from './styles';

export default function BinaryKey(): JSX.Element {
  const { data: key, loading: loadingKey } = useGetMyBinaryKeyQuery();
  const [updateKey, { loading: loadingUpdate }] =
    useUpdateMyBinaryKeyMutation();
  const handleClick = React.useCallback(
    (position: string) => {
      try {
        updateKey({
          variables: { position },
          refetchQueries: [{ query: GetMyBinaryKeyDocument }],
        });
      } catch {
        // do nothing
      }
    },
    [updateKey],
  );
  return (
    <Row>
      <Col>
        <KeyContainer>
          {loadingKey || (loadingUpdate && <ShimmerEffect height={44} />)}
          {!loadingKey && !loadingUpdate && (
            <>
              <KeyItem
                selected={key?.getMyBinaryKey.position === 'left'}
                onClick={() => handleClick('left')}
              >
                LEFT
                <FiArrowDownLeft size={30} />
              </KeyItem>

              <KeyItem
                selected={key?.getMyBinaryKey.position === 'automatic'}
                onClick={() => handleClick('automatic')}
              >
                AUTO
                <div>
                  <FiArrowDownLeft size={30} />
                  <FiArrowDownRight size={30} />
                </div>
              </KeyItem>

              <KeyItem
                selected={key?.getMyBinaryKey.position === 'right'}
                onClick={() => handleClick('right')}
              >
                RIGHT
                <FiArrowDownRight size={30} />
              </KeyItem>
            </>
          )}
        </KeyContainer>
        {/* </Panel> */}
      </Col>
    </Row>
  );
}
