import { SET_MESSAGE } from '../actionTypes';

export function loader(type)
{
  return { type };
}

export function setMessage(message, messageType)
{
  return {
    type: SET_MESSAGE,
    message,
    messageType,
  };
}
