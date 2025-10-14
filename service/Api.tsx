import rawData from './rawData.json';

export interface APIResponse {
  interesting: GainersAndLooser[];
  gainersAndLoosers: GainersAndLooser[];
}

export interface GainersAndLooser {
  scrip_cd: number;
  scripname: string;
  LONG_NAME: string;
  scrip_grp: string;
  openrate: number;
  highrate: number;
  lowrate: number;
  ltradert: number;
  prevdayclose: number;
  change_val: number;
  change_percent: number;
  index_code: string;
  trd_val: number;
  trd_vol: number;
  nooftrd: number;
  trend: string;
  dt_tm: Date;
  Ishighflag: number;
  IsLowflag: number;
  URL: string;
  NSUrl: string;
}
export enum ScreenType {
  GAINERS = 'gainers',
  LOOSERS = 'loosers',
}

const Api = {
  get: async (type: string): Promise<APIResponse> => {
    const resp = await fetch(
      `https://k385gahq48.execute-api.ap-south-1.amazonaws.com/dev/market?type=${type}`,
    );
    return resp.json();
    // console.log(type);
    // return Promise.resolve(rawData);
  },
};

export default Api;
