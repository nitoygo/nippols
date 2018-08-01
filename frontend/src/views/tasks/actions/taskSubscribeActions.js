import { UPDATE } from 'react-admin';

// TODO: create common definitions for backend and frontend
export const TASK_SUBSCRIBE = 'TASK_SUBSCRIBE';
export const TASK_UNSUBSCRIBE = 'TASK_UNSUBSCRIBE';

export const taskSubscribe = (id, data, basePath) => ({
    type: TASK_SUBSCRIBE,
    payload: { id, data: { ...data, action: TASK_SUBSCRIBE } },
    meta: { resource: 'task', fetch: UPDATE },
});

export const taskUnsubscribe = (id, data, basePath) => ({
    type: TASK_UNSUBSCRIBE,
    payload: { id, data: { ...data, action: TASK_UNSUBSCRIBE } },
    meta: { resource: 'task', fetch: UPDATE },
});
