export type MessageDonation = {
  id: number;
  name: string;
  amount: string;
  formatted_amount: string;
  formattedAmount: string;
  message: string;
  currency: string;
  emotes?: unknown;
  iconClassName: string;
  to: {
    name: string;
  };
  from: string;
  from_user_id?: string;
  _id: string;
};

export type MessageSubscription = {
  name: string;
  months: number;
  message: string;
  emotes?: unknown;
  sub_plan: string;
  sub_plan_name: string;
  sub_type: string;
  streak_months?: number;
  count?: number;
  _id: string;
};

export type MessageFollow = {
  created_at: string;
  id: string;
  name: string;
  _id: string;
};

export type MessageHost = {
  name: string;
  viewers: string;
  type: string;
  _id: string;
};

export type MessageBits = {
  id: string;
  name: string;
  amount: string;
  emotes?: unknown;
  message: string;
  _id: string;
};

export type MessageRaid = {
  name: string;
  raiders: number;
  _id: string;
};

export type StreamlabsEvent = {
  type: string;
  event_id: string;
  for?: string;
  message: any[];
};

export type StreamlabsAlert = {
  avatar: string;
  type: 'follow' | 'subscription' | 'donation' | 'raid' | 'bits';
  title: string;
  message: string;
  timeout: number;
  volume: number;
};
