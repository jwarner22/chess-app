import React from "react";
import PropTypes from "prop-types";
import { Chessground as NativeChessground } from "chessground";

export default class Chessground extends React.Component {
  static types = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fen: PropTypes.string,
    orientation: PropTypes.string,
    turnColor: PropTypes.string,
    check: PropTypes.string,
    lastMove: PropTypes.array,
    selected: PropTypes.string,
    coordinates: PropTypes.bool,
    autoCastle: PropTypes.bool,
    viewOnly: PropTypes.bool,
    disableContextMenu: PropTypes.bool,
    resizable: PropTypes.bool,
    addPieceZIndex: PropTypes.bool,
    highlight: PropTypes.object,
    animation: PropTypes.object,
    movable: PropTypes.object,
    premovable: PropTypes.object,
    predroppable: PropTypes.object,
    draggable: PropTypes.object,
    selectable: PropTypes.object,
    onChange: PropTypes.func,
    onMove: PropTypes.func,
    onDropNewPiece: PropTypes.func,
    onSelect: PropTypes.func,
    items: PropTypes.object,
    drawable: PropTypes.object
  };

  static defaultProps = {
    coordinates: true,
    resizable: true,
    highlight: {
      lastMove: false,
      check: true
    },
    disableContextMenu: false,
    animation: {
      enabled: true,
      duration: 350
    }
  };

  buildConfigFromProps(props) {
    const config = { events: {} };
    Object.keys(Chessground.types).forEach((k) => {
      const v = props[k];
      if (typeof v !== "undefined") {
        const match = k.match(/^on([A-Z]\S*)/);
        if (match) {
          config.events[match[1].toLowerCase()] = v;
        } else {
          config[k] = v;
        }
      }
    });
    return config;
  }

  componentDidMount() {
    NativeChessground(this.el, this.buildConfigFromProps(this.props));
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      NativeChessground(this.el, this.buildConfigFromProps(this.props));
    }
  }

  render() {
    console.log("rendered chessground");
    const props = { style: { ...this.props.style } };
    if (this.props.width) {
      props.style.width = this.props.width;
    }
    if (this.props.height) {
      props.style.height = this.props.height;
    }
    return <div ref={(el) => (this.el = el)} {...props} />;
  }
}
