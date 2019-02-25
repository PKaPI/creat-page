import mirror from 'mirror-creator';
export const homeType= mirror([
  'GET_HOME_DATA',
  'GET_USER_DATA',
  'GET_NAV_DATA',
],'home/')
