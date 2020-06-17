import React, { createContext, useReducer, useContext } from "react";

import {
  CLEAR_ALL,
  LOADING,
  SET_CURRENT_USER,
  LOGGEDIN,
  SET_ANNOUNCEMENTS,
  SET_BULLETINS,
  SET_NOTIFICATIONS,
  SET_USERS,
  SET_ALL_USERS,
  SET_SENT_MESSAGES,
  SET_RECEIVED_MESSAGES,
  SET_FILES,
  SET_PROPERTY,
  SET_OPENREQUESTS,
  SET_CLOSEDREQUESTS,
  SET_PROPERTYOPENREQUESTS,
  SET_PROPERTYCLOSEDREQUESTS,
  SET_REQUEST,
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          id: action.currentUser.id,
          username: action.currentUser.username,
          role: action.currentUser.role,
          firstName: action.currentUser.firstName,
          lastName: action.currentUser.lastName,
          phoneNumber: action.currentUser.phoneNumber,
          aptNumber: action.currentUser.aptNumber,
          email: action.currentUser.email,
          instructions: action.currentUser.instructions,
          file: action.currentUser.file,
          property: action.currentUser.property,
        },
      };
    case LOGGEDIN:
      return {
        ...state,
        loggedIn: true,
      };
    case SET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.announcements,
      };
    case SET_BULLETINS:
      return {
        ...state,
        bulletins: action.bulletins,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    case SET_SENT_MESSAGES:
      return {
        ...state,
        sentmessages: action.sentmessages,
      };
    case SET_RECEIVED_MESSAGES:
      return {
        ...state,
        receivedmessages: action.receivedmessages,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };
    case SET_FILES:
      return {
        ...state,
        uploadedfiles: action.uploadedfiles,
      };
    case SET_PROPERTY:
      return {
        ...state,
        currentproperty: action.currentproperty,
      };
    case SET_OPENREQUESTS:
      return {
        ...state,
        openrequests: action.openrequests,
      };
    case SET_CLOSEDREQUESTS:
      return {
        ...state,
        closedrequests: action.closedrequests,
      };
    case SET_PROPERTYOPENREQUESTS:
      return {
        ...state,
        propertyopenrequests: action.propertyopenrequests,
      };
    case SET_PROPERTYCLOSEDREQUESTS:
      return {
        ...state,
        propertyclosedrequests: action.propertyclosedrequests,
      };
    case SET_REQUEST:
      return {
        ...state,
        selectedrequest: {
          id: action.selectedrequest.id,
          request: action.selectedrequest.request,
          notes: action.selectedrequest.notes,
          SenderId: action.selectedrequest.SenderId,
          senderFirstName: action.selectedrequest.senderFirstName,
          senderLastName: action.selectedrequest.senderLastName,
          senderPhone: action.selectedrequest.senderPhone,
          senderAptNum: action.selectedrequest.senderAptNum,
          status: action.selectedrequest.status,
        },
      };
    case CLEAR_ALL:
      return {
        currentUser: {
          id: 0,
          username: "",
          role: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          aptNumber: 0,
          email: "",
          instructions: "",
          file: "",
          property: "",
        },
        loggedIn: false,
        loading: false,
        announcements: [],
        bulletins: [],
        users: [],
        allUsers: [],
        sentmessages: [],
        receivedmessages: [],
        uploadedfiles: [],
        currentproperty: 0,
        openrequests: [],
        closedrequests: [],
        propertyopenrequests: [],
        propertyclosedrequests: [],
        selectedrequest: {
          id: 0,
          request: "",
          notes: "",
          SenderId: 0,
          senderFirstName: "",
          senderLastName: "",
          senderPhone: "",
          senderAptNum: 0,
          status: false,
        },
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    currentUser: {
      id: 0,
      username: "",
      role: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      aptNumber: 0,
      email: "",
      instructions: "",
      file: "",
      property: "",
    },
    loading: false,
    loggedIn: false,
    announcements: [],
    bulletins: [],
    notifications: [],
    users: [],
    allUsers: [],
    sentmessages: [],
    receivedmessages: [],
    uploadedfiles: [],
    currentproperty: 0,
    openrequests: [],
    closedrequests: [],
    propertyopenrequests: [],
    propertyclosedrequests: [],
    selectedrequest: {
      id: 0,
      request: "",
      notes: "",
      SenderId: 0,
      senderFirstName: "",
      senderLastName: "",
      senderPhone: "",
      senderAptNum: 0,
      status: false,
    },
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
