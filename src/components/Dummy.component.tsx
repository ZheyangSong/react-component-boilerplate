import "./Dummy.style";

import * as React from "react";

export interface DummyProps {
  name: string;
  description: string;
}

export class Dummy extends React.Component<DummyProps, undefined> {
  render() {
    return (
      <div className="dummy-wrapper">
        <h2 className="dummy-title">{this.props.name}</h2>
        <p className="dummy-content">{this.props.description}</p>
      </div>
    )
  }
}