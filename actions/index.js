import Action from './actions';

export const openInfoDialog = () => ({
  type: Action.INFO_DIALOG_OPEN,
});

export const closeInfoDialog = () => ({
  type: Action.INFO_DIALOG_CLOSE,
});
