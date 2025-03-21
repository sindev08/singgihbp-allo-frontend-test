interface IDimensions {
  meters: number;
  feet: number;
}

interface IMass {
  kg: number;
  lb: number;
}

interface IThrust {
  kN: number;
  lbf: number;
}

interface IFirstStage {
  thrust_sea_level: IThrust;
  thrust_vacuum: IThrust;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

interface ICompositeFairing {
  height: IDimensions;
  diameter: IDimensions;
}

interface Payloads {
  composite_fairing: ICompositeFairing;
  option_1: string;
}

interface ISecondStage {
  thrust: IThrust;
  payloads: Payloads;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

interface ISP {
  sea_level: number;
  vacuum: number;
}

interface IEngines {
  isp: ISP;
  thrust_sea_level: IThrust;
  thrust_vacuum: IThrust;
  number: number;
  type: string;
  version: string;
  layout: string;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
}

interface ILandingLegs {
  number: number;
  material: string;
}

interface IPayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}
// interface khusus response API
export interface IResRocket {
  height: IDimensions;
  diameter: IDimensions;
  mass: IMass;
  first_stage: IFirstStage;
  second_stage: ISecondStage;
  engines: IEngines;
  landing_legs: ILandingLegs;
  payload_weights: IPayloadWeight[];
  flickr_images: string[];
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  id: string;
}

export interface IRocket {
  id: string;
  name: string;
  description: string;
  image: string;
}
