/* eslint-disable no-empty */
import React from 'react';
import Tree from 'react-d3-tree';
import { FiArrowUp } from 'react-icons/fi';

import { Row, Col } from '../../components/Grid';
import ShimmerEffect from '../../components/Shimmer';
import { useGetBinaryTreeLazyQuery } from '../../graphql/generated/graphql';

import { TreeContainer, NodeLabel, BackButton } from './styles';

const foreignObjectProps = {
  width: 140,
  height: 140,
  x: -70,
  y: -70,
  fontSize: 12,
};

export default function BinaryTree(): JSX.Element {
  const [tree, setTree] = React.useState<any>({});
  const [getBinaryTree, { loading }] = useGetBinaryTreeLazyQuery();
  React.useEffect(() => {
    getBinaryTree({
      variables: {
        going_up: false,
      },
    }).then(r => setTree(JSON.parse(r.data?.getBinaryTree || '')));
  }, [getBinaryTree]);

  // const handleNodeClick = React.useCallback(
  //   async (id, going_up = false) => {
  //     if (id && id !== tree.id)
  //       getBinaryTree({ variables: { clicked_user_id: id, going_up } }).then(
  //         r => {
  //           setTree(JSON.parse(r.data?.getBinaryTree || ''));
  //         },
  //       );
  //   },
  //   [getBinaryTree, tree.id],
  // );

  const renderRectSvgNode = React.useCallback(
    ({ nodeDatum }) => (
      <g
        onClick={() => {
          getBinaryTree({
            variables: { clicked_user_id: nodeDatum.id, going_up: false },
          }).then(r => {
            setTree(JSON.parse(r.data?.getBinaryTree || ''));
          });
        }}
      >
        {/* <image
          xlinkHref={avatar}
          x="-30"
          y="-30"
          height="60"
          width="60"
          onClick={() => handleNodeClick(nodeDatum.id)}
        /> */}
        {nodeDatum.id && (
          <foreignObject {...foreignObjectProps}>
            <NodeLabel>
              <div>
                <span>{`Depth: ${nodeDatum.line_number}`}</span>
              </div>

              {!loading && (
                <strong style={{ padding: 4 }}>{nodeDatum.name}</strong>
              )}
              {!loading && (
                <strong style={{ padding: 4 }}>{nodeDatum.phone_number}</strong>
              )}
              {!loading && (
                <strong style={{ padding: 4 }}>{nodeDatum.plan}</strong>
              )}
              {loading && (
                <strong>
                  <ShimmerEffect type="title" />
                </strong>
              )}
            </NodeLabel>
          </foreignObject>
        )}
      </g>
    ),
    [getBinaryTree, loading],
  );

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Row>
      <Col className="span-12">
        <TreeContainer ref={ref}>
          <BackButton
            onClick={() => {
              getBinaryTree({
                variables: {
                  going_up: true,
                  clicked_user_id: tree.id,
                },
              }).then(r => {
                setTree(JSON.parse(r.data?.getBinaryTree || ''));
              });
            }}
          >
            <FiArrowUp size={24} />
            GO UP
          </BackButton>
          <Tree
            separation={{ siblings: 1, nonSiblings: 1 }}
            nodeSize={{ x: 160, y: 160 }}
            collapsible={false}
            data={tree}
            translate={{ x: (ref.current?.offsetWidth || 0) / 2, y: 80 }}
            renderCustomNodeElement={
              rd3tProps =>
                renderRectSvgNode({ ...rd3tProps, foreignObjectProps })
              // do nothing
            }
            orientation="vertical"
            pathFunc="diagonal"
            zoomable={false}
          />
        </TreeContainer>
      </Col>
    </Row>
  );
}
