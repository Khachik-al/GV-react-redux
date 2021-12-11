
import { combineReducers } from 'redux';
import AppReducer from './reducers/AppReducer';
import EventsReducer from './reducers/EventsReducer';
import EditEventReducer from './reducers/EditEventReducer';
import StaffReducer from './reducers/StaffReducer';
import StaffEditReducer from './reducers/StaffEditReducer';
import SettingsReducer from './reducers/SettingsReducer';
import CustomersReducer from './reducers/CustomersReducer';

export const roothReducer = combineReducers({
  AppReducer,
  EventsReducer,
  StaffReducer,
  StaffEditReducer,
  SettingsReducer,
  EditEventReducer,
  CustomersReducer
});