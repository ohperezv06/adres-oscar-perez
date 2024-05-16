import { createFeatureSelector, createSelector } from '@ngrx/store';
import { acquisitionsFeatureName, IAppState } from '@store/state/app.state';

const appState = createFeatureSelector<IAppState>(acquisitionsFeatureName);

export const acquisitionsSelector = createSelector(
  appState,
  (state) => {
    return state.loadAcquisitions
  }
);

export const acquisitionByIdSelector = (id: number) =>
  createSelector(
    acquisitionsSelector,
    (acquisitionState) => acquisitionState.acquisitions.find((acquisition) => acquisition.id === id)
  );

export const createAcquisitionSelector = createSelector(
  appState,
  (state) => {
    return state.createAcquisition
  }
);

export const updateAcquisitionSelector = createSelector(
  appState,
  (state) => {
    return state.updateAcquisition
  }
);

export const deleteAcquisitionSelector = createSelector(
  appState,
  (state) => {
    return state.deleteAcquisition
  }
);

export const acquisitionHistorySelector = createSelector(
  appState,
  (state) => {
    return state.loadAcquisitionHistory
  }
);
