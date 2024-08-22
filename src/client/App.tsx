import React, {useCallback, useMemo, useState} from "react";

import classes from './app.module.scss';
import {addEdge, ReactFlow, useEdgesState, useNodesState} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {v4} from "uuid";
import {ImageNode} from "./nodes/image-node";
import {useMount} from "react-use";

// const store = new Store();

export const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = useMemo(() => ({image: ImageNode}), []);

  useMount(() => {
    window.backendApi.loadNodes().then((n) => setNodes(n ?? []))
    window.backendApi.loadEdges().then((n) => setEdges(n ?? []))
  });

  const onSaveClicked = () => {
    window.backendApi.saveNodes(nodes);
    window.backendApi.saveEdges(edges);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const addNode = () => {
    setNodes([...nodes, {id: v4(), position: {x: 0, y: 0}, data: {url: imageUrl}, type: 'image',}])
  }

  const onClearClicked = () => {
    window.backendApi.saveNodes([]);
    window.backendApi.saveEdges([]);
  }

  return <div className={classes.root}>
    <h1>Dashboard</h1>
    <div className={classes.viewer}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
    <div>
      <input onChange={e => setImageUrl(e.target.value)} type={'text'}/>
      <button onClick={addNode}>Add</button>
      <button onClick={onSaveClicked}>Save</button>
      <button onClick={onClearClicked}>Clear</button>
    </div>
  </div>
}