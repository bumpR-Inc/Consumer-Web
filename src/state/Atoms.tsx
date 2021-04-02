import { atom, AtomEffect } from "recoil";
import { recoilPersist } from 'recoil-persist'
import { IGroup, ILocation, IProfile } from "./interfaces";

const landingStatePersist = recoilPersist({ key: 'landingPageState' });
export const landingPageState = atom({
  key: 'landingPage', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
  effects_UNSTABLE: [landingStatePersist.persistAtom],
});

const locationStatePersist = recoilPersist({ key: 'locationState' });
export const locationState = atom<ILocation>({
  key: 'location',
  default: { 'address': undefined, 'geocode': undefined },
  effects_UNSTABLE: [locationStatePersist.persistAtom],
});

const groupStatePersist = recoilPersist({ key: 'groupState' });
export const groupState = atom<IGroup>({
  key: 'group',
  default: { pk: undefined, members_info: [] },
  effects_UNSTABLE: [groupStatePersist.persistAtom],
});
