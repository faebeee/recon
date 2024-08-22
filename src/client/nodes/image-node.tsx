import {Handle, Position} from '@xyflow/react';

const handleStyle = {left: 10};

export function ImageNode({data}) {
  return (
    <>
      <Handle type="target" position={Position.Top}/>
      <div>
        <h1>{data.label}</h1>
        <img width={100} height={200}
             src={data.url}/>
      </div>
      <Handle type="source" position={Position.Bottom} id="a"/>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}