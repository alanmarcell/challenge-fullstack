/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const MyPopupMarker = ({ content, position }) => (
  <Marker position={position}>
    <Popup>{content}</Popup>
  </Marker>
);

const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MyPopupMarker key={key} {...props} />
  ));
  return <>{items}</>;
};

export default class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        { key: 'marker1', position: [51.5, -0.1], content: 'My first popup' },
        { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
        { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' },
      ],
    };
  }

  mapMarkers(deliveries) {
    const markers = deliveries.map(delivery => ({
      key: delivery._id,
      position: [
        delivery.address.geoLocalization.latitude,
        delivery.address.geoLocalization.longitude,
      ],
      content: delivery.clientName,
    }));
    // this.setState(markers)
    return markers;
  }

  render() {
    // const { markers } = this.state;
    const markers = this.mapMarkers(this.props.deliveries);
    return (
      <div
        style={{
          backgroundColor: 'red',
          flex: 1,
          width: '100%',
          height: '50%',
        }}
      >
        <Map
          center={[-23.5653672, -46.6552215]}
          zoom={13}
          style={{ height: '100%' }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyMarkersList markers={markers} />
        </Map>
      </div>
    );
  }
}
