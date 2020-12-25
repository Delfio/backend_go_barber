import IFindAllInMonthFromProviderRequest from './IFindAllInMonthFromProviderRequest';

interface IFindAllAvailableTimesForAProviderInAMonth extends IFindAllInMonthFromProviderRequest {
    day: number;
}

export default IFindAllAvailableTimesForAProviderInAMonth;
