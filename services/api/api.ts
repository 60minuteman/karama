import { useAuth } from '@/app/store/auth';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from '../../hooks/useAuthQuery';
import customAxios from './envConfig';

export const fetchSignUpVerify = async (email: any, userType: any) => {
  const { data } = await customAxios.get('/auth/signup-verify', {
    data: {
      field: email,
      user_type: userType,
    },
  });
  console.log('ror', data);
  return data;
};

// export const useUserApi = (email, userType) => {
//   return useQuery({
//     queryKey: ['user', email, userType],
//     queryFn: () => fetchUser(email, userType),
//     enabled: !!email,
//   });
// };

export const fetchUserIdentity = async () => {
  const { data } = await customAxios.get('/identities/user');
  return data;
};

export const useUserIdentity = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['userIdentity'],
    queryFn: fetchUserIdentity,
    retry: 3,
    enabled: !!token,
  });
};

export const fetchUserWallet = async () => {
  const { data } = await customAxios.get('/wallet/all/user');
  return data;
};

export const useUserWallet = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['userWallet'],
    queryFn: fetchUserWallet,
    retry: 3,
    refetchInterval: (query) => (query.state.error ? false : 5000),
    enabled: !!token,
  });
};

export const fetchOldUserWallet = async () => {
  const { data } = await customAxios.get('/managed-wallet/user');
  return data;
};

export const useOldUserWallet = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['oldUserWallet'],
    queryFn: fetchOldUserWallet,
    retry: 3,
    refetchInterval: (query) => (query.state.error ? false : 5000),
    enabled: !!token,
  });
};

export const fetchUserProfile = async () => {
  const { data } = await customAxios.get('/user/profile');
  return data;
};

export const useUserProfile = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    retry: 3,
    enabled: !!token,
  });
};

export const fetchBanks = async () => {
  const { data } = await customAxios.get('/common/banks/list');
  return data;
};

export const useBanks = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['banks'],
    queryFn: fetchBanks,
    enabled: !!token,
  });
};

export const fetchAccountInfo = async (
  account_number: string,
  bank_code: string
) => {
  const { data } = await customAxios.get(`/common/banks/account/enquire`, {
    params: {
      account_number: account_number,
      bank_code: bank_code,
    },
  });
  return data;
};

export const useAccountInfo = (account_number: string, bank_code: string) => {
  console.log('bank_code', bank_code);
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['accountInfo', account_number, bank_code],
    queryFn: () => fetchAccountInfo(account_number, bank_code),
    enabled: account_number.length === 10 && !!bank_code && !!token,
  });
};

export const fetchPhoneNumberNetwork = async (phone_number: string) => {
  const { data } = await customAxios.get(`/vas/phone-number/network`, {
    params: {
      phone_number: phone_number,
    },
  });
  return data;
};

export const usePhoneNumberNetwork = (phone_number: string) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['phoneNumberNetwork', phone_number],
    queryFn: () => fetchPhoneNumberNetwork(phone_number),
    enabled: phone_number.length === 11 && !!token,
  });
};

export const fetchDataPlans = async (phone_number: string) => {
  const { data } = await customAxios.get(`/vas/data/data-plans`, {
    params: {
      phone_number: phone_number,
    },
  });
  return data;
};

export const useDataPlans = (phone_number: string) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['dataPlans', phone_number],
    queryFn: () => fetchDataPlans(phone_number),
    enabled: phone_number.length === 11 && !!token,
  });
};

export const fetchCategories = async (bill_category_ctx: string) => {
  const { data } = await customAxios.get(
    `/bills/categories?bill_category_ctx=${bill_category_ctx}`
  );
  return data;
};

export const useCategories = (bill_category_ctx: string, category_ctx: any) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['categories', bill_category_ctx],
    queryFn: () => fetchCategories(bill_category_ctx),
    enabled: !!token && !!category_ctx,
  });
};

export const fetchCategoriesBillersTv = async () => {
  const { data } = await customAxios.get(
    `/bills/categories/4/billers?bill_category_ctx=cable_tv`
  );
  return data;
};

export const useCategoriesBillersTv = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['categoriesBillers', '4', 'cable_tv'],
    queryFn: () => fetchCategoriesBillersTv(),
    enabled: !!token,
  });
};

export const fetchCategoriesBillersElectricity = async () => {
  const { data } = await customAxios.get(
    `/bills/categories/61efab78b5ce7eaad3b405d0/billers?bill_category_ctx=electricity`
  );
  return data;
};

export const useCategoriesBillersElectricity = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['categoriesBillers', '61efab78b5ce7eaad3b405d0'],
    queryFn: () => fetchCategoriesBillersElectricity(),
    enabled: !!token,
  });
};

export const fetchUserDevices = async () => {
  const { data } = await customAxios.get(`/notifications/devices/user`);
  return data;
};

export const useUserDevices = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['userDevices'],
    queryFn: () => fetchUserDevices(),
    enabled: !!token,
  });
};

export const fetchBeneficiaries = async () => {
  const { data } = await customAxios.get(`/beneficiaries`);
  return data;
};

export const useBeneficiaries = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['beneficiaries'],
    queryFn: () => fetchBeneficiaries(),
    enabled: !!token,
  });
};

export const fetchFavorites = async () => {
  const { data } = await customAxios.get(`/beneficiaries/favorites`);
  return data;
};

export const useFavorites = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorites(),
    enabled: !!token,
  });
};

export const fetchCategoriesBillers = async (
  categoryId: any,
  bill_category_ctx: any
) => {
  const { data } = await customAxios.get(
    `/bills/categories/${categoryId}/billers?bill_category_ctx=${bill_category_ctx}`
  );
  return data;
};

export const useCategoriesBillers = (
  categoryId: any,
  bill_category_ctx: any
) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['categoriesBillers', categoryId, bill_category_ctx],
    queryFn: () => fetchCategoriesBillers(categoryId, bill_category_ctx),
    enabled: !!token,
  });
};

export const fetchCableTvFields = async (biller_id: string) => {
  const { data } = await customAxios.get(`/bills/tv/provider/items`, {
    params: {
      biller_id: biller_id,
    },
  });
  return data;
};

export const useCableTvFields = (biller_id: string) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['biller_id', biller_id],
    queryFn: () => fetchCableTvFields(biller_id),
    enabled: !!token,
  });
};

export const fetchElectricityFields = async (biller_id: string) => {
  const { data } = await customAxios.get(`/bills/electricity/provider/items`, {
    params: {
      biller_id: biller_id,
    },
  });
  return data;
};

export const useElectricityFields = (biller_id: string) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['electricity_biller_id', biller_id],
    queryFn: () => fetchElectricityFields(biller_id),
    enabled: !!token,
  });
};

export const fetchTransactionLists = async (val: string, page_size: number) => {
  const { data } = await customAxios.get(`/transactions/list`, {
    params: {
      owner: val,
      page_size: page_size,
    },
  });
  return data;
};

export const useTransactionLists = (val: string, page_size: number = 10) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['transaction_lists', val, page_size],
    queryFn: () => fetchTransactionLists(val, page_size),
    enabled: !!token,
  });
};

export const fetchTransaction = async (transaction_Id: string) => {
  const { data } = await customAxios.get(
    `/transactions/success/${transaction_Id}`,
    {
      params: {
        owner: transaction_Id,
      },
    }
  );
  return data;
};

export const useTransaction = (transaction_Id: string) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['transaction', transaction_Id],
    queryFn: () => fetchTransaction(transaction_Id),
    enabled: !!token,
  });
};

export const fetchUserUploadedDocs = async (user_id: string) => {
  const { data } = await customAxios.get(
    `/identities/docs/user/list/${user_id}`
  );
  return data;
};

export const fetchTransactionNotification = async (transaction_ref: string) => {
  const { data } = await customAxios.get(
    `/transactions/ref/${transaction_ref}`
  );
  return data;
};

export const useTransactionNotification = (transaction_ref: string) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['transactionNotification', transaction_ref],
    queryFn: () => fetchTransactionNotification(transaction_ref),
    enabled: !!token && !!transaction_ref,
  });
};

export const useUserUploadedDocs = (user_id: string) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['userUploadedDocs', user_id],
    queryFn: () => fetchUserUploadedDocs(user_id),
    enabled: !!token && !!user_id,
  });
};

export const fetchTransactionInfiniteLists = async ({
  owner,
  pageSize = 10,
  cursor = '',
}: {
  owner: string;
  pageSize?: number;
  cursor?: string;
}) => {
  console.log('cursor======', cursor);
  const { data } = await customAxios.get(`/transactions/list`, {
    params: {
      owner,
      page_size: pageSize,
      cursor,
    },
  });
  return data;
};

export const fetchExchangeRate = async (
  currency_from: string = 'USD',
  currency_to: string = 'NGN'
) => {
  const { data } = await customAxios.get('/conversions/exchange-rate', {
    params: {
      currency_from,
      currency_to,
    },
  });
  return data;
};

export const useExchangeRate = (
  currency_from?: string,
  currency_to?: string
) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['exchangeRate', currency_from, currency_to],
    queryFn: () => fetchExchangeRate(currency_from, currency_to),
  });
};

export const fetchCardDetails = async () => {
  const { data } = await customAxios.get('/cards/details');
  return data;
};

export const useCardDetails = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['cardDetails'],
    queryFn: () => fetchCardDetails(),
    enabled: !!token,
  });
};

export const fetchUserCards = async () => {
  const { data } = await customAxios.get('/cards/user');
  return data;
};

export const useUserCards = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['userCards'],
    queryFn: () => fetchUserCards(),
    enabled: !!token,
  });
};

export const fetchBillCategories = async () => {
  const { data } = await customAxios.get('/bills/categories-ctx');
  return data;
};

export const useBillCategories = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['billCategories'],
    queryFn: fetchBillCategories,
    enabled: !!token,
  });
};

export const fetchRecents = async () => {
  const { data } = await customAxios.get('/vas/recent-numbers/');
  return data;
};
// export const useRecents = () => {
//   const { token } = useAuth()
//   const { data } = await customAxios.get('/vas/recent-numbers/');
//   return data;
// };
export const useRecents = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['recents'],
    queryFn: () => fetchRecents(),
    enabled: !!token,
  });
};
export const fetchFavoritesList = async () => {
  const { data } = await customAxios.get('/favorites');
  return data;
};
export const useFavoritesList = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['favoritesList'],
    queryFn: () => fetchFavoritesList(),
    enabled: !!token,
  });
};
export const fetchFavoriteTransactionHistory = async (favoriteId: any) => {
  const { data } = await customAxios.get(
    `/favorites/transactions/?favorite_id=${favoriteId}&page_size=3`
  );
  console.log(data);
  return data;
};
export const useFavoriteTransactionHistory = (favoriteId: any) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['favoriteTransactionHistory'],
    queryFn: () => fetchFavoriteTransactionHistory(favoriteId),
    enabled: !!token,
  });
};

export const fetchComplaintMessages = async () => {
  const { data } = await customAxios.get('/complaints/messages');
  return data;
};
export const useComplaintMessages = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['complaints'],
    queryFn: () => fetchComplaintMessages(),
    enabled: !!token,
  });
};
export const fetchReportedTransactions = async () => {
  const { data } = await customAxios.get('/complaints/view');
  return data;
};
export const useReportedTransactions = () => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['reports'],
    queryFn: () => fetchReportedTransactions(),
    enabled: !!token,
  });
};

export const fetchTransferFees = async (amount: number) => {
  const { data } = await customAxios.get(
    `/payout/transfer-fees?amount=${amount}`
  );
  return data;
};

export const useTransferFees = (amount: number) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['transferFees', amount],
    queryFn: () => fetchTransferFees(amount),
    enabled: !!token && !!amount,
  });
};

export const checkUsernameExists = async (username: string) => {
  const { data } = await customAxios.get(`/user/search`, {
    params: {
      username,
    },
  });
  return data;
};

export const useCheckUsername = (username: string) => {
  const { token } = useAuth();
  return useAuthQuery({
    queryKey: ['usernameExists', username],
    queryFn: () => checkUsernameExists(username),
    enabled: !!token && !!username,
  });
};
