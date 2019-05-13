import React from "react";
import { Icon } from "expo";

export class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3, backgroundColor: "transparent" }}
        // color={this.props.focused ? "#c69" : "#666"}
        // color={this.props.focused ? this.props.tintColor : this.props.inactiveTintColor}
        color={this.props.tintColor}
      />
    );
  }
}
