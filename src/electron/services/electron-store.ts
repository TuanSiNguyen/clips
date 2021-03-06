import { SettingsState, Clip, User } from '../../store/types';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';
import uuidv4 from 'uuid/v4';
import Store from 'electron-store';
import { isSpaceAvailable } from '@/utils/clipsize';
import log from 'electron-log';

const store = new Store();

const indexes = {
  userId: 'app-user-id',
  appSettings: 'app-settings',
  credentials: 'credentials',
  pageToken: 'page-token',
  clips: 'clips',
  user: 'user',
  premium: 'premium',
};

function getUserId() {
  const userId: string = store.get(indexes.userId, uuidv4());
  store.set(indexes.userId, userId);
  return userId;
}

function getUser(defaultValue?: User) {
  return store.get(indexes.user, defaultValue);
}

function getClips(defaultValue: Clip[] = []) {
  return store.get(indexes.clips, defaultValue);
}

function getPageToken(defaultValue?: string) {
  return store.get(indexes.pageToken, defaultValue);
}

function getCredentials(defaultValue?: Credentials) {
  return store.get(indexes.credentials, defaultValue);
}

function getAppSettings(defaultValue?: SettingsState) {
  return store.get(indexes.appSettings, defaultValue);
}

function getPremium() {
  return store.get(indexes.premium, false);
}

function setUser(value: User) {
  return store.set(indexes.user, value);
}

function setClips(value: Clip[]) {
  // Check size of the file. Ignore action if soace
  if (isSpaceAvailable(value)) store.set(indexes.clips, value);
  else log.warn('File size exceeds the limit allowed and cannot be saved');
}

function setPageToken(value: string) {
  return store.set(indexes.pageToken, value);
}

function setCredentials(value: Credentials) {
  return store.set(indexes.credentials, value);
}

function setAppSettings(value: SettingsState) {
  return store.set(indexes.appSettings, value);
}

function setPremium(value: Boolean) {
  return store.set(indexes.premium, value);
}

function removeUser() {
  return store.delete(indexes.user);
}

function removeClips() {
  return store.delete(indexes.clips);
}

function removeCredentials() {
  return store.delete(indexes.credentials);
}

function clear() {
  store.clear();
}

interface StoreService {
  getUserId(): string;
  getUser(): User | undefined;
  getUser(defaultValue: User): User;
  getClips(defaultValue?: Clip[]): Clip[];
  getPageToken(): string | undefined;
  getPageToken(defaultValue: string): string;
  getCredentials(): Credentials | undefined;
  getCredentials(defaultValue: Credentials): Credentials;
  getAppSettings(): SettingsState | undefined;
  getAppSettings(defaultValue: SettingsState): SettingsState;
  getPremium(): boolean;
  setUser(defaultValue: User): void;
  setClips(value: Clip[]): void;
  setPageToken(value: string): void;
  setCredentials(value: Credentials): void;
  setAppSettings(value: SettingsState): void;
  setPremium(value: boolean): void;
  removeUser(): void;
  removeClips(): void;
  removeCredentials(): void;
  clear(): void;
}

export const storeService: StoreService = {
  getUserId,
  getUser,
  getClips,
  getPageToken,
  getCredentials,
  getAppSettings,
  getPremium,
  setUser,
  setClips,
  setPageToken,
  setCredentials,
  setAppSettings,
  setPremium,
  removeUser,
  removeClips,
  removeCredentials,
  clear,
};
