import * as actions from '../actions';

const initialState = {
  droneData: [],
  lastPosition: [],
  lastTemperature: 0,
  lastUoM: 'temperature - fahrenheit',
  lastAccuracy: 0,
  lastTimestamp: new Date()
};

const updateDroneData = (state, action) => {
  let droneData = action.data;
  let latestData = droneData.data.reduce((acc, datum) => {
    if (datum.timestamp >= acc.timestamp) {
      return datum;
    }
    else {
      return acc;
    }
  });
  return { 
    droneData: action.data, 
    lastPosition: [latestData.latitude, latestData.longitude],
    lastTemperature: latestData.metric,
    lastTimestamp: latestData.timestamp,
    lastUoM: latestData.uom
  }
};

const handlers = {
  [actions.UPDATE_DRONE_DATA]: updateDroneData
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
