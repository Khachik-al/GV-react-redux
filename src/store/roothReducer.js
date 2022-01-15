
import { combineReducers } from 'redux';
import AppReducer from './reducers/AppReducer';
import EventsReducer from './reducers/EventsReducer';
import EditEventReducer from './reducers/EditEventReducer';
import StaffReducer from './reducers/StaffReducer';
import StaffEditReducer from './reducers/StaffEditReducer';
import SettingsReducer from './reducers/SettingsReducer';
import CustomersReducer from './reducers/CustomersReducer';
import CalendarReducer from './reducers/CalendarReducer';
import VendorReducer from './reducers/VendorReducer';
import EventContractReducer from './reducers/EventContractReducer';

export const roothReducer = combineReducers({
  AppReducer,
  EventsReducer,
  StaffReducer,
  StaffEditReducer,
  SettingsReducer,
  EditEventReducer,
  CustomersReducer,
  CalendarReducer,
  VendorReducer,
  EventContractReducer
});