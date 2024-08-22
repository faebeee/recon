import {useCallback} from 'react';
import {Handle, Position} from '@xyflow/react';

const handleStyle = {left: 10};

export function ImageNode({data}) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  console.log(data);

  return (
    <>
      <Handle type="target" position={Position.Top}/>
      <div>
        <h1>{data.label}</h1>
        <img width={100} height={200}
             src={'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}/>
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