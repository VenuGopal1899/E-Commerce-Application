import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(msg){ return { type: alertConstants.SUCCESS, msg}; }

function error(msg){ return { type: alertConstants.ERROR, msg}; }

function clear(){ return { type: alertConstants.CLEAR}; }